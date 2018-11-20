<template>
  <div v-if="bike">
    <v-container fluid>
      <span>{{ index + 1 }}.</span>
      <v-card>
        <v-toolbar class="my-2 py-2" flat>
          
          <v-avatar>
            <img :src="bike.imageUrl">
          </v-avatar>
          
          <v-toolbar-title>
            {{ bike.title }}
          </v-toolbar-title>
          
          <v-divider class="ml-3 hidden-xs-only" vertical></v-divider>
          
          <v-toolbar-title class="hidden-xs-only caption">
             {{ booking.quantity }} bike(s), &nbsp;
             {{ booking.dayNumber }} day(s)
          </v-toolbar-title>
          <v-spacer></v-spacer> 
          <v-btn :to="'booking/edit/' + booking.id" icon small><v-icon small>edit</v-icon></v-btn>
          <v-btn @click="deleteBooking" icon small><v-icon small>delete</v-icon></v-btn>
        </v-toolbar>
        <v-card-title>
          <v-layout wrap>
            <v-flex xs12 md5>
              <v-layout wrap>
                <v-flex xs12 sm8>
                  <h3 class="font-weight-bold">{{ start.location}}</h3>
                  <p>{{ start.address}}</p>
                </v-flex>

                <v-flex xs12 sm3 offset-sm1>
                  <h3>{{ start.date}}</h3>
                  <p>{{ start.time}}</p>
                </v-flex>
              </v-layout>
            </v-flex> 
            <v-flex xs12 md1 offset-md1>
              <v-divider class="hidden-md-and-up mb-3"></v-divider>
              <v-icon class="hidden-sm-and-down">arrow_right</v-icon>
            </v-flex>
            <v-flex xs12 md5>
              <v-layout wrap>
                <v-flex xs12 sm8>
                  <h3 class="font-weight-bold">{{ end.location}}</h3>
                  <p>{{ end.address}}</p>
                </v-flex>

                <v-flex xs12 sm3 offset-sm1>
                  <h3>{{ end.date}}</h3>
                  <p>{{ end.time}}</p>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-title>
          <v-layout align-center wrap justify-end>
            <v-flex xs4 sm3 md2>
              <div class="caption hidden-sm-and-up">
                {{ booking.quantity }} bike(s) <br>
                {{ booking.dayNumber }} day(s)
              </div>
              <h4 class="font-weight-bold text-uppercase">Sub total: ${{ booking.quantity * booking.dayNumber * bike.price }}</h4>
            </v-flex>
            <v-flex xs7 offset-xs1 offset-sm0 sm4>
              <v-btn @click="checkout" color="amber" block>check out</v-btn>
            </v-flex>
          </v-layout>
        </v-card-title>
      </v-card>
    </v-container>
  </div>  
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: [ 'index', 'booking', 'start', 'end'],
  data () {
    return {
      bike: {},
      id: null
    }
  },

  computed: {
    ...mapGetters(['signedInUser', 'isSignedIn'])
  },

  created () {
    const thebike = this.$store.getters.bikeById(this.booking.bikeId)
    this.bike = Object.assign({}, thebike)
    this.id = this.booking.id
  },

  methods: {
    ...mapActions(['removeBooking', 'addMessage']),
    deleteBooking () {
      this.removeBooking({
        id: this.id,
        uid: this.signedInUser.id
      })
    },

    checkout () {
      if (!this.isSignedIn) {
        this.addMessage({
          message: 'Please sign in to continue!',
          class: 'error'
        })
      } else {
        const booking = this.booking
        localStorage.setItem('booking', JSON.stringify(booking))
        // const booking = this.booking
        // booking.dayNumber = this.dayNumber
        // const payload = {
        //   booking: booking,
        //   uid: this.signedInUser.id
        // }
        // this.savecheckout(payload)
        this.$router.push('/checkout')
      }
    }
    // editBooking () {
    //   this.$store
    // }
  }
}

// booking: 
//   {
//     bikeId: this.bikeId,
//     quantity: this.bikeNumber,
//     dayNumber: this.dayNumber,
//     start: start,
//     end: end
//   }

  // startDate: this.deDate,
  //   startTime: this.deTime,
  //   startLocation: this.deLocation,
  //   startAddress: this.deAddress
  // }
  // const end = {
  //   endDate: this.reDate,
  //   endTime: this.reTime,
  //   endLocation: this.reLocation,
  //   endAddress: this.reAddress
  // }

</script>

  
