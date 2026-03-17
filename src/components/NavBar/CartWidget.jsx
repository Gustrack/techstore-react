import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './NavBar.css';

const CartWidget = () => {
    const { totalQuantity } = useCart();

    return (
        <Link to="/cart" className="cart-widget">
            <span className="cart-icon">🛒</span>
            {totalQuantity > 0 && (
                <span className="cart-badge">{totalQuantity}</span>
            )}
        </Link>
    );
};

export default CartWidget;