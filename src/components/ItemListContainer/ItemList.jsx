import React from 'react';
import Item from './Item';
import './ItemListContainer.css';

const ItemList = ({ products }) => {
    if (products.length === 0) {
        return <p className="empty-message">No hay productos disponibles</p>;
    }

    return (
        <div className="products-grid">
            {products.map(product => (
                <Item key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ItemList;