<template>
  <div class="pedido-page">
    <alerta-component-vue :tipo="alerta.tipo" :mensagem="alerta.mensagem" />
    <form id="pedido-form" @submit="criarPedido($event)">
      <div class="pizza-preview">
        <p id="nome-pizza-content">
          {{ pizza && pizza.nome ? pizza.nome : "--" }}
        </p>
        <img
          id="foto-content"
          :src="pizza && pizza.foto ? pizza.foto : ''"
        />
      </div>
      <div class="form-card">
        <div class="inputs">
          <label>Nome do Cliente</label>
          <input
            v-model="nomeCliente"
            type="text"
            placeholder="Digite o nome do cliente"
            id="nome-cliente"
          />
        </div>
        <div class="inputs">
          <label>Tamanho da pizza</label>
          <select
            v-model="tamanhoSelecionado"
            name="tamanho-pizza"
            id="tamanho-pizza"
          >
            <option value="" selected>Selecione o tamanho</option>
            <option
              v-for="tamanho in listaTamanhos"
              :key="tamanho.id"
              :value="tamanho"
            >
              {{ tamanho.descricao }}
            </option>
          </select>
        </div>
        <div class="inputs">
          <label id="opcionais-titulo">Monte sua pizza</label>
          <p class="campo-ajuda">Escolha ate 2 sabores</p>

          <div class="opcoes-grid">
            <label
              v-for="sabor in listaSabores"
              :key="sabor.id"
              class="checkbox-container"
            >
              <input
                type="checkbox"
                :name="sabor.nome"
                :value="sabor"
                v-model="listaSaboresSelecionados"
              />
              <span>{{ sabor.nome }}</span>
            </label>
          </div>

          <label>Escolha a borda</label>

          <select v-model="bordaSelecionada" name="borda-pizza" id="borda-pizza">
            <option value="">Sem borda recheada</option>
            <option v-for="borda in listaBordas" :key="borda.id" :value="borda">
              {{ borda.nome }}
            </option>
          </select>

          <label>Adicione uma bebida</label>

          <div class="opcoes-grid">
            <label
              v-for="bebida in listaBebidas"
              :key="bebida.id"
              class="checkbox-container"
            >
              <input
                type="checkbox"
                :name="bebida.nome"
                :value="bebida"
                v-model="listaBebidasSelecionadas"
              />
              <span>{{ bebida.nome }}</span>
            </label>
          </div>

          <div class="inputs">
            <input type="submit" class="submit-btn" value="Confirmar Pedido" />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import AlertaComponentVue from "@/components/AlertaComponent.vue";

export default {
  name: "PedidoComponent",
  components: {
    AlertaComponentVue,
  },
  props: {
    pizza: null,
  },
  data() {
    return {
      listaTamanhos: [],
      listaSabores: [],
      listaBordas: [],
      listaBebidas: [],
      nomeCliente: "",
      tamanhoSelecionado: "",
      bordaSelecionada: "",
      listaSaboresSelecionados: [],
      listaBebidasSelecionadas: [],
      alerta: {
        tipo: "info",
        mensagem: "Revise os dados do pedido antes de confirmar.",
      },
    };
  },
  methods: {
    exibirAlerta(tipo, mensagem) {
      this.alerta = { tipo, mensagem };
    },
    async getTamanhos() {
      const response = await fetch(`${this.$apiUrl}/tamanhos`);
      const dados = await response.json();
      this.listaTamanhos = dados;
    },
    async getOpcionais() {
      const response = await fetch(`${this.$apiUrl}/opcionais`);
      const dados = await response.json();
      this.listaSabores = dados.sabores;
      this.listaBordas = dados.bordas;
      this.listaBebidas = dados.bebidas;
    },
    validarPedido() {
      if (!this.pizza || !this.pizza.id) {
        this.exibirAlerta("erro", "Selecione uma pizza no cardapio antes de confirmar o pedido.");
        return false;
      }

      if (!this.nomeCliente.trim()) {
        this.exibirAlerta("erro", "Informe o nome do cliente para continuar.");
        return false;
      }

      if (!this.tamanhoSelecionado) {
        this.exibirAlerta("erro", "Escolha o tamanho da pizza.");
        return false;
      }

      if (this.listaSaboresSelecionados.length === 0) {
        this.exibirAlerta("erro", "Escolha pelo menos um sabor para a pizza.");
        return false;
      }

      if (this.listaSaboresSelecionados.length > 2) {
        this.exibirAlerta("aviso", "A pizza meio-a-meio permite no maximo 2 sabores.");
        return false;
      }

      return true;
    },
    async criarPedido(e) {
      e.preventDefault();

      if (!this.validarPedido()) {
        return;
      }

      const dadosPedido = {
        nome: this.nomeCliente.trim(),
        tamanho: this.tamanhoSelecionado,
        sabores: Array.from(this.listaSaboresSelecionados),
        borda: this.bordaSelecionada,
        bebidas: Array.from(this.listaBebidasSelecionadas),
        pizza: this.pizza,
        statusId: 5,
      };

      const dadosJson = JSON.stringify(dadosPedido);

      const req = await fetch(`${this.$apiUrl}/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: dadosJson,
      });

      if (!req.ok) {
        this.exibirAlerta("erro", "Nao foi possivel cadastrar o pedido. Tente novamente.");
        return;
      }

      this.exibirAlerta("sucesso", "Pedido cadastrado com sucesso! Abrindo a tela de monitoramento...");

      setTimeout(() => {
        this.$router.push("/pedidos");
      }, 1200);
    },
  },
  mounted() {
    this.getTamanhos();
    this.getOpcionais();
  },
};
</script>

<style scoped>
.pedido-page {
  width: min(980px, calc(100% - 32px));
  margin: 0 auto 56px;
}

#pedido-form {
  width: 100%;
}

.pizza-preview {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  margin: 0 auto 20px;
}

#foto-content {
  display: block;
  width: 100%;
  height: 180px;
  object-fit: cover;
}

#nome-pizza-content {
  font-size: 43px;
  font-weight: bold;
  text-align: left;
  color: #fff7ed;
  padding: 24px 32px;
  margin: 0;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.75));
}

.form-card {
  width: min(720px, 100%);
  margin: 0 auto;
  padding: 24px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.inputs {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

label {
  font-weight: bold;
  margin: 0 0 10px;
  color: #222;
  padding: 5px 12px;
  display: flex;
  border-left: 4px solid #c2410c;
}

input,
select {
  padding: 12px;
  width: 100%;
  box-sizing: border-box;
  border: solid #222 1px;
  border-radius: 8px;
  min-height: 45px;
  font-size: 14px;
}

select {
  height: 45px;
}

#opcionais-titulo {
  width: 100%;
}

#opcionais-subtitulo {
  display: none;
}

.campo-ajuda {
  margin: -4px 0 12px;
  color: #666;
  text-align: left;
}

.opcoes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 8px;
  margin-bottom: 18px;
}

.checkbox-container {
  align-items: center;
  border: 1px solid #e5e7eb;
  border-left: 4px solid #f97316;
  border-radius: 8px;
  cursor: pointer;
  gap: 8px;
  margin: 0;
  padding: 10px;
}

.checkbox-container span {
  font-weight: bold;
  text-align: left;
}

.checkbox-container input {
  width: auto;
  min-height: auto;
}

.submit-btn {
  background-color: #7f1d1d;
  color: white;
  font-weight: bold;
  border: none;
  font-size: 18px;
  border-radius: 12px;
  padding: 16px;
  margin: 0 auto;
  cursor: pointer;
  width: 100%;
  height: auto;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: #f97316;
  color: #222;
}
</style>
