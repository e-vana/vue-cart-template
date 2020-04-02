!<template>
  <div>
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
</template>

<script>
export default {
  name: 'cartItem'
}
</script>

<style>

</style>