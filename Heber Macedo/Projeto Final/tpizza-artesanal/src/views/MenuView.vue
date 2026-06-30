<template>
  <div class="menu-page">
    <h1>Cardapio</h1>
    <div id="lista-cardapio">
      <div id="card-content" v-for="pizza in listaMenuPizzas" :key="pizza.id">
        <img class="foto-pizza" :src="pizza.foto" />
        <div class="card-coluna">
          <p id="nome-content">{{ pizza.nome }}</p>
          <p id="preco-content">R$ {{ pizza.valor }},00</p>
          <p id="descricao-content">{{ pizza.descricao }}</p>
          <button @click="selecionarPizza(pizza)">Selecionar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuView",
  data() {
    return {
      listaMenuPizzas: [],
    };
  },
  methods: {
    async consultarMenu() {
      const response = await fetch(`${this.$apiUrl}/menu`);
      const dados = await response.json();
      this.listaMenuPizzas = dados.pizzas;
    },
    selecionarPizza(pizzaSelecionada) {
      const param = JSON.stringify(pizzaSelecionada);
      const pizzaJson = encodeURIComponent(param);
      this.$router.push({
        path: "/config-pedido",
        query: { pizza: pizzaJson },
      });
    },
  },
  mounted() {
    this.consultarMenu();
  },
};
</script>

<style scoped>
.menu-page {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto 48px;
}

#card-content {
  display: flex;
  flex-direction: column;
  min-height: 470px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px #444;
  background: white;
}

#lista-cardapio {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin: 28px auto 0;
}

#nome-content {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin: 0 0 10px;
}

.foto-pizza {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

#preco-content {
  font-size: 35px;
  font-weight: bold;
  text-align: center;
  color: #15803d;
  margin: 0 0 10px;
}

#descricao-content {
  font-size: 16px;
  text-align: left;
  color: #555;
  margin: 0 0 18px;
  white-space: pre-line;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
}

.card-coluna {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 15px;
}

.card-coluna button {
  margin-top: auto;
  padding: 10px;
  width: 100%;
  border-radius: 8px;
  border: none;
  color: white;
  background-color: #15803d;
  cursor: pointer;
  transition: 0.5s;
}

.card-coluna button:hover {
  color: rgb(202, 246, 202);
  background-color: #14532d;
}
</style>
