<template>
  <div>
    <Hero/>
    <FeaturedItems/>
    <NewItems/>
  </div>
</template>

 
<script>
import FeaturedItems from '../components/itemContainers/FeaturedItems'
import NewItems from '../components/itemContainers/NewItems'
import Hero from '../components/Hero'

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
