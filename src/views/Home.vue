<template>
  <div class="home">

    <v-content>

      <home-banner/>

      <section id="home-popular">
        <v-container grid-list-lg>
          <v-layout align-center fill-height justify-space-between>
            <h2 class="font-weight-bold display-1">Popular Bikes</h2>
            <v-btn flat small :to="'/rentals'"> View all
              <v-icon small>keyboard_arrow_right</v-icon>
            </v-btn>
          </v-layout>
          <v-layout mt-3 wrap>
            <v-flex 
              v-for="bike in popularBikes"
              :key="bike.id"
              mb-1
              xs12 sm6 md4 lg3>
              <bike-item :bike="bike" />
            </v-flex>
          </v-layout>
        </v-container>
      </section>

      <section id="home-services">
        <v-container grid-list-lg>
          <v-layout>
            <h2 class="font-weight-bold display-1">Free Services</h2>
          </v-layout>
          <v-layout fill-height wrap justify-center mt-3>
            <v-flex
              mb-2
              xs12 sm6
              v-for="(service, index) in services"
              :key="index"
            >
              <service-item :service="service"/>  
            </v-flex>
          </v-layout>
        </v-container>
      </section>
      
      <section id="home-tours">
        <v-container grid-list-lg>
          <v-layout mb-3 align-center fill-height justify-space-between>
            <h2 class="font-weight-bold display-1">Self-guided Tours</h2>
            <v-btn flat small :to="'/rentals'"> View all
              <v-icon small>keyboard_arrow_right</v-icon>
            </v-btn>
          </v-layout>
          <v-layout row wrap>
            <v-flex
              v-for="tour in slicedTours"
              v-bind="{ [`md${tour.flex}`]: true }"
              :key="tour.title"
            >
              <tour-item :tour="tour"/>
            </v-flex>
          </v-layout>
        </v-container>
      </section>
    </v-content>

  </div>
</template>
<script>
import BikeItem from '.././components/bike/BikeItem.vue'
import ServiceItem from '../components/service/ServiceItem.vue'
import TourItem from '.././components/tour/TourItem.vue'
import HomeBanner from '.././components/HomeBanner.vue'

export default {
  components: { HomeBanner, BikeItem, ServiceItem, TourItem },
  computed: {
    popularBikes () {
      return this.$store.getters.products
    },
    services () {
      return this.$store.state.allServices
    },
    slicedTours () {
      return this.$store.getters.slicedTours
    }
  }
}
</script>

