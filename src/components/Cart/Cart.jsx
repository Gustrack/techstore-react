// src/components/Cart/Cart.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Tu carrito está vacío</h2>
        <p>¡Agrega algunos productos para comenzar a comprar!</p>
        <Link to="/" className="continue-shopping-btn">
          Continuar comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">Carrito de Compras</h1>
      
      <div className="cart-content">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img 
                  src={item.image} 
                  alt={item.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/100x100?text=Producto';
                  }}
                />
              </div>
              
              <div className="cart-item-info">
                <h3 className="cart-item-title">{item.title}</h3>
                <p className="cart-item-price">${item.price}</p>
              </div>
              
              <div className="cart-item-quantity">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="quantity-btn"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-value">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="quantity-btn"
                  disabled={item.quantity >= item.stock}
                >
                  +
                </button>
              </div>
              
              <div className="cart-item-subtotal">
                <span>Subtotal:</span>
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              </div>
              
              <button 
                onClick={() => removeFromCart(item.id)}
                className="cart-item-remove"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <h3>Resumen de compra</h3>
          
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Envío:</span>
            <span>${getTotalPrice() > 100 ? 'Gratis' : '$10.00'}</span>
          </div>
          
          <div className="summary-row total">
            <span>Total:</span>
            <span>${(getTotalPrice() + (getTotalPrice() > 100 ? 0 : 10)).toFixed(2)}</span>
          </div>
          
          <button className="checkout-btn">
            Proceder al pago
          </button>
          
          <button onClick={clearCart} className="clear-cart-btn">
            Vaciar carrito
          </button>
          
          <Link to="/" className="continue-shopping">
            ← Continuar comprando
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;