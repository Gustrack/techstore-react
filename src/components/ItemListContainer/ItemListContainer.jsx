import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase';
import ItemList from './ItemList';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import './ItemListContainer.css';

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const { categoryId } = useParams();

    // Mapeo de IDs de categoría a nombres mostrables
    const categoryNames = {
        'electronics': 'Electrónica',
        'computers': 'Computadoras',
        'accessories': 'Accesorios'
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Actualizar el nombre de la categoría según el ID
                if (categoryId) {
                    setCategoryName(categoryNames[categoryId] || categoryId);
                } else {
                    setCategoryName('');
                }
                
                const productsRef = collection(db, 'products');
                const q = categoryId 
                    ? query(productsRef, where('category', '==', categoryId))
                    : productsRef;
                
                const querySnapshot = await getDocs(q);
                const productsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                
                setProducts(productsData);
            } catch (err) {
                setError('Error al cargar los productos');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId]);

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="container">
            {greeting && !categoryId && <h1 className="greeting">{greeting}</h1>}
            
            {/* Título de categoría cuando se selecciona una */}
            {categoryId && (
                <div className="category-header">
                    <h2 className="category-title">{categoryName}</h2>
                    <p className="category-count">{products.length} productos disponibles</p>
                </div>
            )}
            
            <ItemList products={products} />
        </div>
    );
};

export default ItemListContainer;