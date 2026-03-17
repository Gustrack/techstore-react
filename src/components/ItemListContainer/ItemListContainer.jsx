import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/firebase';
import ItemList from './ItemList';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import './ItemListContainer.css';

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true);
        
        // Crear la referencia a la colección
        const productsRef = collection(db, 'products');
        
        // Crear query con o sin categoría
        const q = categoryId 
            ? query(productsRef, where('category', '==', categoryId))
            : productsRef;
        
        // Escuchar cambios en tiempo real
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const productsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            setProducts(productsData);
            setLoading(false);
            setError(null);
        }, (err) => {
            console.error("Error en snapshot:", err);
            setError('Error al cargar los productos');
            setLoading(false);
        });

        // Limpiar el listener cuando el componente se desmonte o cambie la categoría
        return () => unsubscribe();
    }, [categoryId]);

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="container">
            {greeting && <h1 className="greeting">{greeting}</h1>}
            <ItemList products={products} />
        </div>
    );
};

export default ItemListContainer;