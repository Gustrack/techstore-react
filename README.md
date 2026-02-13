# TechStore - E-commerce de Tecnología
Proyecto de e-commerce desarrollado con React 

## Tecnologías

- React 18
- React Router DOM
- Vite
- Context API (para carrito de compras)

## Instalación

1. Clona el repositorio  
git clone https://github.com/tu-usuario/techstore-react.git  

2. Instala las dependencias  
npm install  

3. Inicia el servidor de desarrollo  
npm run dev  

## Características
* Catálogo de productos por categorías
* Carrito de compras con Context API
* Detalle de productos
* Filtrado por categorías (Laptops, Smartphones, Tablets)
* Diseño responsive

## Estructura del Proyecto
src/  
  ├── components/  
  │   ├── Cart/  
  │   ├── Item/  
  │   ├── ItemDetail/  
  │   ├── ItemDetailContainer/  
  │   ├── ItemList/  
  │   ├── ItemListContainer/  
  │   └── NavBar/  
  ├── context/  
  │   └── CartContext.jsx  
  ├── data/  
  │   └── products.js  
  ├── pages/  
  │   ├── About.jsx  
  │   ├── Contacto.jsx  
  │   └── Inicio.jsx  
  ├── App.jsx  
  └── main.jsx  

## Autor:
Gustavo Atala   

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
