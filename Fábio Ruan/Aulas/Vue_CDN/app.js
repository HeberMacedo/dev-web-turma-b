const meuAppVue = {
    data() {
        return {
            nome: "Fábio Ruan",
            idade: 18,
            inputText: "",
        };
    }
};

Vue.createApp(meuAppVue).mount("#app");
 