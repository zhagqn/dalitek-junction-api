<template>
  <div id="app"></div>
</template>

<script>
export default {
  name: "app",
  mounted() {
    this.$api.util.now().then(res => {
      console.log(res);
    });
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 40px;
}
</style>
