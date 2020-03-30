<template>
  <div v-if="!isLoading">
    <div class="card-container form-card">
      <div class="header" style="padding:20px 40px 10px 40px;" >
        <h2>Featured Items</h2>
      </div>
      <div class="row" style="padding:10px 40px 10px 40px;">
        <div class="column" v-for="item in firstItems" :key="item._id">
          <router-link :to="`/product/${item._id}`">
          <div class="item-card">
            <div class="item-header" >
              <img :src="item.itemPictureUrl" alt="">
            </div>
            <div class="item-description">
              <div>
                {{ item.itemName }}
              </div>
              <div>
                <b-icon v-for="rating in item.itemRating" :key="rating.index" icon="star-fill"></b-icon>
                <b-icon v-for="n in 5 - item.itemRating" :key="n.index" icon="star"></b-icon>
              </div>
              <div>
                ${{ item.itemPrice }}
              </div>
              <div>
                <b-icon class="icon-plus" icon="plus" font-scale="2" variant="secondary"></b-icon>
              </div>
            </div>
          </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {http} from '../../util/axiosHttp.js'

export default {
  name: 'featuredItems',
  data(){
    return{
      items: [],
      isLoading: false,
    }
  },
  computed: {
    adjustedStars(index) {
      return 5 - this.items[index].itemRating;
    },
    firstItems() {
      return this.items.slice(0, 4);
    },
  },
  created: async function(){
    try {
      this.isLoading = true;
      var featuredItems = await http().get(`${process.env.VUE_APP_API_URL}/api/products/featured-products`);
      // console.log(featuredItems);
      if(featuredItems){
        this.isLoading = false;
        this.items = featuredItems.data;
      }
    } catch(err){
      console.log(err);
    }
  }
}

</script>

<style>

</style>