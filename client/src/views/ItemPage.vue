<template>
  <div v-if="!isLoading">
    <div class="container">

    <b-row>
      <b-col md="6" cols="12" class="product-img-container p-0">
        <img :src="item.itemPictureUrlLarge" alt="">
      </b-col>
      <b-col md="6" cols="12" class="p-0">
        <div class="text-container p-5">
          <div>
            <h2>{{ item.itemName }}</h2>
            <div class="mb-2">
              <b-icon v-for="rating in item.itemRating" :key="rating.index" icon="star-fill"></b-icon>
              <b-icon v-for="n in 5 - item.itemRating" :key="n.index" icon="star"></b-icon>
            </div>
            <!-- <p>{{ item.itemDescription }}</p> -->
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste animi accusamus minus, doloribus dolor excepturi aspernatur ab. Repudiandae iste fugit autem deleniti! Optio dolor aspernatur, omnis, laboriosam voluptas voluptatem placeat necessitatibus est iste nostrum in commodi nisi, ipsum consequatur beatae?</p>

            <h5>${{ item.itemPrice }}</h5>
            <b-button variant="primary">Add to Cart</b-button>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12" class="p-0">
      <!-- <b-col md="12" class="p-0" v-if="hasReviews" > -->
        <div class="form-card p-5">
        <h2>Reviews</h2>
        <hr>
        <b-row v-for="review in reviews" :key="review.index" class="mb-2">
          <b-col>
            <b-icon icon="person-fill"></b-icon>
            {{ review.reviewerName }}
            <br>
            <b-icon v-for="rating in review.reviewRating" :key="rating.index" icon="star-fill"></b-icon>
            <b-icon v-for="n in 5 - review.reviewRating" :key="n.index" icon="star"></b-icon>
            <p>{{ review.reviewText }}</p>
            <hr>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <p>Want to add a review for this product?</p>
              <b-button variant="secondary">Add Review</b-button>
          </b-col>
        </b-row>

        </div>
      </b-col>
    </b-row>
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
      reviews: [],
      isLoading: false,
    }
  },
  created: async function(){
    try {
      this.isLoading = true;
      var getItem = await http().get(`${process.env.VUE_APP_API_URL}/api/products/${this.$route.params.id}`);

      var getReviews = await http().get(`${process.env.VUE_APP_API_URL}/api/reviews/${this.$route.params.id}`);

      if(getItem){
        console.log(getItem);
        this.item = getItem.data[0];
      }
      if(getReviews){
        console.log(getReviews);
        this.reviews = getReviews.data;
      }
      this.isLoading = false;
    }catch (err){
      console.log(err);
      this.isLoading = false;

    }
  },
  computed: {
    hasReviews(){
      if(this.reviews.length > 0){
        return true;
      } else {
        return false;
      }
    }
  }
}
</script>

<style>

.container {
  margin: 40px 200px;
}

.product-img-container img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  max-width: 600px;
  max-height: 600px;

}
.text-container {
  display: flex;
  align-items: center;
  height: 100%;
  background-color: var(--light-bg);
}

@media screen and (max-width: 768px) {
  .text-container {
    margin-top: 20px;
  }
  
}

</style>