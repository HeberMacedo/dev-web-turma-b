<template>
  <div id="main-banner">
    <h1>T-Pizza Artesanal</h1>
  </div>
</template>

<script>
export default {
  name: "BannerComponent",
};
</script>

<style scoped>
#main-banner {
  background-image: url("https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1600&q=80");
  background-position: center;
  background-size: cover;
  height: 360px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

#main-banner h1 {
  font-size: 40px;
  color: white;
  text-align: center;
  background: #7f1d1d;
  padding: 25px;
  border-radius: 100px 0px 0px 100px;
}

@media (max-width: 700px) {
  #main-banner {
    height: 280px;
  }

  #main-banner h1 {
    font-size: 30px;
    border-radius: 8px 0 0 8px;
  }
}
</style>
