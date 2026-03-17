import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import CartWidget from './CartWidget';
import './NavBar.css';

const NavBar = () => {
    const categories = [
        { id: 'electronics', name: 'Electrónica' },
        { id: 'computers', name: 'Computadoras' },
        { id: 'accessories', name: 'Accesorios' }
    ];

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="logo">TechStore</Link>
                <ul className="nav-menu">
                    {categories.map(cat => (
                        <li key={cat.id}>
                            <NavLink 
                                to={`/category/${cat.id}`}
                                className={({ isActive }) => isActive ? 'active' : ''}
                            >
                                {cat.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <CartWidget />
            </div>
        </nav>
    );
};

export default NavBar;