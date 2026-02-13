import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ItemDetail from '../ItemDetail/ItemDetail';
import { getProductById } from '../../data/products';
import './ItemDetailContainer.css';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { itemId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);

    getProductById(itemId)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [itemId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
        <button onClick={handleGoBack} className="back-button">
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="item-detail-container">
      <button onClick={handleGoBack} className="back-button">
        ← Volver
      </button>
      <ItemDetail product={product} />
    </div>
  );
};

export default ItemDetailContainer;
