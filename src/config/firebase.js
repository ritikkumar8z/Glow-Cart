// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase config (tumhara project ka)
const firebaseConfig = {
  apiKey: "AIzaSyCghGZ42HLpYeJT2v1AXFCaNSeJrCfWE4M",
  authDomain: "glowcartapp.firebaseapp.com",
  projectId: "glowcartapp",
  storageBucket: "glowcartapp.firebasestorage.app",
  messagingSenderId: "548170299740",
  appId: "1:548170299740:web:65b3afaa568bc336c2a999",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth instance
export const auth = getAuth(app);
