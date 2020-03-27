<template>
  <div>
    <div class="card-container form-card">
      <div class="header" style="padding:10px 20px 10px 20px;">
        <h3>New Items</h3>

      </div>
      <div class="row" style="padding:10px 20px 10px 20px;">
        <div class="column" v-for="item in firstItems" :key="item.itemId">
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
                <b-icon class="icon-plus" icon="plus" font-scale="2"></b-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'newItems',
  data(){
    return{
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
          itemPictureUrl: require('@/assets/coffeegrinder.jpg'),
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
          itemId: "1a2a3a4a5a6a7a9aa5511",
          itemPictureUrl: "https://via.placeholder.com/150",
          itemDescription: "No tear filters.  Pack of 10.",
          itemRating: 2
        },
      ],
    }
  },
  computed: {
    adjustedStars(index) {
      return 5 - this.items[index].itemRating;
    },
    firstItems() {
      return this.items.slice(0, 4)
    },
    nextItems() {
      return this.items.slice(2, 4)
    },
  }
}
</script>

<style>

</style>

