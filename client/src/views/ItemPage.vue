<template>
  <div v-if="!isLoading">
    <div class="row">
      <div class="column">
        <ItemCard
          :itemName="item.itemName"
          :itemPrice="item.itemPrice"
          :itemId="item.itemId"
          :itemPictureUrl="item.itemPictureUrl"
          :itemDescription="item.itemDescription"
        />
        <ItemCard v-bind="item"/>
        </div>
      <div class="column"></div>
    </div>
  </div>
</template>

<script>

import ItemCard from '@/components/ItemCard.vue'
import {http} from '../util/axiosHttp.js'

export default {
  name: 'ItemPage',
  components: {
    ItemCard
  },
  data(){
    return{
      item: [],
      isLoading: false,
    }
  },
  created: async function(){
    try {
      this.isLoading = true;
      var getItem = await http().get(`${process.env.VUE_APP_API_URL}/api/products/${this.$route.params.id}`);
      if(getItem){
        console.log(getItem);
        this.item = getItem.data[0];
        this.isLoading = false;

      }
    }catch (err){
      console.log(err);
      this.isLoading = false;

    }
  },
  computed: {
    // item(){
    //   console.log(this.items[0]);
    //   return this.items[0]
    // }
  }
}
</script>

<style>

</style>