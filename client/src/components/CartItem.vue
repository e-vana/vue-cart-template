!<template>
  <div  class="mb-4">
    <b-toast id="example-toast" title="BootstrapVue" static no-auto-hide>
      Removed Item from toast
    </b-toast>
    <b-row class="cart-item-container">
      <b-col>
        <div class="cart-item-img">
          <img :src="itemPictureUrl"  alt="">
        </div>
      </b-col>

      <b-col>{{ itemName }}</b-col>
      <b-col><b v-b-tooltip.hover title="Amount in cart">({{ quantity }})</b></b-col>
      <b-col>${{ itemPrice }}</b-col>
      <b-col><b-icon v-b-tooltip.hover title="Edit quantity" @click="toggleEditQuantity()" icon="pencil" style="width: 25px; height: 25px;"></b-icon></b-col>

      <b-col><b-icon v-b-tooltip.hover title="Remove from cart"  @click="removeCart()" icon="x" style="width: 25px; height: 25px;"></b-icon></b-col>

    </b-row>
    <b-row v-if="showEditQuantity">
      <b-col>
        How many of this item do you want?
        <input type="number" min="1" :placeholder="quantity" v-model.number="itemQuantity" @change="updateQuantity()">
      </b-col>
    </b-row>
    
  </div>
</template>

<script>
export default {
  name: 'cartItem',
  data(){
    return {
      itemQuantity: this.quantity,
      showEditQuantity: false
    }
  },
  props: {
    itemName: String,
    itemPrice: Number,
    itemId: String,
    itemPictureUrl: String,
    itemDescription: String,
    quantity: Number,
    index: Number
  },
  methods: {
    updateQuantity(){
      // this.$store.commit("updateQuantity", this.index, this.itemQuantity)
      this.$store.commit("updateQuantity", {index: this.index, itemQuantity: this.itemQuantity})

    },
    removeCart(){
      // this.$store.commit("removeFromCart", this.index)
      this.$store.commit("removeFromCart", {index: this.index})

      // this.makeToast();
    },
    toggleEditQuantity(){
      this.showEditQuantity = !this.showEditQuantity;
    }
  }
}
</script>

<style>

</style>