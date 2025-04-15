// Função para gerar um código aleatório de tamanho especificado
function gerarCodigo(tamanho = 8) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let codigo = '';
  for (let i = 0; i < tamanho; i++) {
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return codigo;
}

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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referência à coleção "denuncias" no Firestore
const denunciasRef = collection(db, "denuncias");

// Pegando o formulário de envio
const form = document.getElementById("form-denuncia");

// Adicionando o evento de submit ao formulário
form.addEventListener("submit", async (e) => {
  e.preventDefault();  // Impede o comportamento padrão de recarregar a página

  // Gerando códigos aleatórios para a denúncia e para o acesso
  const codigoDenuncia = gerarCodigo(8);  // Código de identificação da denúncia
  const codigoAcesso = gerarCodigo(8);    // Código de acesso para o denunciante

  // Criando o objeto de dados da denúncia
  const denunciaData = {
    descricao: form.descricao.value,  // A descrição fornecida pelo denunciante
    codigoDenuncia: codigoDenuncia,   // Código para identificar a denúncia
    codigoAcesso: codigoAcesso,       // Código de acesso para o denunciante
    data: new Date(),                 // Data de envio
  };

  try {
    // Enviando os dados para o Firestore
    const docRef = await addDoc(denunciasRef, denunciaData);

    // Exibindo os códigos gerados para o denunciante
    document.getElementById("codigo-denuncia").textContent = codigoDenuncia;
    document.getElementById("codigo-acesso").textContent = codigoAcesso;
    document.getElementById("codigo-info").style.display = "block"; // Exibe os códigos

    // Limpar o formulário
    form.reset();
    alert("Denúncia enviada com sucesso!");
  } catch (e) {
    alert("Erro ao enviar a denúncia: " + e.message);
  }
});
