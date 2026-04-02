<template>
    <div>
        <h2>Usuário: {{ nome }}</h2>
        <p>Email: {{ email }}</p>
        <hr>
        <h1 v-show="InterChamp">Internacional Campeão</h1>
        <img :width="largura" :height="altura" :scr="urlImg" />
    </div>
</template>

<script>

export default {
    name: 'UsuarioComponent',
    data() {
        return {
           nome: 'Matheus Calonico',
           email: 'Matheusscalonico@gmail.com',
           InterChamp: true,
           largura : 300,
           altura : 200,
           urlImg: "https://static.internacional.com.br/cms/assets/BANNER_SITE_e3b96459a1.png"
        };
    }
}
</script>

<style>

</style>