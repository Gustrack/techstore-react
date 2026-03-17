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
  console.log('📌 PUBLIC_URL:', process.env.PUBLIC_URL);
  
  // 🔴 TEMPORAL: Hardcodeamos el basename para GitHub Pages
  const basename = '/techstore-react';
  
  return (
    <>
      <TempDiv />
      <BrowserRouter basename={basename}>
        <CartProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={
              <div style={{padding: '100px', textAlign: 'center'}}>
                <h1 style={{color: 'blue', fontSize: '48px'}}>✅ ¡FUNCIONA!</h1>
                <p style={{fontSize: '24px'}}>El Router está funcionando en GitHub Pages</p>
                <p style={{color: 'green'}}>Basename: {basename}</p>
              </div>
            } />
            {/* Comentamos las rutas originales temporalmente */}
            {/* <Route path="/category/:categoryId" element={<ItemListContainer />} />
            <Route path="/item/:itemId" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutForm />} /> */}
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;