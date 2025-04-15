import { db } from './firebase-config.js';
import { ref, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Gerar senha aleatória
function gerarSenha() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Tornar copiáveis
function ativarCopiar() {
  document.querySelectorAll('.copiable').forEach(el => {
    el.onclick = () => {
      navigator.clipboard.writeText(el.textContent);
      alert(`Copiado: ${el.textContent}`);
    };
  });
}

// Listener do botão
document.getElementById("btnCriar").addEventListener("click", async () => {
  const codigo = Date.now().toString(); // código único
  const senhaDenunciante = gerarSenha();
  const senhaComissao = gerarSenha();

  // Salvar no Firebase
  await set(ref(db, "chats/" + codigo), {
    senhaDenunciante,
    senhaComissao,
    mensagens: []
  });

  // Exibir na tela para o denunciante
  document.getElementById("codigoGerado").textContent = codigo;
  document.getElementById("senhaDenunciante").textContent = senhaDenunciante;
  document.getElementById("dadosChat").style.display = "block";
  ativarCopiar();

  // Enviar por e-mail via EmailJS
  emailjs.send("service_4xx4c18", "template_ze8hgtn", {
    chat_codigo: codigo,
    senha_comissao: senhaComissao
  }).then(() => {
    console.log("E-mail enviado com sucesso.");
  }).catch((error) => {
    console.error("Erro ao enviar e-mail:", error);
    alert("Erro ao enviar e-mail. Verifique sua configuração do EmailJS.");
  });
});
