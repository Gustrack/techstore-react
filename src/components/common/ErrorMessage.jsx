import React from 'react';
import { Link } from 'react-router-dom';
import './common.css';

const ErrorMessage = ({ message }) => {
    return (
        <div className="error-container">
            <h2>¡Ups! Algo salió mal</h2>
            <p>{message}</p>
            <Link to="/" className="button">Volver al inicio</Link>
        </div>
    );
};

export default ErrorMessage;