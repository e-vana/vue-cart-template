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