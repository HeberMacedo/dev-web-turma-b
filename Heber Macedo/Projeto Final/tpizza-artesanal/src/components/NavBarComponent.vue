<template>
  <div>
    <nav id="nav">
      <router-link to="/" id="logo-url">
        <img :src="`${baseUrl}img/logo_tpizza.svg`" id="logo" />
      </router-link>
      <router-link to="/menu">Cardapio</router-link> |
      <router-link to="/pedidos">Pedidos</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBarComponent",
  data() {
    return {
      baseUrl: process.env.BASE_URL,
    };
  },
};
</script>

<style scoped>
#logo {
  width: 60px;
  height: 60px;
}

#nav #logo-url {
  margin-right: auto;
  margin-left: 0;
}

#nav a {
  color: #fed7aa;
  text-decoration: none;
  margin: 12px;
  transition: 0.5s;
}

#nav a:hover {
  color: white;
  font-size: 20px;
}

#nav {
  background-color: #7f1d1d;
  border-bottom: 3px solid #f97316;
  padding: 15px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
