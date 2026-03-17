//import React from 'react';
//import ReactDOM from 'react-dom/client';
//import App from './App';

//const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(
//    <React.StrictMode>
//        <App />
//    </React.StrictMode>
//);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Si tienes un archivo de estilos global

console.log('🚀 index.js: Iniciando aplicación...');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log('✅ index.js: Renderizado completado.');