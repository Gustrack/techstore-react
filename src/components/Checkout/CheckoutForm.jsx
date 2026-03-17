import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Checkout.css';

const CheckoutForm = () => {
    const { cart, totalPrice, processPurchase } = useCart();
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [purchaseError, setPurchaseError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        confirmEmail: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validar emails
        if (formData.email !== formData.confirmEmail) {
            alert('Los emails no coinciden');
            return;
        }

        setLoading(true);
        setPurchaseError(null);
        
        try {
            const buyerData = {
                name: formData.name,
                phone: formData.phone,
                email: formData.email
            };
            
            const result = await processPurchase(buyerData);
            
            if (result.success) {
                setOrderId(result.orderId);
            } else {
                setPurchaseError(result.errors.join('\n'));
            }
        } catch (error) {
            setPurchaseError('Error al procesar la compra. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    if (orderId) {
        return (
            <div className="checkout-success">
                <h2>¡Compra realizada con éxito!</h2>
                <p>Tu número de orden es: <strong>{orderId}</strong></p>
                <p>Recibirás un email de confirmación en {formData.email}</p>
                <p className="stock-message">El stock ha sido actualizado correctamente.</p>
                <Link to="/" className="continue-btn">Seguir comprando</Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="checkout-form">
            <h2>Finalizar compra</h2>
            
            {purchaseError && (
                <div className="error-message">
                    <p>Error en la compra:</p>
                    <pre>{purchaseError}</pre>
                </div>
            )}
            
            <div className="form-field">
                <label>Nombre completo</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-field">
                <label>Teléfono</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-field">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-field">
                <label>Confirmar Email</label>
                <input
                    type="email"
                    name="confirmEmail"
                    value={formData.confirmEmail}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="order-summary">
                <h3>Resumen de compra</h3>
                {cart.map(item => (
                    <div key={item.id} className="order-item">
                        <span>{item.title} x{item.quantity}</span>
                        <span>${item.price * item.quantity}</span>
                    </div>
                ))}
                <div className="order-total">
                    <strong>Total:</strong>
                    <strong>${totalPrice}</strong>
                </div>
            </div>

            <button 
                type="submit" 
                disabled={loading || cart.length === 0}
                className="submit-btn"
            >
                {loading ? 'Procesando...' : 'Confirmar compra'}
            </button>
        </form>
    );
};

export default CheckoutForm;