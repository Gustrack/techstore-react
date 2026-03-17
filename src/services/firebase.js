//import { initializeApp } from 'firebase/app';
//import { getFirestore } from 'firebase/firestore';

//const firebaseConfig = {
//    apiKey: process.env.REACT_APP_API_KEY,
//    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//    projectId: process.env.REACT_APP_PROJECT_ID,
//    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//    appId: process.env.REACT_APP_APP_ID
//};

//const app = initializeApp(firebaseConfig);
//export const db = getFirestore(app);

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ⚠️ CONFIGURACIÓN DIRECTA PARA GITHUB PAGES
// Reemplaza estos valores con los de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyClD0GU5QrXbbuFpsNfhiObJVgxWyCbbtE",
  authDomain: "techstore-gustavo-atala.firebaseapp.com",
  projectId: "techstore-gustavo-atala",
  storageBucket: "techstore-gustavo-atala.firebasestorage.app",
  messagingSenderId: "930801585203",
  appId: "1:930801585203:web:d4a98f4e5245b6c090e746",
  measurementId: "G-KD41K1F3J6"
};

// Inicializar Firebase
console.log('🔥 Inicializando Firebase con:', firebaseConfig.projectId);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };