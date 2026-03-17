import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import ItemCount from './ItemCount';
import './ItemDetail.css';

const ItemDetail = ({ item }) => {
    const [quantityAdded, setQuantityAdded] = useState(0);
    const { addItem, isInCart } = useCart();

    const handleOnAdd = (quantity) => {
        const success = addItem(item, quantity);
        if (success) {
            setQuantityAdded(quantity);
        }
    };

    return (
        <div className="item-detail">
            <img src={item.image} alt={item.title} />
            <div className="detail-info">
                <h2>{item.title}</h2>
                <p className="description">{item.description}</p>
                <p className="detail-price">${item.price}</p>
                <p className="detail-stock">
                    Stock disponible: <strong>{item.stock}</strong> unidades
                </p>
                
                {quantityAdded > 0 ? (
                    <div className="added-message">
                        <p>✓ Agregaste {quantityAdded} unidades al carrito</p>
                        <p className="stock-warning">
                            Recordá: El stock se reservará al finalizar la compra
                        </p>
                    </div>
                ) : (
                    <>
                        {item.stock === 0 ? (
                            <div className="out-of-stock">
                                <p>Producto sin stock</p>
                            </div>
                        ) : (
                            <ItemCount 
                                stock={item.stock} 
                                initial={1} 
                                onAdd={handleOnAdd} 
                            />
                        )}
                    </>
                )}
                
                {isInCart(item.id) && quantityAdded === 0 && item.stock > 0 && (
                    <p className="in-cart-message">
                        Este producto ya está en tu carrito
                    </p>
                )}
            </div>
        </div>
    );
};

export default ItemDetail;