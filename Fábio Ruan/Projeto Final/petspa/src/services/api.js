const dadosLocais = {
  "produtos": [
    {
      "id": 1,
      "nome": "Banho Simples",
      "precoBase": 40,
      "imagem": "banho.jpg",
      "descricao": "Banho rápido com shampoo neutro e secagem.",
      "categoria": "banho"
    },
    {
      "id": 2,
      "nome": "Tosa Completa",
      "precoBase": 60,
      "imagem": "tosa.jpg",
      "descricao": "Tosa completa com acabamento e hidratação.",
      "categoria": "tosa"
    },
    {
      "id": 3,
      "nome": "Hidratação Control",
      "precoBase": 35,
      "imagem": "hidratacao.jpg",
      "descricao": "Tratamento hidratante para pelos secos e quebradiços.",
      "categoria": "banho"
    },
    {
      "id": 4,
      "nome": "Spa de Ofurô",
      "precoBase": 90,
      "imagem": "spa.jpg",
      "descricao": "Experiência completa com aroma-terapia e relaxamento.",
      "categoria": "banho"
    }
  ],
  "pedidos": []
};

export const BASE_URL = "LOCAL_MOCK";

function normalizarProduto(produto) {
  const precoBase = produto.precoBase ?? produto.preco ?? 0;
  return {
    ...produto,
    precoBase,
    preco: produto.preco ?? precoBase,
    imagem: produto.imagem || "banho.svg",
  };
}

export async function buscarProdutos() {
  return Promise.resolve(dadosLocais.produtos.map(normalizarProduto));
}

export async function buscarPedidos() {
  return Promise.resolve(dadosLocais.pedidos);
}

export async function criarPedido(pedido) {
  const novoPedido = { id: Date.now(), ...pedido };
  dadosLocais.pedidos.push(novoPedido);
  return Promise.resolve(novoPedido);
}

export async function excluirPedido(id) {
  dadosLocais.pedidos = dadosLocais.pedidos.filter(p => p.id !== id);
  return Promise.resolve({ sucesso: true });
}