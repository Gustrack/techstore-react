import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../services/firebase';
import ItemDetail from './ItemDetail';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { itemId } = useParams();

    useEffect(() => {
        setLoading(true);
        
        // Escuchar cambios en tiempo real con onSnapshot
        const docRef = doc(db, 'products', itemId);
        
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                setProduct({ id: docSnap.id, ...docSnap.data() });
                setError(null);
            } else {
                setError('Producto no encontrado');
            }
            setLoading(false);
        }, (err) => {
            setError('Error al cargar el producto');
            console.error(err);
            setLoading(false);
        });

        // Limpiar el listener cuando el componente se desmonte
        return () => unsubscribe();
    }, [itemId]);

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;

    return <ItemDetail item={product} />;
};

export default ItemDetailContainer;