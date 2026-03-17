const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

// 🔴 IMPORTANTE: Reemplaza estos valores con TUS credenciales de Firebase
// (son las mismas que tienes en tu archivo .env)
const firebaseConfig = {
    apiKey: "AIzaSyBLAh4sT5VtX8x9v...",  // Tu API Key
    authDomain: "techstore-gustavo-atala.firebaseapp.com",  // Tu authDomain
    projectId: "techstore-gustavo-atala",  // Tu projectId
    storageBucket: "techstore-gustavo-atala.appspot.com",  // Tu storageBucket
    messagingSenderId: "930801585203",  // Tu messagingSenderId
    appId: "1:930801585203:web:d4a98f4e5245b6c090e746"  // Tu appId
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Array con todos los productos
const productos = [
    {
        title: "MacBook Air M2",
        description: "Laptop Apple con chip M2, pantalla Liquid Retina 13.6\", 8GB RAM, 256GB SSD, batería de hasta 18 horas",
        price: 1299999,
        category: "computers",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=400&fit=crop",
        stock: 12
    },
    {
        title: "Dell XPS 15",
        description: "Laptop premium con Intel Core i7, 16GB RAM, 512GB SSD, pantalla OLED 4K, tarjeta gráfica NVIDIA GeForce RTX 3050",
        price: 1899999,
        category: "computers",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=400&fit=crop",
        stock: 8
    },
    {
        title: "PC Gamer AMD Ryzen 7",
        description: "Desktop gaming con Ryzen 7 5800X, 32GB RAM, SSD 1TB, RTX 4060 Ti 8GB, refrigeración líquida",
        price: 1599999,
        category: "computers",
        image: "https://images.unsplash.com/photo-1587202372616-b43abea06c2a?w=500&h=400&fit=crop",
        stock: 5
    },
    {
        title: "Microsoft Surface Pro 9",
        description: "Tablet 2 en 1 con procesador Intel Core i5, 16GB RAM, 256GB SSD, pantalla táctil 13\", teclado desmontable",
        price: 1149999,
        category: "computers",
        image: "https://images.unsplash.com/photo-1611186871348-b2f1ab6dfa9c?w=500&h=400&fit=crop",
        stock: 10
    },
    {
        title: "iPhone 15 Pro Max",
        description: "Apple iPhone con chip A17 Pro, pantalla Super Retina XDR 6.7\", cámara triple 48MP, titanio, 256GB",
        price: 1699999,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&h=400&fit=crop",
        stock: 15
    },
    {
        title: "Samsung Galaxy S24 Ultra",
        description: "Smartphone con pantalla Dynamic AMOLED 2X 6.8\", cámara 200MP, S Pen integrado, 12GB RAM, 512GB",
        price: 1599999,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1678911821544-6d1d5f3b2f0a?w=500&h=400&fit=crop",
        stock: 10
    },
    {
        title: "iPad Pro 12.9\"",
        description: "Tablet Apple con chip M2, pantalla Liquid Retina XDR, 256GB, compatible con Apple Pencil y Magic Keyboard",
        price: 1399999,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=400&fit=crop",
        stock: 7
    },
    {
        title: "Sony PlayStation 5",
        description: "Consola de videojuegos de última generación con SSD ultrarrápido, soporte para 4K, mando DualSense inalámbrico",
        price: 799999,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500&h=400&fit=crop",
        stock: 20
    },
    {
        title: "Samsung TV Neo QLED 65\"",
        description: "Smart TV 4K de 65 pulgadas con tecnología Quantum Matrix, procesador Neo Quantum, soporte para HDR10+",
        price: 1249999,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&h=400&fit=crop",
        stock: 6
    },
    {
        title: "Apple AirPods Max",
        description: "Auriculares over-ear con cancelación activa de ruido, audio espacial, transductor dinámico diseñado por Apple",
        price: 549999,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=500&h=400&fit=crop",
        stock: 12
    },
    {
        title: "Logitech MX Master 3S",
        description: "Mouse inalámbrico ergonómico con sensor de 8000 DPI, scroll electromagnético, conexión Bluetooth y USB-C",
        price: 89999,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=400&fit=crop",
        stock: 25
    },
    {
        title: "Keychron Q1 Pro",
        description: "Teclado mecánico inalámbrico QMK, carcasa de aluminio, switches Gateron G Pro, retroiluminación RGB",
        price: 159999,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=400&fit=crop",
        stock: 18
    },
    {
        title: "Samsung Galaxy Watch 6 Classic",
        description: "Smartwatch con pantalla Super AMOLED, bisel giratorio, monitoreo de salud avanzado, GPS, 47mm",
        price: 289999,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500&h=400&fit=crop",
        stock: 15
    },
    {
        title: "DJI Osmo Mobile 6",
        description: "Estabilizador para smartphone con plegable magnético, seguimiento activo, extensión de varilla integrada",
        price: 159999,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1617777939643-c2cfc1cee294?w=500&h=400&fit=crop",
        stock: 10
    },
    {
        title: "Cargador Anker 737 GaNPrime 120W",
        description: "Cargador rápido con tecnología GaN, 3 puertos (2 USB-C, 1 USB-A), carga simultánea de múltiples dispositivos",
        price: 79999,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1583863793507-5d6d8f1b511c?w=500&h=400&fit=crop",
        stock: 30
    },
    {
        title: "Soporte Ajustable para Laptop",
        description: "Base de aluminio ergonómica, plegable, ajustable en altura, compatible con todas las laptops hasta 17\"",
        price: 24999,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=400&fit=crop",
        stock: 40
    }
];

async function cargarProductos() {
    console.log('🚀 Iniciando carga de productos...');
    console.log(`📦 Total de productos a cargar: ${productos.length}`);
    console.log('----------------------------------------');
    
    let exitosos = 0;
    let fallidos = 0;
    
    for (const producto of productos) {
        try {
            const docRef = await addDoc(collection(db, 'products'), producto);
            console.log(`✅ ${producto.title} - ID: ${docRef.id}`);
            exitosos++;
        } catch (error) {
            console.error(`❌ ${producto.title} - Error: ${error.message}`);
            fallidos++;
        }
    }
    
    console.log('----------------------------------------');
    console.log('🎉 ¡CARGA COMPLETADA!');
    console.log(`✅ Exitosos: ${exitosos}`);
    console.log(`❌ Fallidos: ${fallidos}`);
}

// Ejecutar la carga
cargarProductos();