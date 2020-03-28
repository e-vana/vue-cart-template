<template>
  <div class="hero-container">
    <div class="row">
      <div class="column">
        <div class="hero-text">
          <div>
            <h2>Vue Cart Template</h2>
            <h3>Made utilizing Vue, Vuex, Vue Router, Express and MongoDB.</h3>
            <b-button variant="primary" class="mr-2">Login</b-button>
            <b-button variant="secondary">Register</b-button>

          </div>


        </div>
      </div>
      <div class="column">
        <img class="hero-img" src="@/assets/bag.jpg" alt="">
      </div>

    </div>
    

  </div>
</template>

<script>
export default {
  name: "hero"
}
</script>

<style>

.hero-container {
  /* background-color: blue; */
  width: 100%;
  padding: 80px;
  /* background-color: rgb(247, 247, 247); */
}

.hero-text {
  display: flex;
  align-items: center;
  height: 100%;
  
}

.hero-text button {
  padding: 10px 40px;
  text-transform: uppercase;
  font-size: 14px;
}

.hero-text h3 {
  font-size: 20px;
  font-weight: normal;
  color: #7f8994;
  margin: 20px 0px;
}

.hero-img {
  width: 100%;
  object-fit: cover;
}
</style>