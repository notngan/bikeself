<template>
  <div class="wrapper">
    <v-container fill-height v-if="!booking && isSignedIn">
      <v-layout>
        <h1>You've not booked any bike, please go to <router-link :to="'rentals'">Rentals</router-link> to book one!</h1>
      </v-layout>
    </v-container>
    <v-container v-if="booking && isSignedIn" fluid>
      <v-layout wrap>
        
        <!-- BOOKING -->
        <v-flex xs12 md5 px-2 my-2>
          <v-card flat>
            
            <v-toolbar flat>
              <v-toolbar-title>Booking Details</v-toolbar-title>
            </v-toolbar>
            
            <v-list>
              <v-list-tile>
                <v-list-tile-avatar>
                  <img :src="bike.imageUrl">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title class="font-weight-bold">{{ bike.title }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ bike.description }}</v-list-tile-sub-title>
                </v-list-tile-content>
                
                <v-list-tile-action>
                  <span class="font-weight-bold">
                    ${{ bike.price }}
                  </span>
                  <v-list-tile-action-text>1 day</v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>

            <v-divider></v-divider>
            
            <!-- DATE -->
            <v-container fluid>
              <v-layout justify-space-between wrap>
                <v-flex xs12>
                  <v-layout column>
                    <p class="caption grey--text">Start:</p>
                    <v-flex>
                      <h3 class="font-weight-bold">{{ booking.start.location}}</h3>
                      <p>{{ booking.start.address}}</p>
                    </v-flex>

                    <v-flex>
                      <h3>{{ booking.start.date}}</h3>
                      <p>{{ booking.start.time}}</p>
                    </v-flex>
                  </v-layout>
                </v-flex> 
                
                <v-flex xs12>
                  <v-layout column>
                    <p class="caption grey--text">End:</p>
                    <v-flex>
                      <h3 class="font-weight-bold">{{ booking.end.location}}</h3>
                      <p>{{ booking.end.address}}</p>
                    </v-flex>

                    <v-flex>
                      <h3>{{ booking.end.date}}</h3>
                      <p>{{ booking.end.time}}</p>
                    </v-flex>
                  </v-layout>
                </v-flex>
                
              </v-layout>

            </v-container>

            <!-- PRICE -->
            <v-divider></v-divider>

            <v-container fluid>
              <v-layout wrap>
                <v-flex>
                  <p>Quantity:</p>
                  <p>Number of day(s):</p>
                  <h3>Total:</h3>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex class="text-xs-right">
                  <p>{{ booking.quantity }}</p>
                  <p>{{ booking.dayNumber }}</p>
                  <h3>${{ booking.quantity * booking.dayNumber * bike.price }}</h3>
                </v-flex>
              </v-layout>
            </v-container>
          
          </v-card>
        </v-flex>
        
        <v-flex xs12 md7 px-2 my-2>
          
          <!-- PERSONAL -->
          <v-form ref="form" lazy-validation v-model="valid">
            <v-card flat>
              <v-toolbar flat>
                <v-toolbar-title>Personal Information</v-toolbar-title>
              </v-toolbar>

                <v-container>
                  <v-layout wrap>
                    <v-flex px-1 xs12>
                      <v-text-field
                        :rules="[v => !!v || 'Name is required']"
                        v-model="name"
                        required
                        outline
                        label="Full name"></v-text-field>
                    </v-flex>
                    
                    <v-flex px-1 xs12 sm6>
                      <v-text-field
                        :rules="emailRules"
                        v-model="email"
                        required
                        outline
                        label="Email"></v-text-field>
                    </v-flex>
                    
                    <v-flex px-1 xs12 sm6>
                      <v-text-field
                        :rules="[v => !!v || 'Phone number is required']"
                        mask="phone"
                        v-model="phone"
                        required
                        outline
                        label="Phone number"></v-text-field>
                    </v-flex>
                    
                    <v-flex px-1 xs12 sm6>
                      <v-autocomplete
                        :rules="[v => !!v || 'Nationality is required']"
                        outline
                        v-model="nation"
                        :items="countries"
                        item-text="name"
                        item-value="name"
                        label="Nationality"></v-autocomplete>
                    </v-flex>

                    <v-flex px-1 xs12 sm6>
                      <v-text-field
                        :rules="[v => !!v || 'ID/Passport number is required']"
                        required
                        outline
                        v-model="passport"
                        label="ID/Passport number"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
            

            </v-card>

            <!-- PAYMENT -->
            <v-card class="my-3" flat>
              <v-toolbar flat>
                <v-toolbar-title>Payment Method</v-toolbar-title>
              </v-toolbar>

              <v-container>
                <v-radio-group :rules="[v => !!v || 'Choose a payment method to continue']" v-model="payment">
                  <v-radio
                    v-for="item in payments"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value"
                  ></v-radio>
                </v-radio-group>

                  <v-form v-if="showCard">
                    <v-layout wrap>
                      <v-flex px-2 xs12 md6>
                        <v-text-field
                          mask="credit-card"
                          outline
                          v-model="card.number"
                          label="Card Number"></v-text-field>
                      </v-flex>
                      
                      <v-flex px-2 xs12 md6>
                        <v-text-field
                          outline
                          v-model="card.name"
                          label="Name on Card"></v-text-field>
                      </v-flex>

                      <v-flex px-2 xs6>
                        <v-text-field
                          outline
                          v-model="card.date"
                          label="MM/YY"></v-text-field>
                      </v-flex>

                      <v-flex px-2 xs6>
                        <v-text-field
                          outline
                          v-model="card.cvv"
                          label="CVV"></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-form>
              </v-container>
            </v-card>

            <!-- BUTTON -->
            <v-flex offset-sm6>
              <v-btn @click="checkout" block color="amber">complete booking <v-icon>arrow_right</v-icon></v-btn>
            </v-flex>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </div> 
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      bike: {},
      name: '',
      email: '',
      phone: null,
      nation: null,
      passport: null,
      payment: null,
      payments: [
        { text: 'Cash on Delivery', value: 1 },
        { text: 'Debit/ Credit Card', value: 2}
      ],
      card: {
        number: null,
        name: null,
        date: null,
        cvv: null
      },
      showCard: false,

      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      valid: true
    }
  },
  
  computed: {
    ...mapGetters(['signedInUser', 'countries', 'isSignedIn']),
    booking () {
      return JSON.parse(localStorage.getItem('booking'))
    }
  },

  watch: {
    payment (val) {
      if (val === 2) {
        this.showCard = true
      } else {
        this.showCard = false
      }
    },
    isSignedIn (val) {
      if (!val) {
        this.addMessage({
          class: 'error',
          message: 'Please sign in to continue!'
        })
        this.displaySignIn(true)
      }
    },
  },

  created () {
    //console.log(JSON.parse(localStorage.getItem('booking')))
    const thebike = this.$store.getters.bikeById(this.booking.bikeId)
    this.bike = Object.assign({}, thebike)

    this.name = this.signedInUser.name,
    this.email = this.signedInUser.email
  },

  methods: {
    ...mapActions(['saveToTransactions', 'removeBooking', 'addMessage', 'displaySignIn']),
    checkout () {
      if (this.$refs.form.validate()) {
        const booking = this.booking
        booking.cost = this.booking.quantity * this.booking.dayNumber * this.bike.price
        const info = {
          name: this.name, 
          email: this.email, 
          phone: this.phone, 
          nation: this.nation, 
          passport: this.passport
        }
        const transaction = {
          booking: booking,
          info: info,
          payment: this.payment,
          uid: this.signedInUser.id
        }

        this.saveToTransactions(transaction).then(() => {
          if (booking.id) {
            this.removeBooking({
              id: booking.id,
              uid: this.signedInUser.id
            })
            localStorage.removeItem('booking')
          }
        })
        //localStorage.removeItem('booking')
        //localStorage.setItem('transaction', JSON.stringify(transaction))
        
      } else {
        return 
      }
    }
  }
}
</script>

<style lang="scss">
  .wrapper {
    min-height: 100vh;
  }
</style>

