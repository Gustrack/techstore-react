const fs = require('fs');
const path = require('path');

console.log('🚀 Generando todos los archivos del proyecto...\n');

// Función para crear archivo
function crearArchivo(ruta, contenido) {
    const rutaCompleta = path.join(process.cwd(), ruta);
    const directorio = path.dirname(rutaCompleta);
    
    if (!fs.existsSync(directorio)) {
        fs.mkdirSync(directorio, { recursive: true });
    }
    
    fs.writeFileSync(rutaCompleta, contenido);
    console.log('✅ Creado: ' + ruta);
}

// ============================================
// ARCHIVOS RAÍZ
// ============================================

// package.json
const packageJson = {
    "name": "webapp-e-commerce",
    "version": "1.0.0",
    "private": true,
    "dependencies": {
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-router-dom": "^6.20.0",
        "firebase": "^10.7.0",
        "react-scripts": "5.0.1"
    },
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
    }
};
crearArchivo('package.json', JSON.stringify(packageJson, null, 2));

// .env
crearArchivo('.env', `REACT_APP_API_KEY=tu_api_key
REACT_APP_AUTH_DOMAIN=tu_auth_domain
REACT_APP_PROJECT_ID=tu_project_id
REACT_APP_STORAGE_BUCKET=tu_storage_bucket
REACT_APP_MESSAGING_SENDER_ID=tu_messaging_sender_id
REACT_APP_APP_ID=tu_app_id`);

// .gitignore
crearArchivo('.gitignore', `node_modules/
.env
build/
.DS_Store
*.log`);

// README.md
crearArchivo('README.md', `# TechStore E-commerce

Proyecto final de React E-commerce con Firebase

## Instalación
1. npm install
2. Configurar Firebase en .env
3. npm start

## Tecnologías
- React
- Firebase
- React Router DOM`);

// ============================================
// PUBLIC
// ============================================

crearArchivo('public/index.html', `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>TechStore</title>
</head>
<body>
    <div id="root"></div>
</body>
</html>`);

// ============================================
// SRC - ARCHIVOS PRINCIPALES
// ============================================

crearArchivo('src/index.js', `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);`);

crearArchivo('src/App.js', `import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import CheckoutForm from './components/Checkout/CheckoutForm';
import './App.css';

function App() {
    return (
        <BrowserRouter>
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

export default App;`);

crearArchivo('src/App.css', `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: #f5f5f5;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}`);

// ============================================
// CONTEXT
// ============================================

crearArchivo('src/context/CartContext.jsx', `import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe usarse dentro de CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let quantity = 0;
        let price = 0;
        cart.forEach(item => {
            quantity += item.quantity;
            price += item.price * item.quantity;
        });
        setTotalQuantity(quantity);
        setTotalPrice(price);
    }, [cart]);

    const addItem = (item, quantity) => {
        if (isInCart(item.id)) {
            setCart(cart.map(cartItem => 
                cartItem.id === item.id 
                    ? { ...cartItem, quantity: cartItem.quantity + quantity }
                    : cartItem
            ));
        } else {
            setCart([...cart, { ...item, quantity }]);
        }
    };

    const removeItem = (itemId) => {
        setCart(cart.filter(item => item.id !== itemId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const isInCart = (itemId) => {
        return cart.some(item => item.id === itemId);
    };

    return (
        <CartContext.Provider value={{
            cart,
            totalQuantity,
            totalPrice,
            addItem,
            removeItem,
            clearCart,
            isInCart
        }}>
            {children}
        </CartContext.Provider>
    );
};`);

// ============================================
// SERVICES
// ============================================

crearArchivo('src/services/firebase.js', `import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);`);

// ============================================
// UTILS
// ============================================

crearArchivo('src/utils/format.js', `export const formatPrice = (price) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
    }).format(price);
};`);

// ============================================
// COMPONENTS - NAVBAR
// ============================================

crearArchivo('src/components/NavBar/NavBar.jsx', `import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import CartWidget from './CartWidget';
import './NavBar.css';

const NavBar = () => {
    const categories = [
        { id: 'electronics', name: 'Electrónica' },
        { id: 'computers', name: 'Computadoras' },
        { id: 'accessories', name: 'Accesorios' }
    ];

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="logo">TechStore</Link>
                <ul className="nav-menu">
                    {categories.map(cat => (
                        <li key={cat.id}>
                            <NavLink 
                                to={\`/category/\${cat.id}\`}
                                className={({ isActive }) => isActive ? 'active' : ''}
                            >
                                {cat.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <CartWidget />
            </div>
        </nav>
    );
};

export default NavBar;`);

crearArchivo('src/components/NavBar/CartWidget.jsx', `import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './NavBar.css';

const CartWidget = () => {
    const { totalQuantity } = useCart();

    return (
        <Link to="/cart" className="cart-widget">
            <span className="cart-icon">🛒</span>
            {totalQuantity > 0 && (
                <span className="cart-badge">{totalQuantity}</span>
            )}
        </Link>
    );
};

export default CartWidget;`);

crearArchivo('src/components/NavBar/NavBar.css', `.navbar {
    background-color: #1a1a1a;
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 1000;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
    margin: 0;
    padding: 0;
}

.nav-menu a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.nav-menu a:hover {
    background-color: #333;
}

.nav-menu a.active {
    background-color: #007bff;
}

.cart-widget {
    position: relative;
    color: white;
    text-decoration: none;
}

.cart-icon {
    font-size: 1.5rem;
}

.cart-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #007bff;
    color: white;
    border-radius: 50%;
    padding: 0.2rem 0.5rem;
    font-size: 0.8rem;
    min-width: 20px;
    text-align: center;
}`);

// ============================================
// COMPONENTS - ITEM LIST
// ============================================

crearArchivo('src/components/ItemListContainer/ItemListContainer.jsx', `import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/firebase';
import ItemList from './ItemList';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import './ItemListContainer.css';

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { categoryId } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const productsRef = collection(db, 'products');
                const q = categoryId 
                    ? query(productsRef, where('category', '==', categoryId))
                    : productsRef;
                
                const querySnapshot = await getDocs(q);
                const productsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                
                setProducts(productsData);
            } catch (err) {
                setError('Error al cargar los productos');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId]);

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="container">
            {greeting && <h1 className="greeting">{greeting}</h1>}
            <ItemList products={products} />
        </div>
    );
};

export default ItemListContainer;`);

crearArchivo('src/components/ItemListContainer/ItemList.jsx', `import React from 'react';
import Item from './Item';
import './ItemListContainer.css';

const ItemList = ({ products }) => {
    if (products.length === 0) {
        return <p className="empty-message">No hay productos disponibles</p>;
    }

    return (
        <div className="products-grid">
            {products.map(product => (
                <Item key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ItemList;`);

crearArchivo('src/components/ItemListContainer/Item.jsx', `import React from 'react';
import { Link } from 'react-router-dom';
import './ItemListContainer.css';

const Item = ({ product }) => {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.title} />
            <div className="product-info">
                <h3>{product.title}</h3>
                <p className="price">\${product.price}</p>
                <p className="stock">Stock: {product.stock}</p>
                <Link to={\`/item/\${product.id}\`} className="detail-btn">
                    Ver detalle
                </Link>
            </div>
        </div>
    );
};

export default Item;`);

crearArchivo('src/components/ItemListContainer/ItemListContainer.css', `.container {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
}

.greeting {
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
}

.product-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.product-card:hover {
    transform: translateY(-5px);
}

.product-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.product-info {
    padding: 1rem;
}

.product-info h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
}

.price {
    font-size: 1.2rem;
    font-weight: bold;
    color: #007bff;
    margin: 0.5rem 0;
}

.stock {
    color: #666;
    font-size: 0.9rem;
    margin: 0.5rem 0;
}

.detail-btn {
    display: block;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    padding: 0.5rem;
    text-align: center;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.detail-btn:hover {
    background-color: #0056b3;
}

.empty-message {
    text-align: center;
    color: #666;
    font-size: 1.2rem;
    margin-top: 2rem;
}`);

// ============================================
// COMPONENTS - ITEM DETAIL
// ============================================

crearArchivo('src/components/ItemDetailContainer/ItemDetailContainer.jsx', `import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import ItemDetail from './ItemDetail';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { itemId } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const docRef = doc(db, 'products', itemId);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    setProduct({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setError('Producto no encontrado');
                }
            } catch (err) {
                setError('Error al cargar el producto');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [itemId]);

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;

    return <ItemDetail item={product} />;
};

export default ItemDetailContainer;`);

crearArchivo('src/components/ItemDetailContainer/ItemDetail.jsx', `import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import ItemCount from './ItemCount';
import './ItemDetail.css';

const ItemDetail = ({ item }) => {
    const [quantityAdded, setQuantityAdded] = useState(0);
    const { addItem, isInCart } = useCart();

    const handleOnAdd = (quantity) => {
        addItem(item, quantity);
        setQuantityAdded(quantity);
    };

    return (
        <div className="item-detail">
            <img src={item.image} alt={item.title} />
            <div className="detail-info">
                <h2>{item.title}</h2>
                <p className="description">{item.description}</p>
                <p className="detail-price">\${item.price}</p>
                <p className="detail-stock">Stock: {item.stock}</p>
                
                {quantityAdded > 0 ? (
                    <div className="added-message">
                        <p>✓ Agregaste {quantityAdded} unidades al carrito</p>
                    </div>
                ) : (
                    <ItemCount 
                        stock={item.stock} 
                        initial={1} 
                        onAdd={handleOnAdd} 
                    />
                )}
            </div>
        </div>
    );
};

export default ItemDetail;`);

crearArchivo('src/components/ItemDetailContainer/ItemCount.jsx', `import React, { useState } from 'react';
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

    return (
        <div className="item-count">
            <div className="counter">
                <button onClick={decrement} disabled={count <= 1}>-</button>
                <span>{count}</span>
                <button onClick={increment} disabled={count >= stock}>+</button>
            </div>
            <button 
                onClick={() => onAdd(count)} 
                className="add-btn"
                disabled={stock === 0}
            >
                {stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
            </button>
        </div>
    );
};

export default ItemCount;`);

crearArchivo('src/components/ItemDetailContainer/ItemDetail.css', `.item-detail {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.item-detail img {
    width: 100%;
    height: auto;
    border-radius: 8px;
}

.detail-info {
    padding: 1rem;
}

.description {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #666;
    margin: 1rem 0;
}

.detail-price {
    font-size: 2rem;
    font-weight: bold;
    color: #007bff;
    margin: 1rem 0;
}

.detail-stock {
    color: #28a745;
    margin-bottom: 2rem;
}

.item-count {
    margin-top: 2rem;
}

.counter {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.counter button {
    width: 40px;
    height: 40px;
    border: 1px solid #ddd;
    background: white;
    font-size: 1.2rem;
    cursor: pointer;
    border-radius: 4px;
}

.counter button:hover:not(:disabled) {
    background: #007bff;
    color: white;
}

.counter button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.counter span {
    font-size: 1.2rem;
    font-weight: bold;
    min-width: 50px;
    text-align: center;
}

.add-btn {
    width: 100%;
    padding: 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1.1rem;
    cursor: pointer;
}

.add-btn:hover:not(:disabled) {
    background-color: #0056b3;
}

.add-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.added-message {
    background-color: #d4edda;
    color: #155724;
    padding: 1rem;
    border-radius: 4px;
    margin: 1rem 0;
}`);

// ============================================
// COMPONENTS - CART
// ============================================

crearArchivo('src/components/Cart/Cart.jsx', `import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from './CartItem';
import EmptyMessage from '../common/EmptyMessage';
import './Cart.css';

const Cart = () => {
    const { cart, totalPrice, clearCart } = useCart();

    if (cart.length === 0) {
        return <EmptyMessage message="Tu carrito está vacío" link="/" linkText="Ver productos" />;
    }

    return (
        <div className="cart-container">
            <h2>Tu Carrito</h2>
            <div className="cart-items">
                {cart.map(item => (
                    <CartItem key={item.id} item={item} />
                ))}
            </div>
            
            <div className="cart-summary">
                <div className="cart-total">
                    <span>Total:</span>
                    <span>\${totalPrice}</span>
                </div>
                <div className="cart-actions">
                    <button onClick={clearCart} className="clear-btn">Vaciar carrito</button>
                    <Link to="/checkout" className="checkout-btn">Finalizar compra</Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;`);

crearArchivo('src/components/Cart/CartItem.jsx', `import React from 'react';
import { useCart } from '../../context/CartContext';
import './Cart.css';

const CartItem = ({ item }) => {
    const { removeItem } = useCart();

    return (
        <div className="cart-item">
            <img src={item.image} alt={item.title} />
            <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p>Precio: \${item.price}</p>
                <p>Cantidad: {item.quantity}</p>
                <p>Subtotal: \${item.price * item.quantity}</p>
            </div>
            <button onClick={() => removeItem(item.id)} className="remove-btn">Eliminar</button>
        </div>
    );
};

export default CartItem;`);

crearArchivo('src/components/Cart/Cart.css', `.cart-container {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.cart-items {
    margin: 2rem 0;
}

.cart-item {
    display: grid;
    grid-template-columns: 100px 1fr auto;
    gap: 1rem;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #eee;
}

.cart-item img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 4px;
}

.cart-item-info h3 {
    margin: 0 0 0.5rem 0;
}

.remove-btn {
    background-color: #dc3545;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
}

.remove-btn:hover {
    background-color: #c82333;
}

.cart-summary {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 2px solid #eee;
    text-align: right;
}

.cart-total {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.cart-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
}

.clear-btn {
    background-color: #6c757d;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
}

.checkout-btn {
    background-color: #28a745;
    color: white;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
}`);

// ============================================
// COMPONENTS - CHECKOUT
// ============================================

crearArchivo('src/components/Checkout/CheckoutForm.jsx', `import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { db } from '../../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import './Checkout.css';

const CheckoutForm = () => {
    const { cart, totalPrice, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        confirmEmail: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const order = {
                buyer: {
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email
                },
                items: cart.map(item => ({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    quantity: item.quantity
                })),
                total: totalPrice,
                date: new Date()
            };

            const docRef = await addDoc(collection(db, 'orders'), order);
            setOrderId(docRef.id);
            clearCart();
        } catch (error) {
            alert('Error al procesar la compra');
        } finally {
            setLoading(false);
        }
    };

    if (orderId) {
        return (
            <div className="checkout-success">
                <h2>¡Compra realizada con éxito!</h2>
                <p>Tu número de orden es: <strong>{orderId}</strong></p>
                <Link to="/" className="continue-btn">Seguir comprando</Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="checkout-form">
            <h2>Finalizar compra</h2>
            
            <div className="form-field">
                <label>Nombre completo</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                />
            </div>

            <div className="form-field">
                <label>Teléfono</label>
                <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                />
            </div>

            <div className="form-field">
                <label>Email</label>
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                />
            </div>

            <div className="form-field">
                <label>Confirmar Email</label>
                <input
                    type="email"
                    value={formData.confirmEmail}
                    onChange={(e) => setFormData({...formData, confirmEmail: e.target.value})}
                    required
                />
            </div>

            <div className="order-summary">
                <h3>Resumen de compra</h3>
                {cart.map(item => (
                    <div key={item.id} className="order-item">
                        <span>{item.title} x{item.quantity}</span>
                        <span>\${item.price * item.quantity}</span>
                    </div>
                ))}
                <div className="order-total">
                    <strong>Total:</strong>
                    <strong>\${totalPrice}</strong>
                </div>
            </div>

            <button type="submit" disabled={loading} className="submit-btn">
                {loading ? 'Procesando...' : 'Confirmar compra'}
            </button>
        </form>
    );
};

export default CheckoutForm;`);

crearArchivo('src/components/Checkout/Checkout.css', `.checkout-form {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.form-field {
    margin-bottom: 1.5rem;
}

.form-field label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

.form-field input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

.order-summary {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 4px;
    margin: 2rem 0;
}

.order-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #dee2e6;
}

.order-total {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    font-size: 1.2rem;
}

.submit-btn {
    width: 100%;
    padding: 1rem;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1.1rem;
    cursor: pointer;
}

.submit-btn:hover:not(:disabled) {
    background-color: #218838;
}

.submit-btn:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.checkout-success {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    text-align: center;
}

.checkout-success h2 {
    color: #28a745;
    margin-bottom: 1rem;
}

.continue-btn {
    display: inline-block;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    margin-top: 1rem;
}`);

// ============================================
// COMPONENTS - COMMON
// ============================================

crearArchivo('src/components/common/Loader.jsx', `import React from 'react';
import './common.css';

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="loader"></div>
            <p>Cargando...</p>
        </div>
    );
};

export default Loader;`);

crearArchivo('src/components/common/ErrorMessage.jsx', `import React from 'react';
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

export default ErrorMessage;`);

crearArchivo('src/components/common/EmptyMessage.jsx', `import React from 'react';
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

export default EmptyMessage;`);

crearArchivo('src/components/common/common.css', `.loader-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
}

.loader {
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.error-container,
.empty-container {
    text-align: center;
    padding: 4rem 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    max-width: 500px;
    margin: 2rem auto;
}

.error-container h2 {
    color: #dc3545;
    margin-bottom: 1rem;
}

.button {
    display: inline-block;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.button:hover {
    background-color: #0056b3;
}`);

console.log('\n=================================');
console.log('✅ TODOS LOS ARCHIVOS CREADOS EXITOSAMENTE');
console.log('=================================');
console.log('\nAhora ejecuta:');
console.log('1. npm install');
console.log('2. npm start');
console.log('\n📝 No olvides configurar tu archivo .env con las credenciales de Firebase');