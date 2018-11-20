<template>
  <div v-if="bike" class="wrapper">
    <v-container>
      <v-layout wrap justify-space-between>
        <v-flex xs12 sm6>
          <v-img :src="bike.imageUrl"></v-img>
        </v-flex> 
        <v-flex xs12 offset-sm1 sm5>
          <h1>{{ bike.title}}</h1>
          <em>{{ bike.description }}</em>

          <h3 class="mt-3">Additional Benefits</h3>
          <ul>
            <li>1 Raincoat</li>
            <li>2 Helmets</li>
            <li>1 Bike Lock</li>
          </ul>

          <h3 class="mt-3">Free Services</h3>
          <ul>
            <li>Repairs and Maintainance</li>
            <li>Door-to-door Delivery and Pickup</li>
            <li>24/24 Support</li>
          </ul>
          <v-divider class="my-3"></v-divider>
          <v-layout>
            <v-flex xs2>
              <h3 class="font-weight-bold primary--text">${{ bike.price }}</h3>
              <p class="caption">per day</p>
            </v-flex>
            <v-flex offset-xs1>
              <v-btn @click="book" color="amber" block>
                Book now
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-layout my-3 align-center fill-height justify-space-between>
        <h2 class="font-weight-bold">See Other Bikes</h2>
        <v-btn exact flat small :to="'/rentals'"> View all
          <v-icon small>keyboard_arrow_right</v-icon>
        </v-btn>
      </v-layout>
      <v-layout wrap>
        <v-flex
          v-for="bike in products"
          :key="bike.id"
          mb-2 pa-2
          xs12 sm6 md4>
          <bike-item :bike="bike"/>  
        </v-flex>
      </v-layout> 
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BikeItem from './BikeItem'
export default {
  components: { BikeItem },
  data () {
    return {
      bikeId: null
    }
  },

  computed: {
    ...mapGetters(['isSignedIn', 'products']),
    bike () {
      return this.$store.getters.bikeById(this.bikeId)
    },
  },

  mounted () {
    this.bikeId = this.$route.params.id
  },
  
  methods: {
    ...mapActions(['displaySignIn']),
    book () {
      this.bookClicked = true
      if(this.isSignedIn) {
        this.$router.push('/booking/' + this.bike.id)
      } else {
        this.displaySignIn(true)
      }
    }
  }
}
</script>
