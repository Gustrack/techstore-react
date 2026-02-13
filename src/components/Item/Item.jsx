// src/components/Item/Item.jsx
import { Link } from 'react-router-dom';
import './Item.css';

const Item = ({ product }) => {
  const getCategoryIcon = () => {
    switch(product.category) {
      case 'laptops': return '💻';
      case 'smartphones': return '📱';
      case 'tablets': return '📲';
      default: return '🔹';
    }
  };

  return (
    <div className="item-card">
      <div className="item-image-container">
        <img src={product.image} alt={product.title} className="item-image" />
        <span className="item-category-badge">
          {getCategoryIcon()} {product.category}
        </span>
      </div>
      
      <div className="item-content">
        <h3 className="item-title">{product.title}</h3>
        <p className="item-price">${product.price}</p> 
        
        <div className="item-footer">
          <p className="item-stock">
            {product.stock > 0 ? (
              <span className="in-stock">✓ {product.stock} disponibles</span>
            ) : (
              <span className="out-of-stock">✗ Agotado</span>
            )}
          </p>
          <Link to={`/item/${product.id}`} className="item-button"> 
            Ver detalles →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Item;