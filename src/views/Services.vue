<template>
  <div v-if="services" class="wrapper">
    <v-container>
      <h2 class="font-weight-bold text-capitalize display-1">Free Services</h2>
      <v-layout wrap justify-center mt-3>
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

