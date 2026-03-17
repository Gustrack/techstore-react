import React from 'react';
import './common.css';

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="loader"></div>
            <p>Cargando...</p>
        </div>
    );
};

export default Loader;