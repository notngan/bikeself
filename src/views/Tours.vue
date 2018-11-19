<template>
  <div class="wrapper">
    <v-parallax height="350" src="http://www.thelostpassport.com/wp-content/uploads/2017/05/Ultimate-Vietnam-Motorbike-Itinerary.jpg" alt="Motorbike Rental Vietnam">
      <v-layout
      align-center
      column
      justify-center>
        <h1 class="bigtext">Self-guided Tours</h1>
      </v-layout>
    </v-parallax>
    <v-divider class="mt-4"></v-divider>
    <v-container>
      <v-layout row wrap>
        <v-flex
          xs12 sm6
          v-for="tour in articles"
          :key="tour.id">
          <tour-item :tour="tour"/>
        </v-flex>
      </v-layout>
    </v-container>    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TourItem from '../components/tour/TourItem'
export default {
  components: { TourItem },
  computed: {
    ...mapGetters(['articles'])
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
}
.bigtext {
  font-size: 10vw;
}
</style>

