# Canal de Denúncias Anônimas
Um sistema web para denúncias anônimas que permite comunicação segura entre denunciantes e a comissão responsável.

## Funcionalidades

- Criação de chats anônimos para denúncias
- Sistema de senhas separadas para denunciante e comissão
- Interface de chat em tempo real
- Notificação por e-mail para a comissão quando uma nova denúncia é criada
- Indicador de digitação em tempo real
- Design responsivo e amigável

## Tecnologias Utilizadas

- HTML, CSS e JavaScript
- Firebase Realtime Database para armazenamento e sincronização em tempo real
- EmailJS para envio de notificações por e-mail

## Guia Passo a Passo

### Para Iniciar a Aplicação
1. Abra o arquivo `index.html` em seu navegador
2. Você verá a página inicial do Canal de Denúncias

### Para Criar uma Nova Denúncia
1. Na página inicial, a aba "Criar Denúncia" já estará selecionada
2. Clique no botão azul "Criar novo chat de denúncia"
3. Aguarde o processamento (um indicador de carregamento aparecerá)
4. Uma caixa aparecerá com:
   - O código do chat
   - A senha do denunciante
5. **Importante:** Clique nos códigos para copiá-los e guarde-os em local seguro
6. A comissão receberá automaticamente um e-mail com o código e senha de acesso
7. Se o e-mail não for enviado, você verá uma mensagem e poderá copiar a senha da comissão manualmente

### Para Acessar um Chat Existente como Denunciante
1. Na página inicial, clique na aba "Acessar Chat"
2. Na seção "Login como Denunciante":
   - Digite o código do chat
   - Digite a senha do denunciante
3. Clique no botão "Acessar como Denunciante"
4. Você será redirecionado para a interface de chat

### Para Acessar um Chat Existente como Comissão
1. Na página inicial, clique na aba "Acessar Chat"
2. Na seção "Login como Comissão":
   - Digite o código do chat
   - Digite a senha da comissão
3. Clique no botão "Acessar como Comissão"
4. Você será redirecionado para a interface de chat

### Utilizando o Chat
1. Na interface de chat, você verá:
   - O código do chat no topo
   - Seu tipo de usuário (Denunciante ou Comissão)
   - O histórico de mensagens
2. Para enviar uma mensagem:
   - Digite seu texto na caixa inferior
   - Clique no botão "Enviar" ou pressione Enter
3. Para limpar o texto digitado, clique no botão "Limpar"
4. Você verá um indicador quando a outra pessoa estiver digitando
5. As mensagens do denunciante aparecem em azul à direita
6. As mensagens da comissão aparecem em cinza à esquerda
7. Para sair do chat, clique no botão "Voltar"

## Segurança

- As senhas são geradas aleatoriamente e não são armazenadas em texto claro
- A comunicação com o Firebase é feita via HTTPS
- Não há identificação pessoal dos denunciantes
- As URLs contêm parâmetros sensíveis, não compartilhe os links de acesso

## Configuração

### Email da Comissão
O sistema está configurado para enviar notificações para o email da comissão: `armanieric03@gmail.com`

Para alterar este email:
1. Abra o arquivo `script.js`
2. Localize as ocorrências de "armanieric03@gmail.com"
3. Substitua pelo novo endereço de email
4. Salve o arquivo

### EmailJS
O sistema utiliza o serviço EmailJS para enviar notificações. Certifique-se de que:
1. A conta EmailJS está ativa
2. O template de email está configurado corretamente
3. O serviço de email está funcionando

## Solução de Problemas

### Se o e-mail para a comissão não for enviado:
1. Verifique se as credenciais do EmailJS estão corretas
2. Confirme se o serviço "service_4xx4c18" está ativo no painel do EmailJS
3. Verifique se o template "template_ze8hgtn" está configurado corretamente
4. Caso necessário, copie manualmente a senha da comissão e envie por outro meio
