<template>
  <div>
    <b-card :img-src="itemPictureUrl" :title="itemName" img-top>
      <b-card-text>
        <p>{{ itemDescription }}</p>
        <h5>${{ itemPrice }}</h5>
      </b-card-text>
    </b-card>

  </div>
</template>

<script>
export default {
  name: "ItemCard",
  data(){
    return{
      item: [
        {
          itemName: "Tea Kettle",
          itemPrice: 19.99,
          itemId: "1a2a3a4a",
          // itemPictureUrl: "../assets/kettle.jpg",
          itemPictureUrl: require('@/assets/kettle.jpg'),
          itemDescription: "This is a small black tea kettle.",
          itemRating: 4
        },
      ]
    }
  },
  props: {
    itemName: String,
    itemPrice: Number,
    itemId: String,
    itemPictureUrl: String,
    itemDescription: String
  }

}
</script>

<style>

</style>