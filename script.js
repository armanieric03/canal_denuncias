// script.js

// Função para gerar um código aleatório
function gerarCodigo(tamanho = 8) {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let codigo = '';
  for (let i = 0; i < tamanho; i++) {
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return codigo;
}

// Referência ao Firestore
const db = getFirestore();

// Referência à coleção de denúncias no Firestore
const denunciasRef = collection(db, "denuncias");

// Pegando o formulário de envio
const form = document.getElementById("form-denuncia");

// Adicionando o evento de submit ao formulário
form.addEventListener("submit", async (e) => {
  e.preventDefault();  // Impede o comportamento padrão de recarregar a página

  // Gerando o código aleatório para a denúncia
  const codigoDenuncia = gerarCodigo(8);
  // Gerando o código de acesso para o denunciante
  const codigoAcesso = gerarCodigo(8);

  // Criando o objeto de dados da denúncia
  const denunciaData = {
    descricao: form.descricao.value,
    codigoDenuncia: codigoDenuncia,
    codigoAcesso: codigoAcesso,
    data: new Date(),
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
