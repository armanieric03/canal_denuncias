// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDjD6VMIRxgDq13yXjMYeYI2b7-QqqdVI",
  authDomain: "canal-denuncias-poli26.firebaseapp.com",
  databaseURL: "https://canal-denuncias-poli26-default-rtdb.firebaseio.com",
  projectId: "canal-denuncias-poli26",
  storageBucket: "canal-denuncias-poli26.firebasestorage.app",
  messagingSenderId: "102848286523",
  appId: "1:102848286523:web:4b539fe5ec3e15d7e3311e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializando o Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

// Função para enviar mensagem
function sendMessage() {
  const message = document.getElementById('sendMessage').value;
  if (message.trim() !== '') {
    const messageId = Date.now(); // Usando timestamp como ID único
    const newMessage = {
      id: messageId,
      text: message,
      timestamp: new Date().toISOString(),
    };

    // Enviar mensagem para o Firebase
    database.ref('messages/' + messageId).set(newMessage);
    document.getElementById('sendMessage').value = ''; // Limpar campo de mensagem
  }
}

// Função para ler mensagens do Firebase em tempo real
database.ref('messages').on('child_added', function(snapshot) {
  const message = snapshot.val();
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.innerText = `${message.text} (enviado em ${new Date(message.timestamp).toLocaleString()})`;
  document.getElementById('messages').appendChild(messageElement);
  document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
});
