// src/components/NavBar/NavBar.jsx
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './NavBar.css';

const NavBar = () => {
  const { getTotalItems } = useCart();
  
  const categories = [
    { id: 'inicio', name: 'Inicio', path: '/' },
    { id: 'laptops', name: 'Laptops', path: '/category/laptops' },
    { id: 'smartphones', name: 'Smartphones', path: '/category/smartphones' },
    { id: 'tablets', name: 'Tablets', path: '/category/tablets' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <h2>TechStore</h2>
          <span className="navbar-brand-sub">Tecnología al mejor precio</span>
        </Link>
      </div>
      
      <ul className="navbar-menu">
        {categories.map((category) => (
          <li key={category.id}>
            <NavLink
              to={category.path}
              className={({ isActive }) => 
                isActive ? 'navbar-link active' : 'navbar-link'
              }
              end={category.path === '/'}
            >
              {category.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <Link to="/cart" className="navbar-cart-link">
        <div className="navbar-cart">
          <span className="cart-icon">🛒</span>
          <span className="cart-badge">{getTotalItems()}</span>
        </div>
      </Link>
    </nav>
  );
};

export default NavBar;