<template>
  <div id="app" class="my-bg-dark">
    <Navbar></Navbar>
    <b-progress class="loaderPos" v-if="this.$store.getters.isLoading" :value="this.$store.getters.getLoadingPercent" :max="100" animated></b-progress>

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  components: {
    Navbar
  },
}
</script>

<style>

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

body {
  margin: 0px;
}

html {
  background-color: #e4e4e4;
}
#app {
  font-family: 'Oxygen', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.loaderPos {
  z-index: 50;
  position: fixed;
  top: 0;
  width: 100%;
}
.cartClicked {
  z-index: 40;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.904);
}
.cart-card {
  margin: 200px;
}
</style>
