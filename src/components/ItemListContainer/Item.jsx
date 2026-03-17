import React from 'react';
import { Link } from 'react-router-dom';
import './ItemListContainer.css';

const Item = ({ product }) => {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.title} />
            <div className="product-info">
                <h3>{product.title}</h3>
                <p className="price">${product.price}</p>
                <p className="stock">Stock: {product.stock}</p>
                <Link to={`/item/${product.id}`} className="detail-btn">
                    Ver detalle
                </Link>
            </div>
        </div>
    );
};

export default Item;