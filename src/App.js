import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import CheckoutForm from './components/Checkout/CheckoutForm';
import './App.css';

function App() {
  console.log('🚀 App iniciando...');
  
  // 🔴 IMPORTANTE: Hardcodeamos el basename para GitHub Pages
  const basename = '/techstore-react';
  
  return (
    <BrowserRouter basename={basename}>
      <CartProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<ItemListContainer greeting="Bienvenido a TechStore" />} />
          <Route path="/category/:categoryId" element={<ItemListContainer />} />
          <Route path="/item/:itemId" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutForm />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;