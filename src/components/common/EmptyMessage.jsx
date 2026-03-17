import React from 'react';
import { Link } from 'react-router-dom';
import './common.css';

const EmptyMessage = ({ message, link, linkText }) => {
    return (
        <div className="empty-container">
            <p>{message}</p>
            <Link to={link} className="button">{linkText}</Link>
        </div>
    );
};

export default EmptyMessage;