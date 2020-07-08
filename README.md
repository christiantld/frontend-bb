# BlackBook - Frontend

Link para aplicação rodando na nuvem Netlify: [https://blackbook-pi.netlify.app/](https://blackbook-pi.netlify.app/#/login)

A aplicação desenvolvida durante o Projeto Interdisciplinar segui a seguinte estratégia: 

- Criação do script SQL a partir do modelo lógico
- Construção de uma API REST com PHP
- Construção do frontend com o framework javascript Vue.js
- Conexão do backend e frontend através de protocolo HTTP coma biblioteca javascript  axios.js

As motivações para a separação de backend e frontend foram:

- Performance
- Separação do client-side e server-side
- Reutilização do backend tanto para aplicação web quanto para aplicação mobile
- Melhor manutenção
- Melhor experiência do usuário

A Arquitetura final segue o diagrama abaixo

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/7d49813f-7dcb-408b-933c-18d41309a000/diagramaPI.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200707%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200707T233013Z&X-Amz-Expires=86400&X-Amz-Signature=fd75f96dfe7fe438c69a5fa08ed9e5e308deab04f095b015b8f75fcb92a48012&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22diagramaPI.png%22)

## Construção do Frontend

O frontend foi desenvolvido como uma Single Page Application(SPA), uma aplicação web que roda em uma única página. Possui sistemas de rotas e clientes HTTP para fazer requisições a recursos externos (APIs); Os templates da aplicação ficam armazenados do lado do cliente e é  responsável por apresentar os dados recebidos do backend

Para o desenvolvimento do frontend foi utilizado o framework de javascript para construção de SPAs, Vue js, associado ao Bootstrap para estilização com CSS, a um template de dashboard disponibilizado pelo Creative Tim, e a biblioteca de javascript Express para comunicação com backend.

## Utilizando a aplicação

A aplicação está disponível no link [https://blackbook-pi.netlify.app/](https://blackbook-pi.netlify.app/#/login)

Ao acessar pela primeira vez você será direcionado para tela de login

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/bb7951e9-0aca-4d45-8a72-3d60c3baf87d/login.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200707%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200707T233102Z&X-Amz-Expires=86400&X-Amz-Signature=722e78ca86218028b1c1e06c296d81049117401fed0719d0f7f3c627d8a8f8e6&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22login.png%22)

Para testar a aplicação disponibilizamos a conta abaixo:

E-mail: `admin@admin.com`

Senha: `admin123`

Mas você também criar uma conta pessoal, clicando ou em `Registrar` no topo da página, ou em `Cadastre-se` abaixo do box de login.  Ao clicar em uma das opções, você será redirecionado para a janela abaixo

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a0d80ba5-c137-4f28-bb95-bd522aa948d6/cadastro.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200707%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200707T233129Z&X-Amz-Expires=86400&X-Amz-Signature=6eb43f6abcc849be6cbce4dd16026331fa0ff6ff7401dec3d198741b77af41c2&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22cadastro.png%22)

Basta preencher as informações do formulário, se todo processo estiver correto, após clicar em `Criar Conta` você receberá uma mensagem de sucesso e será redirecionado para tela de login após 3 segundos. Então, basta fazer o login com email e senha cadastrados. Em caso de erro no processo de cadastro ou de login, a aplicação irá mostrar uma mensagem de erro.

Com o login bem sucedido, o backend retorna as informações do usuário logado e armazena no local storage do navegador, permitindo a navegação pela aplicação e mantendo os dados do usuário. Enquanto os dados ficarem armazenados no local storage o usuário estará logado na aplicação, por isso caso deseje sair da aplicação, isso deve ser feito manualmente através do botão sair, que irá apagar os dados do local storage.

Ao logar o usuário é direcionado para tela inicial da aplicação que mostra as boas vindas ao usuário logado, com alguns dados importantes e um card. Opções de alteração e exclusão do perfil, um menu lateral com as funcionalidades do sistema e um menu no canto superior direito com a opção de sair.  

> **Se você está logado com a conta de administrador disponibilizada nesse tutorial, por favor não tente realizar a exclusão do perfil. Para testar essa funcionalidade crie um novo usuário**

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/82ded310-6d55-4456-bf6f-fcc84d27bd76/dashboard.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200707%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200707T233157Z&X-Amz-Expires=86400&X-Amz-Signature=20b0cb85936220a6c3480e8622078a5ad72af5d97ce7a2da0e576ab56e56e0ec&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22dashboard.png%22)

Abaixo a tela de edição de perfil. As informações só serão salvas após clicar no botão `Salvar`

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d20006ab-314f-4f34-bab3-54ef3f1b4735/editarPerfil.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200707%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200707T233231Z&X-Amz-Expires=86400&X-Amz-Signature=a6cbe3ed638e2c211cd7ce0932137e2648e4d25f4033804261324ab034ed72a9&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22editarPerfil.png%22)

### Funcionalidades da aplicação

O sistema de estoque elaborado possui uma sequência lógica de inserção de dados. Primeiramente deve-se cadastrar  as categorias dos itens e os fornecedores dos itens, logo depois devemos cadastrar o item em estoque. Por fim podemos inserir a entrada de um item já cadastrado em estoque. O cadastro de saídas de itens só ocorrem quando há uma quantidade maior do que 0 em estoque. Para deletar os dados deve-se seguir a ordem reversa da inserção, ou seja, removendo os itens, em seguida, fornecedores e categorias. As opções de exclusão só estão disponíveis com fim acadêmico, e desencorajamos  a exclusão dos dados, em especial de entrada e saída, pois além de afetarem o controle do estoque em si, pode afetar o funcionamento do sistema. Em caso de erros, existe a opção de alteração nos registros.

Tela de categorias. Aqui são cadastradas apenas as categorias dos itens do estoque.

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9385bcd5-50b7-4ae2-bbec-988635786abd/categorias.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200707%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200707T233321Z&X-Amz-Expires=86400&X-Amz-Signature=117cd665026b962bd37ddb728bf21f06b6b0ae6e245e761a8a2184c0391e6408&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22categorias.png%22)

Tela de cadastro de fornecedores

![](Phttps://s3.us-west-2.amazonaws.com/secure.notion-static.com/00f3f6ef-7da9-49e5-856e-b1d4e8d4c1f5/fornecedor.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200708%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200708T015011Z&X-Amz-Expires=86400&X-Amz-Signature=ed5095423415a69ca159f6a2fb6fefe833e53599fb99d3cc7f03459489e10d5c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22fornecedor.png%22)

Tela de cadastro de itens no estoque

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/272c0296-1527-4b46-a7b4-d045b07f2e23/estoque.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200708%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200708T015037Z&X-Amz-Expires=86400&X-Amz-Signature=eaca562890214f47d7a4da230ffcd3eb419545d244379dc591b629c2f479f4f2&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22estoque.png%22)

Tela de cadastro de entradas dos itens no estoque

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/272c0296-1527-4b46-a7b4-d045b07f2e23/estoque.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200708%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200708T015106Z&X-Amz-Expires=86400&X-Amz-Signature=4539847918a3804a782ac5cd829616b9d0fd46e691c654a7fcac619165068bb2&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22estoque.png%22)

Tela de cadastro de entradas - Aqui os itens e fornecedores cadastrados anteriormente sao carregados em uma lista para seleção

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ea4acf02-79fc-4d97-93c5-f218d0634c3b/entrada.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200708%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200708T015149Z&X-Amz-Expires=86400&X-Amz-Signature=6cfd064c392f53a761c648ba8a8c2818daba5d0509945629c30a4df9d92439c7&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22entrada.png%22)

Tela de cadastro de saidas

![Projeto%20Interdisciplinar%20Frontend%20a710822a2f6f489bbaf006ff64fb0ea8/saida.png](Projeto%20Interdisciplinar%20Frontend%20a710822a2f6f489bbaf006ff64fb0ea8/saida.png)

Tela de listagem de usuários  cadastrados no sistema - Propósito acadêmico.

![Projeto%20Interdisciplinar%20Frontend%20a710822a2f6f489bbaf006ff64fb0ea8/usuarios.png](Projeto%20Interdisciplinar%20Frontend%20a710822a2f6f489bbaf006ff64fb0ea8/usuarios.png)
