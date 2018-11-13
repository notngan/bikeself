<template>
  <div v-if="bike">
    <h1>Bike Detailss</h1>
    <h2>{{ bike.title }}</h2>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bikeId: null
    }
  },

  computed: {
    bike () {
      return this.$store.getters.bikeById(this.bikeId)
    }
  },
  mounted () {
    this.bikeId = this.$route.params.id
  }
}
</script>
