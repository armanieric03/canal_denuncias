import { db } from './firebase-config.js';
import { ref, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Função para gerar senha aleatória
function gerarSenha() {
  return Math.random().toString(36).slice(-6);
}

// Função para copiar conteúdo ao clicar
function ativarCopiar() {
  document.querySelectorAll('.copiable').forEach(el => {
    el.onclick = () => {
      navigator.clipboard.writeText(el.textContent);
      alert('Copiado: ' + el.textContent);
    };
  });
}

// Criar um novo chat
document.getElementById("btnCriar").addEventListener("click", async () => {
  const codigo = Date.now().toString();
  const senhaDenunciante = gerarSenha();
  const senhaComissao = gerarSenha();

  await set(ref(db, "chats/" + codigo), {
    senhaDenunciante,
    senhaComissao,
    mensagens: []
  });

  // Atualiza a interface
  document.getElementById("codigoGerado").textContent = codigo;
  document.getElementById("senhaDenunciante").textContent = senhaDenunciante;
  document.getElementById("senhaComissao").textContent = "Enviada por e-mail";
  document.getElementById("dadosChat").style.display = "block";
  ativarCopiar();

  // Envia e-mail com código e senha da comissão
  emailjs.send("service_4xx4c18", "template_ze8hgtn", {
    chat_codigo: codigo,
    senha_comissao: senhaComissao
  }).then(() => {
    console.log("E-mail enviado com sucesso.");
  }).catch(error => {
    console.error("Erro ao enviar e-mail:", error);
    alert("Erro ao enviar e-mail com a senha da comissão.");
  });
});
