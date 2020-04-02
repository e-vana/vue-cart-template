!<template>
<div>
  <div v-if="cartEmpty">
    <p>There are no items in the cart at this time.</p>
  </div>
    <div v-for="(item, index) in this.$store.getters.getCart" class="mb-4" :key="index">
    <b-toast id="example-toast" title="BootstrapVue" static no-auto-hide>
      Removed Item from toast
    </b-toast>
    <b-row class="cart-item-container">
      <b-col>
        <div class="cart-item-img">
          <img :src="item.itemPictureUrl"  alt="">
        </div>
      </b-col>

      <b-col>{{ item.itemName }}</b-col>
      <b-col>${{ item.itemPrice }}</b-col>
      <!-- <b-col>Quantity: {{ item.quantity }}</b-col> -->
      <b-col>
        <!-- Quantity: {{ item.quantity }} -->
        Quantity:
        <input type="number" name="" id="" :placeholder="item.quantity" :value="item.quantity">
        {{ quantityVal }}
      </b-col>



      <b-col><b-icon @click="removeCart(index)" icon="x" style="width: 25px; height: 25px;"></b-icon></b-col>
    </b-row>
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
export default {
  name: "cartModalContent",
  data(){
    return{
      toastCount: 0,
      shippingCost: 9.99,
      quantityVal: 0,
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
    quantityUpdate(){

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