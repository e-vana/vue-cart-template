<template>
  <div class="form-card container">
    <h2>Your Cart</h2>
    <hr>
    <div v-for="(item, i) in this.$store.getters.getCart" @click="popCart(i)">
      <h3>{{ item.itemName }}</h3>
    </div>
    <hr>
    <h4>Total: {{ cartTotal }}</h4>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  methods: {
    popCart: function(i){
      console.log(i)
      this.$store.commit("removeFromCart", i);
    }
  },
  computed: {
    cartTotal: function(){
      var total = 0;
      var i;
      var cart = this.$store.getters.getCart;

      for(i=0; i < cart.length; i++){
        total = cart[i].itemPrice + total;
      }
      return total;
    }
  }
}
</script>

<style>

</style>