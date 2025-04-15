// script.js

// Referência à coleção de denúncias no Firestore
const denunciasRef = collection(window.db, "denuncias");  // Usando 'window.db' para acessar a instância global

// Pegando o formulário de envio
const form = document.getElementById("form-denuncia");

// Adicionando o evento de submit ao formulário
form.addEventListener("submit", async (e) => {
  e.preventDefault();  // Impede o comportamento padrão de recarregar a página

  // Criando o objeto de dados da denúncia
  const denunciaData = {
    nome: form.nome.value,
    descricao: form.descricao.value,
    codigoAcesso: form.codigoAcesso.value,
    data: new Date(),
  };

  try {
    // Enviando os dados para o Firestore
    await addDoc(denunciasRef, denunciaData);
    alert("Denúncia enviada com sucesso!");
    form.reset();  // Limpa os campos do formulário
  } catch (e) {
    alert("Erro ao enviar a denúncia: " + e.message);
  }
});
