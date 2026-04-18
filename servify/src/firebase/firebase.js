import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCf9VAeyLDjKjGMCepVWVhqXDqrCG8Yvio",
  authDomain: "servify-8d53c.firebaseapp.com",
  projectId: "servify-8d53c",
  storageBucket: "servify-8d53c.firebasestorage.app",
  messagingSenderId: "632404837999",
  appId: "1:632404837999:web:d8706f7094e9e1a6e66f9a",
  measurementId: "G-SMZY1NC6KQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;