import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import CheckoutForm from './components/Checkout/CheckoutForm';
import './App.css';

// TEMPORAL: Componente de diagnóstico
const TempDiv = () => {
  console.log('🎨 TempDiv renderizado');
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: 'red',
      color: 'white',
      padding: '20px',
      zIndex: 9999,
      textAlign: 'center',
      fontSize: '20px',
      fontWeight: 'bold'
    }}>
      🔴 SI VES ESTO, REACT ESTÁ RENDERIZANDO CORRECTAMENTE 🔴
    </div>
  );
};

function App() {
  console.log('🚀 App iniciando...');
  
  return (
    <>
      <TempDiv />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <CartProvider>
          <NavBar />
            // TEMPORAL: Reemplaza TODO el contenido de las rutas con esto
            <Routes>
                <Route path="/" element={<div style={{padding: '100px', textAlign: 'center'}}>
                    <h1 style={{color: 'blue'}}>¡LA PÁGINA FUNCIONA!</h1>
                    <p>Este es un componente de prueba</p>
                </div>} />
            </Routes>
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;


//<Routes>
//            <Route path="/" element={<ItemListContainer greeting="Bienvenido a TechStore" />} />
//            <Route path="/category/:categoryId" element={<ItemListContainer />} />
//            <Route path="/item/:itemId" element={<ItemDetailContainer />} />
//            <Route path="/cart" element={<Cart />} />
//            <Route path="/checkout" element={<CheckoutForm />} />
//          </Routes>