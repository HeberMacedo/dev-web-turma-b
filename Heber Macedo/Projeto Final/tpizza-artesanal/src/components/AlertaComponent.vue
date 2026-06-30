<template>
  <div v-if="mensagem" class="alerta" :class="tipo">
    <span class="alerta-icone">{{ icone }}</span>
    <span>{{ mensagem }}</span>
  </div>
</template>

<script>
export default {
  name: "AlertaComponent",
  props: {
    tipo: {
      type: String,
      default: "info",
    },
    mensagem: {
      type: String,
      default: "",
    },
  },
  computed: {
    icone() {
      const icones = {
        erro: "!",
        aviso: "i",
        info: "?",
        sucesso: "+",
      };

      return icones[this.tipo] || icones.info;
    },
  },
};
</script>

<style scoped>
.alerta {
  width: min(720px, calc(100% - 32px));
  margin: 16px auto;
  padding: 14px 18px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: bold;
  text-align: left;
  border-left: 6px solid;
}

.alerta-icone {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.erro {
  color: #7f1d1d;
  background: #fee2e2;
  border-color: #dc2626;
}

.erro .alerta-icone {
  background: #dc2626;
}

.aviso {
  color: #7c2d12;
  background: #ffedd5;
  border-color: #f97316;
}

.aviso .alerta-icone {
  background: #f97316;
}

.info {
  color: #1e3a8a;
  background: #dbeafe;
  border-color: #2563eb;
}

.info .alerta-icone {
  background: #2563eb;
}

.sucesso {
  color: #14532d;
  background: #dcfce7;
  border-color: #16a34a;
}

.sucesso .alerta-icone {
  background: #16a34a;
}
</style>
