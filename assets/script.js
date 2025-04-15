// Função para gerar ID aleatório para a denúncia
function gerarIdAleatorio() {
    return Math.random().toString(36).substring(2, 15);
}

// Função para gerar um código de acesso exclusivo
function gerarCodigoAcesso() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Lidar com o envio do formulário
document.getElementById('denunciaForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Gerar ID e código de acesso aleatório
    const denunciaId = gerarIdAleatorio();
    const acessoCodigo = gerarCodigoAcesso();

    // Exibir ID e código na tela
    document.getElementById('denunciaId').textContent = denunciaId;
    document.getElementById('acessoCodigo').textContent = acessoCodigo;

    // Exibir as informações
    document.getElementById('id-info').style.display = 'block';

    // Aqui você pode implementar a lógica para enviar os dados ao backend
    // Exemplo de envio usando fetch (se você tiver um backend)
    /*
    fetch('/enviar-denuncia', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            denuncia: document.getElementById('denuncia').value,
            denunciaId: denunciaId,
            acessoCodigo: acessoCodigo
        })
    });
    */
});
