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

document.getElementById("btnCriar").addEventListener("click", async () => {
  const codigo = Date.now().toString();
  const senhaDenunciante = gerarSenha();
  const senhaComissao = gerarSenha();

  await set(ref(db, "chats/" + codigo), {
    senhaDenunciante,
    senhaComissao,
    mensagens: []
  });

  // Mostra os dados
  document.getElementById("codigoGerado").textContent = codigo;
  document.getElementById("senhaDenunciante").textContent = senhaDenunciante;
  document.getElementById("dadosChat").style.display = "block";
  ativarCopiar();

  // Envia e-mail
  emailjs.send("service_4xx4c18", "template_ze8hgtn", {
    chat_codigo: codigo,
    senha_comissao: senhaComissao
  }).then(() => {
    console.log("E-mail enviado.");
  }).catch(err => {
    console.error("Erro ao enviar e-mail:", err);
    alert("Erro ao enviar e-mail com a senha da comissão.");
  });
});
