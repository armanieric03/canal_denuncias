<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <title>Chat Anônimo</title>
  <style>
    body { font-family: Arial; padding: 20px; max-width: 600px; margin: auto; }
    #messages { border: 1px solid #ccc; height: 300px; overflow-y: scroll; padding: 10px; margin-bottom: 10px; }
    .message { margin-bottom: 8px; }
    .denunciante { color: blue; }
    .comissao { color: green; }
  </style>
</head>
<body>
  <h2>Chat Anônimo</h2>
  <div id="messages"></div>
  <textarea id="mensagem" rows="3" style="width:100%" placeholder="Digite sua mensagem..."></textarea><br>
  <button onclick="enviarMensagem()">Enviar</button>

  <script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
    import {
      getDatabase,
      ref,
      onChildAdded,
      push,
      get
    } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

    const firebaseConfig = {
      apiKey: "SUA_API_KEY",
      authDomain: "SEU_PROJETO.firebaseapp.com",
      databaseURL: "https://SEU_PROJETO.firebaseio.com",
      projectId: "SEU_PROJETO",
      storageBucket: "SEU_PROJETO.appspot.com",
      messagingSenderId: "SEU_MESSAGING_SENDER_ID",
      appId: "SEU_APP_ID"
    };

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    const codigoChat = sessionStorage.getItem("codigoChat");
    const senhaInformada = sessionStorage.getItem("senha");
    const mensagensRef = ref(db, "chats/" + codigoChat + "/mensagens");

    const chatRef = ref(db, "chats/" + codigoChat);
    let tipoUsuario = null;

    // Verifica a senha
    get(chatRef).then(snapshot => {
      if (!snapshot.exists()) {
        alert("Chat não encontrado.");
        window.location.href = "index.html";
        return;
      }

      const data = snapshot.val();
      if (senhaInformada === data.senhaDenunciante) {
        tipoUsuario = "Denunciante";
      } else if (senhaInformada === data.senhaComissao) {
        tipoUsuario = "Comissão";
      } else {
        alert("Senha incorreta.");
        window.location.href = "index.html";
        return;
      }

      // Carrega as mensagens
      onChildAdded(mensagensRef, snapshot => {
        const msg = snapshot.val();
        const msgEl = document.createElement("div");
        msgEl.classList.add("message");
        msgEl.classList.add(msg.autor === "Denunciante" ? "denunciante" : "comissao");
        msgEl.textContent = `${msg.autor}: ${msg.texto}`;
        document.getElementById("messages").appendChild(msgEl);
        document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
      });
    });

    // Envia mensagem
    window.enviarMensagem = function () {
      const texto = document.getElementById("mensagem").value.trim();
      if (!texto || !tipoUsuario) return;

      push(mensagensRef, {
        texto,
        autor: tipoUsuario,
        timestamp: Date.now()
      });

      document.getElementById("mensagem").value = "";
    };
  </script>
</body>
</html>
