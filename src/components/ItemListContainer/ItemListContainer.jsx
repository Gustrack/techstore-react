// src/components/ItemListContainer/ItemListContainer.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../ItemList/ItemList';
import { getProducts, getProductByCategory } from '../../data/products';
import './ItemListContainer.css';

const ItemListContainer = ({ greeting, subtitle }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryId } = useParams();

  // 👇 AGREGAR ESTE console.log PARA VER QUÉ RECIBES
  console.log('📌 categoryId desde URL:', categoryId);
  console.log('📌 URL actual:', window.location.pathname);

  useEffect(() => {
    console.log('🔄 useEffect ejecutándose con categoryId:', categoryId);
    
    setLoading(true);
    setError(null);

    const fetchProducts = async () => {
      try {
        let data;
        
        if (categoryId) {
          console.log('🔍 Filtrando por categoría:', categoryId);
          data = await getProductByCategory(categoryId);
          console.log(`✅ Productos encontrados para ${categoryId}:`, data.length);
        } else {
          console.log('📦 Mostrando todos los productos');
          data = await getProducts();
          console.log('✅ Total de productos:', data.length);
        }
        
        setProducts(data);
      } catch (err) {
        console.error('❌ Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const getCategoryTitle = () => {
    if (!categoryId) return 'Todos los productos';
    
    const categoryMap = {
      laptops: 'Laptops',
      smartphones: 'Smartphones',
      tablets: 'Tablets'
    };
    
    return categoryMap[categoryId] || categoryId;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button 
          onClick={() => window.location.href = '/'} 
          className="error-button"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="item-list-container">
      <h1 className="greeting">{greeting}</h1>
      {subtitle && <p className="subtitle">{subtitle}</p>}
      
      <div className="category-header">
        <h2 className="category-title">{getCategoryTitle()}</h2>
        <span className="product-count">{products.length} productos</span>
      </div>
      
      {products.length === 0 ? (
        <div className="no-products">
          <p>No hay productos disponibles en esta categoría</p>
          <button 
            onClick={() => window.location.href = '/'} 
            className="back-home-button"
          >
            Ver todos los productos
          </button>
        </div>
      ) : (
        <ItemList products={products} />
      )}
    </div>
  );
};

export default ItemListContainer;