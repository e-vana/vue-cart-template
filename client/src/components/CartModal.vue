<template>
  <div>
    <b-modal body-class="p-5" id="modal-1" title="Cart" hide-footer size="lg">
      <div v-if="cartEmpty">
        <p>There are no items in the cart at this time.</p>
      </div>

      <div v-for="(item, index) in cartItems" :key="index">
        <CartItem v-bind="item" :index="index"/>
      </div>

      <div v-if="!cartEmpty" style="text-align: right;">
        <hr>
        Item Total: ${{ displayItemTotal }}
        <br>
        Shipping Cost: ${{ this.shippingCost}}
        <br>
        Estimated Tax: ${{ displayTax}}
        <hr>
        <b>Your Total: ${{ cartFinalTotal.toFixed(2) }}</b>
      </div>

      <div v-if="showCheckout">
        <b-form>

          <!-- <b-form-group id="firstName" label="First Name" label-for="input-firstName">
            <b-form-input id="input-firstName" required placeholder="John" v-model="firstName"></b-form-input>
          </b-form-group>

          <b-form-group id="lastName" label="Last Name" label-for="input-lastName">
            <b-form-input id="input-lastName" required placeholder="Doe" v-model="lastName"></b-form-input>
          </b-form-group> -->

          <b-form-group id="name" label="Name" label-for="input-name">
            <b-form-input id="input-name" required placeholder="John Doe" v-model="name"></b-form-input>
          </b-form-group>

          <b-form-group id="address" label="Street Address" label-for="input-address">
            <b-form-input id="input-address" required placeholder="12345 Maple Lane" v-model="address"></b-form-input>
          </b-form-group>

          <b-form-group id="city" label="City" label-for="input-city">
            <b-form-input id="input-city" required placeholder="Miami" v-model="city"></b-form-input>
          </b-form-group>

          <b-form-group id="zipcode" label="Zip Code" label-for="input-zipcode">
            <b-form-input id="input-zipcode" required placeholder="55309" v-model="zipCode"></b-form-input>
          </b-form-group>

          <b-form-group id="state" label="State" label-for="input-state">
            <b-form-input id="input-state" required placeholder="Florida" v-model="state"></b-form-input>
          </b-form-group>
        </b-form>
      </div>

      <b-button v-if="this.$store.getters.getCartLength > 0" style="width: 100%;" class="mt-3" @click="toggleCheckout">Checkout</b-button>

    </b-modal>
  </div>
</template>

<script>
import CartItem from './CartItem'
export default {
  name: "CartModal",
  components: {
    CartItem,
  },
  data(){
    return{
      toastCount: 0,
      shippingCost: 9.99,
      taxRate: 0.07,
      showCheckout: false,
      name: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      zipCode: '',
      state: '',
      creditCardString: ''
    }
  },
  methods: {
    removeCart(index) {
      this.$store.commit("removeFromCart", index)
      this.makeToast();
    },
    toggleCheckout(){
      this.showCheckout = !this.showCheckout;
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
    displayTax(){
      return (this.taxRate * this.$store.getters.getCartTotal).toFixed(2);
    },
    displayItemTotal(){
      return (this.$store.getters.getCartTotal).toFixed(2);
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