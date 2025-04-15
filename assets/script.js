// assets/script.js

function gerarIdAleatorio() {
    return Math.random().toString(36).substring(2, 10);
}

function gerarCodigoAcesso() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

document.getElementById('denunciaForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const denunciaTexto = document.getElementById('denuncia').value;
    const denunciaId = gerarIdAleatorio();
    const acessoCodigo = gerarCodigoAcesso();

    db.collection("denuncias").doc(denunciaId).set({
        texto: denunciaTexto,
        id: denunciaId,
        senha: acessoCodigo,
        resposta: ""
    }).then(() => {
        document.getElementById('denunciaId').textContent = denunciaId;
        document.getElementById('acessoCodigo').textContent = acessoCodigo;
        document.getElementById('id-info').style.display = 'block';
    }).catch((error) => {
        alert("Erro ao enviar denúncia: " + error);
    });
});
