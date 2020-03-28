<template>
  <div>
    <ItemCard/>
  </div>
</template>

<script>

import ItemCard from '@/components/ItemCard.vue'
import {http} from '../util/axiosHttp.js'

export default {
  name: 'ItemPage',
  components: {
    ItemCard
  }
}
</script>

<style>

</style>