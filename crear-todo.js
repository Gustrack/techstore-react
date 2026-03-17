const fs = require('fs');
const path = require('path');

console.log('Creando estructura del proyecto...\n');

// Función para crear archivo
function crearArchivo(ruta, contenido) {
    const rutaCompleta = path.join(process.cwd(), ruta);
    const directorio = path.dirname(rutaCompleta);
    
    if (!fs.existsSync(directorio)) {
        fs.mkdirSync(directorio, { recursive: true });
    }
    
    fs.writeFileSync(rutaCompleta, contenido);
    console.log('✓ Archivo creado: ' + ruta);
}

// Crear package.json
const packageJson = {
    name: "webapp-e-commerce",
    version: "1.0.0",
    private: true,
    dependencies: {
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-router-dom": "^6.20.0",
        "firebase": "^10.7.0",
        "react-scripts": "5.0.1"
    },
    scripts: {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
    }
};

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
console.log('✓ Archivo creado: package.json');

// Crear .env
fs.writeFileSync('.env', 'REACT_APP_API_KEY=tu_api_key\nREACT_APP_AUTH_DOMAIN=tu_auth_domain\nREACT_APP_PROJECT_ID=tu_project_id\nREACT_APP_STORAGE_BUCKET=tu_storage_bucket\nREACT_APP_MESSAGING_SENDER_ID=tu_messaging_sender_id\nREACT_APP_APP_ID=tu_app_id');
console.log('✓ Archivo creado: .env');

// Crear .gitignore
fs.writeFileSync('.gitignore', 'node_modules/\n.env\nbuild/\n.DS_Store');
console.log('✓ Archivo creado: .gitignore');

// Crear public/index.html
crearArchivo('public/index.html', '<!DOCTYPE html>\n<html lang="es">\n<head>\n    <meta charset="utf-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1" />\n    <title>TechStore</title>\n</head>\n<body>\n    <div id="root"></div>\n</body>\n</html>');

// Crear src/index.js
crearArchivo('src/index.js', 'import React from "react";\nimport ReactDOM from "react-dom/client";\nimport App from "./App";\n\nconst root = ReactDOM.createRoot(document.getElementById("root"));\nroot.render(\n    <React.StrictMode>\n        <App />\n    </React.StrictMode>\n);');

// Crear src/App.js
crearArchivo('src/App.js', 'import React from "react";\nimport { BrowserRouter, Routes, Route } from "react-router-dom";\n\nfunction App() {\n    return (\n        <BrowserRouter>\n            <div>\n                <h1>TechStore</h1>\n                <p>Bienvenido a tu tienda de tecnología</p>\n            </div>\n        </BrowserRouter>\n    );\n}\n\nexport default App;');

// Crear carpetas principales
const carpetas = [
    'src/components/NavBar',
    'src/components/ItemListContainer',
    'src/components/ItemDetailContainer',
    'src/components/Cart',
    'src/components/Checkout',
    'src/components/common',
    'src/context',
    'src/services',
    'src/utils'
];

carpetas.forEach(carpeta => {
    const rutaCarpeta = path.join(process.cwd(), carpeta);
    if (!fs.existsSync(rutaCarpeta)) {
        fs.mkdirSync(rutaCarpeta, { recursive: true });
        console.log('✓ Carpeta creada: ' + carpeta);
    } else {
        console.log('• Carpeta ya existe: ' + carpeta);
    }
});

console.log('\n✅ ¡Proyecto creado exitosamente!');
console.log('\nAhora ejecuta:');
console.log('1. npm install');
console.log('2. npm start');