<template>
  <div>
    <Hero/>
    <FeaturedItems/>
    <NewItems/>
  </div>
</template>

 
<script>
import FeaturedItems from '../components/itemContainers/featuredItems'
import NewItems from '../components/itemContainers/newItems'
import Hero from '../components/hero'

export default {
  name: 'home',
  components: {
    FeaturedItems,
    NewItems,
    Hero
  }
}
</script>
<style>

</style>
