# T-Pizza Artesanal

Projeto final de Desenvolvimento Web com Vue 3, evoluido a partir da base estrutural do sistema T-Burguer usado em sala de aula.

## Visao Geral

O sistema foi customizado para o segmento de pizzaria artesanal. A identidade visual, textos, imagens, campos de formulario, dados da API e regras de pedido foram atualizados para representar a marca **T-Pizza Artesanal**.

Tecnologias utilizadas:

- Vue 3
- Vue Router
- JSON Server
- GitHub Pages
- Render

Principais alteracoes realizadas:

- Nome e identidade visual substituidos de T-Burguer para T-Pizza Artesanal.
- Cardapio adaptado para pizzas, com imagens, descricoes e precos do novo segmento.
- Campo "Ponto da carne" removido e substituido por "Tamanho da pizza".
- Complementos de hamburguer substituidos por sabores, bordas recheadas e bebidas.
- Listagem de pedidos adaptada para exibir cliente, pizza, tamanho, sabores, borda, bebidas e status.

Exemplo da regra de negocio no componente de pedido:

```js
if (this.listaSaboresSelecionados.length > 2) {
  this.exibirAlerta("aviso", "A pizza meio-a-meio permite no maximo 2 sabores.");
  return false;
}
```

## Solucao Tecnica dos Alertas

Foi criado o componente `AlertaComponent.vue`, reutilizado no cadastro e na listagem de pedidos. Ele recebe duas props: `tipo` e `mensagem`. A partir do tipo, o componente aplica automaticamente cor e icone semantico.

Padrao usado:

- `erro`: vermelho para campos obrigatorios e acoes invalidas.
- `aviso`: laranja para alertas importantes, como limite de dois sabores.
- `info`: azul para informacoes contextuais.
- `sucesso`: verde para cadastro, atualizacao e exclusao de pedidos.

Trecho da chamada do alerta:

```vue
<alerta-component-vue :tipo="alerta.tipo" :mensagem="alerta.mensagem" />
```

Trecho da validacao:

```js
if (!this.nomeCliente.trim()) {
  this.exibirAlerta("erro", "Informe o nome do cliente para continuar.");
  return false;
}
```

## UX e Fluxo de Pedidos

Ao confirmar um pedido valido, o sistema exibe alerta de sucesso e navega automaticamente para a tela de monitoramento:

```js
this.exibirAlerta("sucesso", "Pedido cadastrado com sucesso! Abrindo a tela de monitoramento...");

setTimeout(() => {
  this.$router.push("/pedidos");
}, 1200);
```

A tela de pedidos consulta a API no `mounted()` e exibe a lista atualizada. Na exclusao, a interface remove o pedido imediatamente com `filter`, garantindo re-renderizacao visual sem precisar recarregar a pagina.

```js
this.listaPedidosRealizados = this.listaPedidosRealizados.filter(
  (pedido) => pedido.id !== idPedido
);
```

## Links do Projeto

- API JSON Server: [https://api-tpizza-artesanal.onrender.com](https://api-tpizza-artesanal.onrender.com)
- Endpoint do cardapio: [https://api-tpizza-artesanal.onrender.com/menu](https://api-tpizza-artesanal.onrender.com/menu)
- Endpoint dos pedidos: [https://api-tpizza-artesanal.onrender.com/pedidos](https://api-tpizza-artesanal.onrender.com/pedidos)
- Producao GitHub Pages: [https://hebermacedo.github.io/tpizza-artesanal/](https://hebermacedo.github.io/tpizza-artesanal/)
- Repositorio do front-end: [https://github.com/HeberMacedo/tpizza-artesanal](https://github.com/HeberMacedo/tpizza-artesanal)
- Repositorio do banco-json: [https://github.com/HeberMacedo/banco-json](https://github.com/HeberMacedo/banco-json)

## Como executar localmente

Instale as dependencias:

```bash
npm install
```

Execute o JSON Server:

```bash
npm run bancojson
```

Em outro terminal, execute o Vue:

```bash
npm run serve
```

## Deploy

O projeto possui workflow em `.github/workflows/pages.yml` para:

- instalar dependencias;
- gerar build com `npm run build`;
- validar pull requests;
- publicar automaticamente no GitHub Pages quando houver push na branch `main`.

O banco JSON possui estrutura separada na pasta `banco-json`, pronta para ser enviada para um segundo repositorio e publicada como JSON Server.
