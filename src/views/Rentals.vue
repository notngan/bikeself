<template>
  <div class="wrapper">
    <v-container grid-list-lg>
      <h2 class="font-weight-bold display-1">Rental Bikes</h2>
      <v-layout mt-3 wrap>
        <v-flex
          v-for="bike in products"
          :key="bike.id"
          mb-1
          xs12 sm6 md4 lg3>
          <bike-item :bike="bike"/>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import BikeItem from '../components/bike/BikeItem.vue'
import { mapGetters } from 'vuex'

export default {
  components: { BikeItem },
  computed: {
    ...mapGetters(['products'])
  },
}
</script>

<style lang="scss" scoped>
  .wrapper {
    min-height: 100vh;
  }
</style>

