import { db } from './firebase-config.js';
import { ref, set, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Gerar senha aleatória
function gerarSenha() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Tornar copiáveis
function ativarCopiar() {
  document.querySelectorAll('.copiable').forEach(el => {
    el.onclick = () => {
      navigator.clipboard.writeText(el.textContent);
      
      // Feedback visual temporário
      const originalText = el.textContent;
      const originalStyle = el.style.backgroundColor;
      
      el.textContent = "Copiado!";
      el.style.backgroundColor = "#d4edda";
      
      setTimeout(() => {
        el.textContent = originalText;
        el.style.backgroundColor = originalStyle;
      }, 1500);
    };
  });
}

// Alternar entre abas
function setupTabs() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      // Remover classe active de todas as abas e conteúdos
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      // Adicionar classe active na aba clicada e no conteúdo correspondente
      tab.classList.add('active');
      const tabId = tab.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
}

// Função para inicializar todos os event listeners
function inicializarEventListeners() {
  // Configurar abas
  setupTabs();
  
  // Listener do botão de criar chat
  const btnCriar = document.getElementById("btnCriar");
  const loadingIndicator = document.getElementById("loading");
  
  if (btnCriar) {
    btnCriar.addEventListener("click", async () => {
      // Mostrar indicador de carregamento
      btnCriar.disabled = true;
      loadingIndicator.style.display = "block";
      
      try {
        const codigo = Date.now().toString(); // código único
        const senhaDenunciante = gerarSenha();
        const senhaComissao = gerarSenha();

        // Salvar no Firebase
        await set(ref(db, "chats/" + codigo), {
          senhaDenunciante,
          senhaComissao,
          mensagens: [],
          dataCriacao: new Date().toISOString(),
          emailComissao: "armanieric03@gmail.com" // Email da comissão
        });

        // Exibir na tela para o denunciante
        document.getElementById("codigoGerado").textContent = codigo;
        document.getElementById("senhaDenunciante").textContent = senhaDenunciante;
        document.getElementById("dadosChat").style.display = "block";
        ativarCopiar();

        // Mostrar mensagem de sucesso sem depender do email
        const successMsg = document.createElement("p");
        successMsg.innerHTML = "<strong>Chat criado com sucesso!</strong> A comissão receberá os dados de acesso.";
        successMsg.className = "success-message";
        document.getElementById("dadosChat").appendChild(successMsg);

        // Tentar enviar por e-mail via EmailJS para a comissão
        try {
          // Usando o serviço correto com as chaves fornecidas
          await emailjs.send(
            "service_4xx4c18", // Usar o ID de serviço correto
            "template_ze8hgtn", 
            {
              chat_codigo: codigo,
              senha_comissao: senhaComissao,
              data_criacao: new Date().toLocaleDateString('pt-BR'),
              email_comissao: "armanieric03@gmail.com",
              to_email: "armanieric03@gmail.com" // Adicionar destinatário explicitamente
            },
            "34Qr07ENkW64L11KM" // User ID correto
          );
          console.log("E-mail enviado com sucesso para a comissão.");
        } catch (error) {
          console.error("Erro ao enviar e-mail:", error);
          console.log("EmailJS Service ID:", "service_4xx4c18");
          console.log("EmailJS Template ID:", "template_ze8hgtn");
          console.log("Email da comissão:", "armanieric03@gmail.com");
          
          // Adicionar mensagem de aviso sobre o email
          const emailWarning = document.createElement("p");
          emailWarning.innerHTML = "<strong>Nota:</strong> Não foi possível enviar o e-mail para a comissão. Por favor, informe-os manualmente.";
          emailWarning.style.color = "#ff9800";
          document.getElementById("dadosChat").appendChild(emailWarning);
          
          // Mostrar os dados da comissão para cópia manual
          const comissaoData = document.createElement("div");
          comissaoData.className = "form-group";
          comissaoData.innerHTML = `
            <label>Senha da comissão:</label>
            <div><span class="copiable">${senhaComissao}</span></div>
            <p><em>Clique para copiar e envie manualmente para a comissão</em></p>
          `;
          document.getElementById("dadosChat").appendChild(comissaoData);
          ativarCopiar(); // Reativar para o novo elemento copiável
        }
      } catch (error) {
        console.error("Erro ao criar chat:", error);
        alert("Ocorreu um erro ao criar o chat. Por favor, tente novamente.");
      } finally {
        // Esconder indicador de carregamento
        btnCriar.disabled = false;
        loadingIndicator.style.display = "none";
      }
    });
  }

  // Formulário de login do denunciante
  const formDenunciante = document.getElementById("formDenunciante");
  if (formDenunciante) {
    formDenunciante.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = formDenunciante.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = "Verificando...";
      
      const codigo = document.getElementById("codigoDenunciante").value;
      const senha = document.getElementById("senhaDenuncianteLogin").value;
      
      try {
        const chatRef = ref(db, "chats/" + codigo);
        const snapshot = await get(chatRef);
        
        if (!snapshot.exists()) {
          alert("Chat não encontrado.");
          return;
        }
        
        const chatData = snapshot.val();
        if (senha !== chatData.senhaDenunciante) {
          alert("Senha incorreta para o denunciante.");
          return;
        }
        
        // Redirecionar para o chat
        window.location.href = `chat.html?chat=${codigo}&senha=${senha}`;
      } catch (error) {
        console.error("Erro ao verificar credenciais:", error);
        alert("Erro ao verificar credenciais. Tente novamente.");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Acessar como Denunciante";
      }
    });
  }

  // Formulário de login da comissão
  const formComissao = document.getElementById("formComissao");
  if (formComissao) {
    formComissao.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = formComissao.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = "Verificando...";
      
      const codigo = document.getElementById("codigoComissao").value;
      const senha = document.getElementById("senhaComissaoLogin").value;
      
      try {
        const chatRef = ref(db, "chats/" + codigo);
        const snapshot = await get(chatRef);
        
        if (!snapshot.exists()) {
          alert("Chat não encontrado.");
          return;
        }
        
        const chatData = snapshot.val();
        if (senha !== chatData.senhaComissao) {
          alert("Senha incorreta para a comissão.");
          return;
        }
        
        // Redirecionar para o chat
        window.location.href = `chat.html?chat=${codigo}&senha=${senha}`;
      } catch (error) {
        console.error("Erro ao verificar credenciais:", error);
        alert("Erro ao verificar credenciais. Tente novamente.");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Acessar como Comissão";
      }
    });
  }
}

// Garantir que o DOM esteja completamente carregado antes de inicializar
document.addEventListener('DOMContentLoaded', inicializarEventListeners);
