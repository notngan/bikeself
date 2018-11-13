<template>
  <div class="wrapper" v-if="isSignedIn">
    <v-container fill-height v-if="bookings.length < 1">
      <v-layout>
        <h1>You've not booked any bike, please go to <router-link :to="'rentals'">Rentals</router-link> to book one!</h1>
      </v-layout>
    </v-container>
    <booking-item 
      v-for="(booking, index) in bookings" 
      :key="index"
      :index="index"
      :booking="booking"
      :start="booking.start"
      :end="booking.end"/>
  </div>
</template>

<script>
import BookingItem from '../../components/booking/BookingItem'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: { BookingItem },
  data () {
    return {
      //hasBookings: true
    }
  },
  computed: { 
    ...mapGetters(['isSignedIn', 'signedInUser', 'bookings']),
  },
  watch: {
    isSignedIn (val) {
      if (!val) {
        this.addMessage({
          class: 'warning',
          message: 'Please sign in to continue!'
        })
        this.displaySignIn(true)
      }
    },

   
  },
  created () {
    
  },

  methods: {
    ...mapActions(['displaySignIn', 'addMessage', 'loadBookingList'])
  }
}
</script>

<style lang="scss">
  .wrapper {
    min-height: 100vh;
  }
</style>

 