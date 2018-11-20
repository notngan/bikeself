<template>
  <div class="home">

    <v-content>
      <home-banner/>

      <!-- BIKES -->
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
              v-for="bike in products"
              :key="bike.id"
              mb-1
              xs12 sm6 md4 lg3>
              <bike-item :bike="bike" />
            </v-flex>
          </v-layout>
        </v-container>
      </section>

      <!-- SERVICES -->
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
      
      <!-- TOURS -->
      <section id="home-tours">
        <v-container grid-list-lg>
          <v-layout mb-3 align-center fill-height justify-space-between>
            <h2 class="font-weight-bold display-1">Self-guided Tours</h2>
            <v-btn flat small :to="'/rentals'"> View all
              <v-icon small>keyboard_arrow_right</v-icon>
            </v-btn>
          </v-layout>
          <v-layout wrap>
            <v-flex
              xs12 sm6
              v-for="tour in articles"
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
import { mapGetters } from 'vuex'
export default {
  components: { HomeBanner, BikeItem, ServiceItem, TourItem },
  data () { 
    return {
      services: [
        {
          icon: 'place',
          title: 'Delivery & pickup',
          description: 'Recieve and return the bike at your place.'
        },
        {
          icon: 'build',
          title: 'repair & maintain',
          description: 'Free repair and maintain along the whole trip.'
        },
        {
          icon: 'phone',
          title: '24/24 support',
          description: 'Hotline is always available.'
        },
        {
          icon: 'extension',
          title: 'Accessories',
          description: 'Raincoat, Helmet and Lock are provided for free.'
        },
        
      ]
    }
  },
  computed: {
    ...mapGetters(['products',  'articles'])
   
  }
}
</script>

