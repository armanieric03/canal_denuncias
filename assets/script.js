import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Referência à coleção no Firestore
const denunciasRef = collection(db, "denuncias");

// Obtendo o formulário e capturando o evento de envio
const form = document.getElementById("form-denuncia");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const denunciaData = {
    nome: form.nome.value,
    descricao: form.descricao.value,
    codigoAcesso: form.codigoAcesso.value,
    data: new Date(),
  };

  try {
    // Enviando a denúncia para o Firestore
    await addDoc(denunciasRef, denunciaData);
    alert("Denúncia enviada com sucesso!");
    form.reset(); // Limpa o formulário
  } catch (e) {
    alert("Erro ao enviar denúncia: " + e.message);
  }
});
