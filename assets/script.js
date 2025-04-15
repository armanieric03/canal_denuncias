// script.js

// Referência ao Firestore
const db = getFirestore();

// Referência à coleção de denúncias
const denunciasRef = collection(db, "denuncias");

// Pegando o formulário
const form = document.getElementById("form-denuncia");

// Adicionando evento de submit ao formulário
form.addEventListener("submit", async (e) => {
  e.preventDefault();  // Impede o comportamento padrão de recarregar a página

  // Dados da denúncia
  const denunciaData = {
    nome: form.nome.value,
    descricao: form.descricao.value,
    codigoAcesso: form.codigoAcesso.value,
    data: new Date(),
  };

  try {
    // Enviar os dados para o Firestore
    await addDoc(denunciasRef, denunciaData);
    alert("Denúncia enviada com sucesso!");
    form.reset();  // Limpa os campos do formulário
  } catch (e) {
    alert("Erro ao enviar a denúncia: " + e.message);
  }
});
