// src/components/ItemDetail/ItemDetail.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './ItemDetail.css';

const ItemDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // Agregar producto al carrito con la cantidad seleccionada
    addToCart({
      ...product,
      quantity: quantity
    });
    setAddedToCart(true);
    
    // Resetear el mensaje después de 3 segundos
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  const getCategoryIcon = () => {
    switch(product.category) {
      case 'laptops': return '💻';
      case 'smartphones': return '📱';
      case 'tablets': return '📲';
      default: return '🔹';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (!product) {
    return (
      <div className="item-detail-error">
        <h2>Producto no encontrado</h2>
        <Link to="/" className="back-home-btn">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="item-detail-container">
      <div className="item-detail">
        {/* Breadcrumb navigation */}
        <div className="item-detail-breadcrumb">
          <Link to="/">Inicio</Link>
          <span className="separator">›</span>
          <Link to={`/category/${product.category}`}>
            {getCategoryIcon()} {product.category}
          </Link>
          <span className="separator">›</span>
          <span className="current">{product.title}</span>
        </div>

        <div className="item-detail-content">
          {/* Imagen del producto */}
          <div className="item-detail-image-container">
            <img 
              src={product.image} 
              alt={product.title} 
              className="item-detail-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/500x500?text=Producto+no+disponible';
              }}
            />
            <span className="item-detail-category-badge">
              {getCategoryIcon()} {product.category}
            </span>
          </div>

          {/* Información del producto */}
          <div className="item-detail-info">
            <h1 className="item-detail-title">{product.title}</h1>
            
            <div className="item-detail-price-container">
              <span className="item-detail-price">
                {formatPrice(product.price)}
              </span>
              <span className="item-detail-tax">
                Impuestos incluidos
              </span>
            </div>

            <div className="item-detail-description">
              <h3>Descripción:</h3>
              <p>{product.description}</p>
            </div>

            <div className="item-detail-stock">
              <span className="stock-label">Disponibilidad:</span>
              <span className={product.stock > 0 ? 'stock-value in-stock' : 'stock-value out-of-stock'}>
                {product.stock > 0 ? (
                  <>
                    <span className="stock-check">✓</span>
                    {product.stock} unidades disponibles
                  </>
                ) : (
                  <>
                    <span className="stock-cross">✗</span>
                    Agotado
                  </>
                )}
              </span>
            </div>

            {product.stock > 0 && (
              <div className="item-detail-actions">
                {/* Selector de cantidad */}
                <div className="quantity-selector">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="quantity-btn"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="quantity-btn"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>

                {/* Botón agregar al carrito */}
                <button 
                  onClick={handleAddToCart}
                  className="add-to-cart-btn"
                  disabled={product.stock === 0}
                >
                  <span className="cart-icon">🛒</span>
                  Agregar al carrito
                </button>
              </div>
            )}

            {/* Mensaje de confirmación */}
            {addedToCart && (
              <div className="added-to-cart-message">
                ✅ Producto agregado al carrito correctamente
                <Link to="/cart" className="view-cart-link">
                  Ver carrito
                </Link>
              </div>
            )}

            {/* Características adicionales */}
            <div className="item-detail-features">
              <div className="feature">
                <span className="feature-icon">🚚</span>
                <div className="feature-text">
                  <strong>Envío gratis</strong>
                  <small>En compras mayores a $100</small>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon">🔒</span>
                <div className="feature-text">
                  <strong>Pago seguro</strong>
                  <small>Tus datos protegidos</small>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon">↩️</span>
                <div className="feature-text">
                  <strong>Devolución gratis</strong>
                  <small>30 días de garantía</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Productos relacionados (opcional) */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div className="related-products">
            <h3>Productos relacionados</h3>
            <div className="related-products-grid">
              {/* Aquí irían los productos relacionados */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;