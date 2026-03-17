# TechStore E-commerce

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-9.22.0-FFCA28?logo=firebase)](https://firebase.google.com/)
[![React Router](https://img.shields.io/badge/React_Router-6.14.0-CA4245?logo=react-router)](https://reactrouter.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Deployed-2b5797?logo=github)](https://gustrack.github.io/techstore-react/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

**TechStore** es un e-commerce moderno desarrollado con React que permite a los usuarios explorar productos tecnológicos, agregarlos al carrito y completar el proceso de compra con integración a Firebase.


## Instalación
1. npm install
2. Configurar Firebase en .env
3. npm start

## Tecnologías utilizadas

| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | 18.2.0 | Biblioteca principal |
| React Router DOM | 6.14.0 | Navegación y rutas |
| Firebase | 9.22.0 | Backend y autenticación |
| Context API | - | Estado global del carrito |
| CSS Modules | - | Estilos modulares |
| GitHub Pages | - | Hosting estático |

## 📋 Prerrequisitos

- Node.js (v16 o superior)
- npm o yarn
- Cuenta en Firebase (gratuita)

## Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/gustrack/techstore-react.git
cd techstore-react
```

### 2. Instalar dependencias
```bash
npm install
# o
yarn install
```

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto:

```env
    apiKey: "AIzaSyClD0GU5QrXbbuFpsNfhiObJVgxWyCbbtE",
    authDomain: "techstore-gustavo-atala.firebaseapp.com",
    projectId: "techstore-gustavo-atala",
    storageBucket: "techstore-gustavo-atala.firebasestorage.app",
    messagingSenderId: "930801585203",
    appId: "1:930801585203:web:d4a98f4e5245b6c090e746",
    measurementId: "G-KD41K1F3J6"
```

### 4. Iniciar en modo desarrollo
```bash
npm start
# o
yarn start
```

La aplicación estará disponible en `http://localhost:3000`

## Construcción para producción

```bash
npm run build
# o
yarn build
```

Los archivos optimizados se generarán en la carpeta `build/`.

## Deploy en GitHub Pages

Este proyecto está configurado para desplegarse fácilmente en GitHub Pages:

```bash
npm run deploy
```

El comando ejecutará `predeploy` (build) y luego publicará el contenido en la rama `gh-pages`.

**URL:** [https://gustrack.github.io/techstore-react/](https://gustrack.github.io/techstore-react/)

## Deploy en Vercel Pages

**URL:** [techstore-react-gpe1-3czqhpejl-gus-projects-1b65092e.vercel.app](techstore-react-gpe1-3czqhpejl-gus-projects-1b65092e.vercel.app)

## Estructura del proyecto

```
techstore-react/
├── public/                 # Archivos públicos
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── Cart/           # Componentes del carrito
│   │   ├── Checkout/       # Proceso de compra
│   │   ├── ItemDetail/     # Detalle de producto
│   │   ├── ItemList/       # Listado de productos
│   │   ├── NavBar/         # Barra de navegación
│   │   └── common/         # Componentes comunes (Loader, Error)
│   ├── context/            # Context API (CartContext)
│   ├── services/           # Configuración de Firebase
│   ├── utils/              # Funciones utilitarias
│   ├── App.js              # Componente principal
│   └── index.js            # Punto de entrada
├── .env.example            # Ejemplo de variables de entorno
├── package.json            # Dependencias y scripts
└── README.md               # Este archivo