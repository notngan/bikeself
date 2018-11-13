<template>
  <div>
    <div class="loading" v-if="isLoading">
        <v-layout align-center fill-height justify-center>
          <v-progress-circular
            :size="100"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-layout>
    </div>
    <v-container v-if="transaction && bike">
      <v-layout wrap>
        <v-flex px-2 my-2 xs12>
          <h1>Thanks {{signedInUser.name}} for booking! </h1>
          <p class="font-weight-bold grey--text"> Your booking code is <span class="primary--text">{{ transaction.id}}</span></p>
        </v-flex>
        <!-- BOOKING -->
        <v-flex xs12 sm5 px-2 my-2>
          <v-card flat>
            <v-toolbar flat>
              <v-toolbar-title>Booking Details</v-toolbar-title>
            </v-toolbar>

            <!-- BIKE -->
            <v-list>
              <v-list-tile>
                <v-list-tile-avatar>
                  <img :src="bike.imageUrl">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title class="font-weight-bold">{{ bike.title }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ bike.description }}</v-list-tile-sub-title>
                </v-list-tile-content>
                
                <v-list-tile-action class="font-weight-bold">
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
                      <h3 class="font-weight-bold">{{ transaction.booking.start.location}}</h3>
                      <p>{{ transaction.booking.start.address}}</p>
                    </v-flex>

                    <v-flex>
                      <h3>{{ transaction.booking.start.date}}</h3>
                      <p>{{ transaction.booking.start.time}}</p>
                    </v-flex>
                  </v-layout>
                </v-flex> 
                
                <v-flex xs12>
                  <v-layout column>
                    <p class="caption grey--text">End:</p>
                    <v-flex>
                      <h3 class="font-weight-bold">{{ transaction.booking.end.location}}</h3>
                      <p>{{ transaction.booking.end.address}}</p>
                    </v-flex>

                    <v-flex>
                      <h3>{{ transaction.booking.end.date}}</h3>
                      <p>{{ transaction.booking.end.time}}</p>
                    </v-flex>
                  </v-layout>
                </v-flex>
                
              </v-layout>

            </v-container>

            
          </v-card>
        </v-flex>

        <!-- PERSONAL -->
        <v-flex xs12 sm7 px-2 my-2>
          <v-card flat>
            <v-toolbar flat>
              <v-toolbar-title>Personal Information</v-toolbar-title>
            </v-toolbar>
            
            <v-list>
              <!-- name -->
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Full name:</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action class="font-weight-bold">
                  <v-list-tile-title>{{ transaction.info.name}}</v-list-tile-title>
                </v-list-tile-action>
              </v-list-tile>
              
              <!-- email -->
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Email:</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action class="font-weight-bold">
                  <v-list-tile-title>{{ transaction.info.email}}</v-list-tile-title>
                </v-list-tile-action>
              </v-list-tile>

              <!-- phone -->
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Phone number:</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action class="font-weight-bold">
                  <v-list-tile-title>{{ transaction.info.phone}}</v-list-tile-title>
                </v-list-tile-action>
              </v-list-tile>

              <!-- nation -->
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Nationality:</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action class="font-weight-bold">
                  <v-list-tile-title>{{ transaction.info.nation}}</v-list-tile-title>
                </v-list-tile-action>
              </v-list-tile>

              <!-- nation -->
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Passport/ID number:</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action class="font-weight-bold">
                  <v-list-tile-title>{{ transaction.info.passport}}</v-list-tile-title>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-card>

          <!-- PRICE -->
          <v-card class="mt-3" flat>
            <v-toolbar flat>
              <v-toolbar-title>Payment Details</v-toolbar-title>
            </v-toolbar>
            <v-list>
              <!-- Quantity -->
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Quantity:</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action class="font-weight-bold">
                  <v-list-tile-title class="text-xs-right">{{ transaction.booking.quantity }}</v-list-tile-title>
                </v-list-tile-action>
              </v-list-tile>
              
              <!-- day number -->
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Number of day(s):</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action class="font-weight-bold">
                  <v-list-tile-title class="text-xs-right">{{ transaction.booking.dayNumber }}</v-list-tile-title>
                </v-list-tile-action>
              </v-list-tile>

              <!-- cost -->
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>Total cost:</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action class="font-weight-bold">
                  <v-list-tile-title class="text-xs-right">{{ transaction.booking.cost }}</v-list-tile-title>
                </v-list-tile-action>
              </v-list-tile>

            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
      
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      isLoading: true,
      id: null,
      //bikeId: null
    }
  },
  computed: {
    ...mapGetters(['transactionById', 'bikeById', 'isSignedIn', 'signedInUser']),

    transaction () {
      return this.transactionById(this.id)
    },
    bike () {
      if (this.bikeId) {
        return this.bikeById(this.bikeId)
      }
    },
    bikeId () {
      if (this.transaction) {
        return this.transaction.booking.bikeId
      }
    }
  },

  beforeCreate () {
    this.isLoading = true
  }, 
  created () {
    this.id = this.$route.params.id
  },

  watch: {
    // isLoading (val) {
    //   console.log(val)
    // },
    transaction (val) {
      if (val) {
        this.isLoading = false
      }
    }
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
.loading {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  background: #333;
  z-index: 100;
}
</style>

