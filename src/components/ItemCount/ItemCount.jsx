import { useState } from 'react';
import './ItemCount.css';

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

  return (
    <div className="item-count">
      <div className="item-count-controls">
        <button 
          onClick={decrement} 
          disabled={count <= 1}
          className="item-count-button"
        >
          -
        </button>
        <span className="item-count-number">{count}</span>
        <button 
          onClick={increment} 
          disabled={count >= stock}
          className="item-count-button"
        >
          +
        </button>
      </div>
      <button 
        onClick={() => onAdd(count)}
        disabled={stock === 0}
        className="item-count-add-button"
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;
