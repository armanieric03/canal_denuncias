// Função para gerar uma senha aleatória
function gerarSenha() {
  return Math.random().toString(36).slice(-6);
}

// Função para criar um novo chat
async function criarChat() {
  const codigo = Date.now().toString(); // Usa o timestamp como código único
  const senha1 = gerarSenha(); // Senha para o denunciante
  const senha2 = gerarSenha(); // Senha para a comissão

  // Salva o chat no Firebase
  await set(ref(db, "chats/" + codigo), {
    senhaDenunciante: senha1,
    senhaComissao: senha2,
    mensagens: []
  });

  // Exibe o código e a senha do denunciante na tela
  document.getElementById("dadosChat").style.display = "block";
  document.getElementById("codigoGerado").textContent = codigo;
  document.getElementById("senhaDenunciante").textContent = senha1;
  document.getElementById("senhaComissao").textContent = "Enviada por e-mail";

  // Envia o e-mail para a comissão com o código e senha
  emailjs.send("service_4xx4c18", "template_ze8hgtn", {
    chat_codigo: codigo,
    senha_comissao: senha2
  }).then(() => {
    console.log("E-mail enviado com sucesso!");
  }).catch((err) => {
    console.error("Erro ao enviar e-mail:", err);
    alert("Falha ao enviar e-mail da comissão.");
  });
}

// Configura o botão de criar chat
document.getElementById("btnCriar").addEventListener("click", criarChat);
