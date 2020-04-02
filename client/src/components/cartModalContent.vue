!<template>
<div>
  <div v-if="cartEmpty">
    <p>There are no items in the cart at this time.</p>
  </div>
    <!-- <div v-for="(item, index) in cartItems" class="mb-4" :key="index">
      <CartItem v-bind="item" />
    </div> -->

    <div v-for="(item, index) in cartItems" :key="index">
      <CartItem v-bind="item" :index="index"/>
    </div>

  <div v-if="!cartEmpty" style="text-align: right;">
    <hr>
    Item Total: ${{ cartTotal }} +
    <br>
    Shipping & Handling: ${{ shippingCost }}
    <br>
    <hr>
    <b>Total: ${{ finalTotal }}</b>
  </div>
</div>

</template>
<script>
import CartItem from './CartItem'

export default {
  name: "CartModalContent",
  components: {
    CartItem
  },
  data(){
    return{
      toastCount: 0,
      shippingCost: 9.99,
    }
  },
  methods: {
    removeCart(index) {
      this.$store.commit("removeFromCart", index)
      this.makeToast();
    },
    makeToast(append = false) {
      this.toastCount++
      this.$bvToast.toast(`Thanks for considering this item!`, {
        title: 'Removed Item From Cart',
        autoHideDelay: 5000,
        appendToast: append
      })
    },

  },
  computed: {
    cartItems(){
      return this.$store.getters.getCart;
    },
    cartEmpty(){
      if(this.$store.getters.getCartLength < 1){
        return true;
      }else {
        return false;
      }
    },
    cartTotal: function(){
      var total = 0;
      var i;
      var cart = this.$store.getters.getCart;

      for(i=0; i < cart.length; i++){
        if(cart[i].quantity){
          total = cart[i].itemPrice * cart[i].quantity + total;
        } else {
          total = cart[i].itemPrice + total;
        }
      }
      return total;
    },
    finalTotal: function(){
      return this.cartTotal + this.shippingCost;
    }
  }
}
</script>

<style>
.cart-item-img img {
  height: 50px;
  width: 50px;
  object-fit: cover;
}
.cart-item-container {
  display: flex;
  align-items: center;
}
</style>