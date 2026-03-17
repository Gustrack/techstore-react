import React, { useState } from 'react';
import './ItemDetail.css';

const ItemCount = ({ stock, initial = 1, onAdd }) => {
    const [count, setCount] = useState(initial);

    const increment = () => {
        if (count < stock) {
            setCount(count + 1);
        }
    };

    const decrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const handleAdd = () => {
        if (count <= stock) {
            onAdd(count);
        } else {
            alert(`No hay suficiente stock. Solo quedan ${stock} unidades.`);
        }
    };

    return (
        <div className="item-count">
            <div className="counter">
                <button onClick={decrement} disabled={count <= 1}>-</button>
                <span>{count}</span>
                <button onClick={increment} disabled={count >= stock}>+</button>
            </div>
            <button 
                onClick={handleAdd} 
                className="add-btn"
                disabled={stock === 0}
            >
                {stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
            </button>
            {stock < 5 && stock > 0 && (
                <p className="low-stock">¡Últimas {stock} unidades!</p>
            )}
        </div>
    );
};

export default ItemCount;