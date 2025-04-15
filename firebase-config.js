// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDDjD6VMIRxgDq13yXjMYeYI2b7-QqqdVI",
  authDomain: "canal-denuncias-poli26.firebaseapp.com",
  databaseURL: "https://canal-denuncias-poli26-default-rtdb.firebaseio.com",
  projectId: "canal-denuncias-poli26",
  storageBucket: "canal-denuncias-poli26.firebasestorage.app",
  messagingSenderId: "102848286523",
  appId: "1:102848286523:web:4b539fe5ec3e15d7e3311e"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
