import React, { createContext, useState, useContext, useEffect } from "react";
import { doc, updateDoc, getDoc, runTransaction, collection, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart debe usarse dentro de CartProvider");
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let quantity = 0;
        let price = 0;
        cart.forEach(item => {
            quantity += item.quantity;
            price += item.price * item.quantity;
        });
        setTotalQuantity(quantity);
        setTotalPrice(price);
    }, [cart]);

    // Función para agregar al carrito (SOLO en el estado local)
    const addItem = (item, quantity) => {
        // Verificar stock actual (pero solo como validación)
        if (quantity > item.stock) {
            alert(`Solo hay ${item.stock} unidades disponibles`);
            return false;
        }

        // Agregar al carrito (stock aún no se descuenta de Firebase)
        if (isInCart(item.id)) {
            setCart(cart.map(cartItem => 
                cartItem.id === item.id 
                    ? { ...cartItem, quantity: cartItem.quantity + quantity }
                    : cartItem
            ));
        } else {
            setCart([...cart, { ...item, quantity }]);
        }
        
        return true;
    };

    // Función para eliminar del carrito (solo del estado local)
    const removeItem = (itemId) => {
        setCart(cart.filter(item => item.id !== itemId));
    };

    // Función para vaciar carrito (solo del estado local)
    const clearCart = () => {
        setCart([]);
    };

    // Función para procesar la compra (AQUÍ se descuenta el stock)
    const processPurchase = async (buyerData) => {
        const errors = [];
        
        // Verificar stock disponible para cada producto
        for (const item of cart) {
            const docRef = doc(db, "products", item.id);
            const docSnap = await getDoc(docRef);
            
            if (!docSnap.exists()) {
                errors.push(`Producto ${item.title} no encontrado`);
                continue;
            }
            
            const currentStock = docSnap.data().stock;
            if (currentStock < item.quantity) {
                errors.push(`Stock insuficiente para ${item.title}. Disponible: ${currentStock}`);
            }
        }
        
        if (errors.length > 0) {
            return { success: false, errors };
        }
        
        // Si todo está bien, descontar stock usando transacciones
        try {
            for (const item of cart) {
                const productRef = doc(db, "products", item.id);
                
                // Usar transacción para asegurar consistencia
                await runTransaction(db, async (transaction) => {
                    const productDoc = await transaction.get(productRef);
                    if (!productDoc.exists()) {
                        throw new Error(`Producto ${item.title} no existe`);
                    }
                    
                    const newStock = productDoc.data().stock - item.quantity;
                    if (newStock < 0) {
                        throw new Error(`Stock insuficiente para ${item.title}`);
                    }
                    
                    transaction.update(productRef, { stock: newStock });
                });
            }
            
            // Crear la orden en Firebase
            const orderRef = doc(collection(db, "orders"));
            const orderData = {
                buyer: buyerData,
                items: cart.map(item => ({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity
                })),
                total: totalPrice,
                date: new Date(),
                status: "completada"
            };
            
            await setDoc(orderRef, orderData);
            
            // Limpiar el carrito
            setCart([]);
            
            return { success: true, orderId: orderRef.id };
            
        } catch (error) {
            console.error("Error en la compra:", error);
            return { success: false, errors: [error.message] };
        }
    };

    const isInCart = (itemId) => {
        return cart.some(item => item.id === itemId);
    };

    return (
        <CartContext.Provider value={{
            cart,
            totalQuantity,
            totalPrice,
            addItem,
            removeItem,
            clearCart,
            processPurchase,
            isInCart
        }}>
            {children}
        </CartContext.Provider>
    );
};