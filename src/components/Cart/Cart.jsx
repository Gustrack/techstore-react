import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import EmptyMessage from '../common/EmptyMessage';
import './Cart.css';

const Cart = () => {
    const { cart, totalPrice, clearCart } = useCart();

    if (cart.length === 0) {
        return <EmptyMessage message="Tu carrito está vacío" link="/" linkText="Ver productos" />;
    }

    return (
        <div className="cart-container">
            <h2>Tu Carrito</h2>
            <div className="cart-items">
                {cart.map(item => (
                    <CartItem key={item.id} item={item} />
                ))}
            </div>
            
            <div className="cart-summary">
                <div className="cart-total">
                    <span>Total:</span>
                    <span>${totalPrice}</span>
                </div>
                <div className="cart-actions">
                    <button onClick={clearCart} className="clear-btn">Vaciar carrito</button>
                    <Link to="/checkout" className="checkout-btn">Finalizar compra</Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;