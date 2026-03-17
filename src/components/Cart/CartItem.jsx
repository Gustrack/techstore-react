import React from 'react';
import { useCart } from '../../context/CartContext';
import './Cart.css';

const CartItem = ({ item }) => {
    const { removeItem } = useCart();

    return (
        <div className="cart-item">
            <img src={item.image} alt={item.title} />
            <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p>Precio: ${item.price}</p>
                <p>Cantidad: {item.quantity}</p>
                <p>Subtotal: ${item.price * item.quantity}</p>
            </div>
            <button onClick={() => removeItem(item.id)} className="remove-btn">Eliminar</button>
        </div>
    );
};

export default CartItem;