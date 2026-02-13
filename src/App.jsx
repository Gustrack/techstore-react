// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import Inicio from './pages/Inicio';
import About from './pages/About';
import Contacto from './pages/Contacto';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        {/* Ruta principal */}
        <Route 
          path="/" 
          element={
            <ItemListContainer 
              greeting="¡Bienvenido a TechStore!"
              subtitle="Los mejores productos tecnológicos al mejor precio"
            />
          } 
        />
        
        {/* ✅ Ruta DINÁMICA para categorías - UNA SOLA RUTA */}
        <Route 
          path="/category/:categoryId" 
          element={
            <ItemListContainer 
              greeting="Productos TechStore"
            />
          } 
        />
        
        {/* Ruta para detalle de producto */}
        <Route 
          path="/item/:itemId" 
          element={<ItemDetailContainer />} 
        />
        
        {/* Ruta del carrito */}
        <Route path="/cart" element={<Cart />} />
        
        {/* Páginas estáticas */}
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacto" element={<Contacto />} />
        
        {/* Ruta 404 */}
        <Route path="*" element={<div>404 - Página no encontrada</div>} />
      </Routes>
    </div>
  );
}

export default App;