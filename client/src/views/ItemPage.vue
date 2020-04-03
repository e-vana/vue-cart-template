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
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste animi accusamus minus, doloribus dolor excepturi aspernatur ab. Repudiandae iste fugit autem deleniti! Optio dolor aspernatur, omnis, laboriosam voluptas voluptatem placeat necessitatibus est iste nostrum in commodi nisi, ipsum consequatur beatae?</p>

            <h5>${{ item.itemPrice }}</h5>
            <b-button @click="addToCart" variant="primary">Add to Cart</b-button>
            


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
        <b-row v-for="review in limitReviews" :key="review.index" class="mb-2">
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
            <!-- <a class="show-more-reviews" @click="incrementReviews">Show more reviews</a> -->
            <b-button class="show-more-reviews" @click="incrementReviews" variant="primary">
              <div v-if="!noMoreReviews">
                Show More Reviews
              </div>
              <div v-if="noMoreReviews">
                There are currently no more reviews to show.
              </div>
            </b-button >

          </b-col>
        </b-row>
        <hr>

        <b-row v-if="!submittedAlready">
          <b-col>
            <b-button v-if="!showAddReview" @click="toggleReview" class="show-more-reviews" variant="secondary">Add a review for this product</b-button>
            <h3 v-if="showAddReview">Add a review for this product</h3>
            <div v-if="showAddReview">
              <b-form @submit.prevent>
                <b-form-group label-for="name-input" label="Your Name">
                  <b-input class="mb-3" v-model="reviewerName" id="name-input"></b-input>
                </b-form-group>

                <b-form-group label-for="review-input" label="Your Review">
                  <b-form-textarea class="mb-3" v-model="reviewText" id="review-input"></b-form-textarea>
                </b-form-group>

                <b-form-group  label="What do you rate this product? (Where 5 is the best rating and 0 is the worst).">
                  <b-form-radio-group
                    v-model="selected"
                    :options="options"
                    name="radio-inline"
                  ></b-form-radio-group>
                </b-form-group>
                <b-button variant="primary" @click="submitReview" class="mr-2">Submit Review</b-button>
                <b-button variant="danger" @click="toggleReview">Cancel Review</b-button>
             </b-form>
            </div>
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
      showAddReview: false,
      reviewText: '',
      reviewerName: '',
      selected: '',
      options: [
        {
          text: '1 Star', value: 1
        },
        {
          text: '2 Stars', value: 2
        },
        {
          text: '3 Stars', value: 3
        },
        {
          text: '4 Stars', value: 4
        },
        {
          text: '5 Stars', value: 5
        }
      ],
      submittedAlready: false,
      howManyReviews: 5,
      noMoreReviews: false
    }
  },
  methods: {
    toggleReview(){
      this.showAddReview = !this.showAddReview;
    },
    incrementReviews(){
      this.howManyReviews += 5;
    },
    addToCart(){
      var item = this.item;
      this.$store.commit("pushToCart", item)
    },
    submitReview: async function(){
      try {
        this.$store.commit("setLoading", true);
        this.$store.commit("setLoadingPercent", 25);

        var routeParam = this.$route.params.id;
        var postReview = await http().post(`${process.env.VUE_APP_API_URL}/api/reviews/`, {
          reviewerName: this.reviewerName,
          reviewText: this.reviewText,
          reviewRating: this.selected,
          reviewFor: routeParam
        });
        this.$store.commit("setLoadingPercent", 50);

        if(!postReview){
          throw "Error submitting review."
        }

        var refetch = await this.refetchReviews();

        this.$store.commit("setLoadingPercent", 75);
        this.submittedAlready = true;
        this.$store.commit("setLoading", false);


      }catch(err){
        console.log(err);
        this.isLoading = false;
      }
    },
    refetchReviews: async function(){
      try {
        var getReviews = await http().get(`${process.env.VUE_APP_API_URL}/api/reviews/${this.$route.params.id}`);

        if(getReviews){
          console.log(getReviews);
          this.reviews = getReviews.data;
        }
        this.isLoading = false;
      }catch (err){
        console.log(err);
        this.isLoading = false;
      }
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
    },
    limitReviews(){
      var showReviews = this.howManyReviews;
      var sliceTo = this.reviews.length;

      if(showReviews > this.reviews.length){
        sliceTo = this.reviews.length;
        this.noMoreReviews = true;
      } else {
        sliceTo = showReviews;
      }
      var arr = this.reviews.slice(0, sliceTo);
      return arr;
    }
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
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

.show-more-reviews  {
  text-align: center;
  width: 100%;
  display: inline-block;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .text-container {
    margin-top: 20px;
  }
  
}

</style>