<template>
  <div v-if="services" class="wrapper">
     <v-parallax height="350" src="https://stingynomads.com/wp-content/uploads/2016/11/cr2.jpg" alt="Motorbike Rental Vietnam">
      <v-layout
      align-center
      column
      justify-center>
        <h1 class="bigtext">Free Services</h1>
      </v-layout>
    </v-parallax>
    <v-divider class="mt-4"></v-divider>
    <v-container>
      <v-layout wrap justify-center>
        <v-flex
          pa-2
          xs12 sm6
          v-for="(service, index) in services"
          :key="index"
          >
          <service-item :service="service"/>  
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
//import { mapGetters } from 'vuex'
import ServiceItem from '../components/service/ServiceItem.vue'
export default {
  components: { ServiceItem },
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
  
} 
</script>

<style lang="scss" scoped>
.bigtext {
  font-size: 10vw;
}
</style>


