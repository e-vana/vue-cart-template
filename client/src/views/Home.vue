<template>
  <div class="home">
    <div>
      <b-row>
        <b-col md="1"></b-col>
        <b-col md="10" cols="12" class="form-card p-5 mt-4">

          <h2>Welcome to Vue Cart Template</h2>
          <hr>
          <b-container fluid>

          <b-card-group deck class="mt-3">
            
            <b-card v-for="item in items" :key="item.itemId" :title="item.itemName" :img-src="item.itemPictureUrl" class="itemCard">
              <template class="footer" v-slot:footer>
                <div> 
                  <b-icon v-for="rating in item.itemRating" icon="star-fill"></b-icon>
                  <b-icon v-for="n in 5 - item.itemRating" icon="star"></b-icon>
                </div>
                <div class="footerContainer">
                  <div>
                    <em>${{ item.itemPrice }}</em>
                  </div>
                  <div>
                    <b-button class="text-right" variant="primary">Add to Cart</b-button>
                  </div>
                </div>
              </template>
            </b-card>
          </b-card-group>
          </b-container fluid>

        
          <hr>



          <h5>Want more information about what this application does or how it works?</h5>
          <router-link to="/breakdown"><b-button class="mr-2" variant="primary">View in-depth breakdown</b-button></router-link>

        </b-col>
        <b-col md="1"></b-col>

      </b-row>
    </div>



  
  </div>
</template>

 
<script>
import ItemCard from '../components/ItemCard'

export default {
  name: 'home',
  components: {
    ItemCard
  },
  data(){
    return {
      items: [
        {
          itemName: "Tea Kettle",
          itemPrice: 19.99,
          itemId: "1a2a3a4a",
          // itemPictureUrl: "../assets/kettle.jpg",
          itemPictureUrl: require('@/assets/kettle.jpg'),
          itemDescription: "This is a small black tea kettle.",
          itemRating: 4
        },
        {
          itemName: "Coffee Grinder",
          itemPrice: 8.99,
          itemId: "1a2a3a4a5a",
          itemPictureUrl: "https://via.placeholder.com/150",
          itemDescription: "Utilitarian coffee grinder, nice and cheap!",
          itemRating: 5

        },
        {
          itemName: "Drip Coffee Pot",
          itemPrice: 24.99,
          itemId: "1a2a3a4a5a6a7a",
          itemPictureUrl: "https://via.placeholder.com/150",
          itemDescription: "Exquisite coffee pot.",
          itemRating: 2
        },
        {
          itemName: "Coffee Filters",
          itemPrice: 9.99,
          itemId: "1a2a3a4a5a6a7a8a",
          itemPictureUrl: "https://via.placeholder.com/150",
          itemDescription: "No tear filters.  Pack of 10.",
          itemRating: 2
        },
                {
          itemName: "Coffee Filters2",
          itemPrice: 9.99,
          itemId: "1a2a3a4a5a6a7a9aa",
          itemPictureUrl: "https://via.placeholder.com/150",
          itemDescription: "No tear filters.  Pack of 10.",
          itemRating: 2
        },
        {
          itemName: "Coffee Filters3",
          itemPrice: 9.99,
          itemId: "1a2a3a4a5a6a7a9aa55",
          itemPictureUrl: "https://via.placeholder.com/150",
          itemDescription: "No tear filters.  Pack of 10.",
          itemRating: 2
        },
                {
          itemName: "Coffee Filters3",
          itemPrice: 9.99,
          itemId: "1a2a3a4a5a6a7a9aa55",
          itemPictureUrl: "https://via.placeholder.com/150",
          itemDescription: "No tear filters.  Pack of 10.",
          itemRating: 2
        },
      ]
    }
  },
  computed: {
    adjustedStars(index) {
      return 5 - this.items[index].itemRating;
    }
  }
}
</script>
<style scoped>
.image-container {
  height: 300px;
  width:100%;
  object-fit: cover;

}
.image-container img {
  height: 300px;
  object-fit: cover;
}
.footerContainer{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.itemCard {
  min-width: 250px;
  max-width: 250px;
  margin-bottom: 20px !important;
}
</style>
