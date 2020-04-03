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

    Item Total: ${{ this.$store.getters.getCartTotal }}
    <br>
    Shipping Cost: ${{ this.shippingCost}}
    <br>
    Estimated Tax: ${{ this.$store.getters.getCartTotal * this.taxRate}}
    <hr>
    <b>Your Total: ${{ cartFinalTotal }}</b>
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
      taxRate: 0.07,
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
    cartFinalTotal() {
      return this.shippingCost + this.$store.getters.getCartTotal;
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