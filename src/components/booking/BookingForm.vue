<template>
  <div v-if="bike">
    <v-card flat>
      <v-container fluid>
        <v-toolbar flat>
          <v-toolbar-title>Booking Details</v-toolbar-title>
        </v-toolbar>

        <!-- BIKE DETAILS -->
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

        <!-- FORM -->
        <v-form ref="form" lazy-validation v-model="valid">
          <v-layout wrap>

            <!-- DEPARTURE -->
            <v-flex xs12 md6 px-2>
              <h3 class="my-3">Departure</h3>
              <v-layout wrap>

                <!-- START DATE -->
                <v-flex xs12 sm8 px-1>
                  <v-menu
                  :close-on-content-click="false"
                  v-model="deDateMenu"
                  lazy
                  offset-y
                  full-width 
                  min-width="290px">
                    <v-text-field
                      :rules="[v => !!v || 'Please choose start date!']"
                      readonly
                      required
                      outline
                      slot="activator"
                      v-model="booking.start.date"
                      label="Start Date"
                      hint="YYYY-MM-DD"
                      persistent-hint
                    ></v-text-field>
                    <v-date-picker
                      :date-format="date => new Date(date).toDateString()"
                      header-color="grey" 
                      v-model="booking.start.date" 
                      @input="deDateMenu = false"
                      :min="today"></v-date-picker>
                  </v-menu>
                </v-flex>
                
                <!-- START TIME -->
                <v-flex xs12 sm4 px-1>
                  <v-menu
                    :close-on-content-click="false"
                    v-model="deTimeMenu"
                    lazy
                    offset-y
                    full-width
                    max-width="290px">
                    <v-text-field
                      :rules="[v => !!v || 'Please choose start time!']"
                      readonly
                      outline
                      slot="activator"
                      v-model="booking.start.time"
                      label="Time"></v-text-field>
                    <v-time-picker
                      header-color="grey" 
                      v-model="booking.start.time"
                      :allowed-hours="allowedHours"
                      :allowed-minutes="allowedMin">
                      <v-layout>
                        <v-spacer></v-spacer>
                        <v-btn @click="deTimeMenu = false" flat>OK</v-btn>
                      </v-layout>
                    </v-time-picker>
                  </v-menu>
                </v-flex>
              </v-layout>

              <!-- START LOCATION -->
              <v-select 
                :rules="[v => !!v || 'Please choose departure city!']"
                outline
                :items="locations" 
                item-text="text"
                item-value="value"
                v-model="booking.start.location"
                label="Departure City"
                required>
              </v-select>
              
              <!-- START ADDRESS -->
              <v-text-field 
                required
                :rules="[v => !!v || 'Please enter delivery address!']"
                outline
                v-model="booking.start.address"
                label="Delivery Address">
              </v-text-field>
            </v-flex>
            
            <!-- RETURNING -->
            <v-flex xs12 md6 px-2>
              <h3 class="my-3">Returning</h3>
              <v-layout wrap>

                <!-- END DATE -->
                <v-flex xs12 sm8 px-1>
                  <v-menu
                  :close-on-content-click="false"
                  v-model="reDateMenu"
                  lazy
                  offset-y
                  full-width
                  max-width="290px">

                    <v-text-field
                      :rules="[v => !!v || 'Please choose end date!']"
                      required
                      readonly
                      outline
                      slot="activator"
                      v-model="booking.end.date"
                      label="End Date"
                      hint="YYYY-MM-DD"></v-text-field>
                      
                    <v-date-picker
                      :date-format="date => new Date(date).toDateString()"
                      header-color="grey" 
                      v-model="booking.end.date" 
                      @input="reDateMenu = false"
                      :min="tomorrow"></v-date-picker>
                  </v-menu>
                </v-flex>

                 <!--END TIME-->
                <v-flex xs12 sm4 px-1>
                  <v-menu
                    :close-on-content-click="false"
                    v-model="reTimeMenu"
                    lazy
                    offset-y
                    full-width
                    max-width="290px"
                    >
                    <v-text-field
                      readonly
                      outline
                      slot="activator"
                      v-model="booking.end.time"
                      label="Time"
                      persistent-hint
                      ></v-text-field>
                    <v-time-picker 
                      header-color="grey" 
                      v-model="booking.end.time"
                      :allowed-hours="allowedHours"
                      :allowed-minutes="allowedMin">
                      <v-layout>
                        <v-spacer></v-spacer>
                        <v-btn @click="reTimeMenu = false" flat>OK</v-btn>
                      </v-layout>
                    </v-time-picker>
                  </v-menu>
                </v-flex>

              </v-layout>

              <!-- END LOCATION -->
              <v-select 
                outline
                :items="locations" 
                item-text="text"
                item-value="value"
                v-model="booking.end.location"
                :rules="[v => !!v || 'Please choose arrival city!']"
                required
                label="Arrival City">
              </v-select>
              
              <!-- END ADDRESS -->
              <v-text-field
                outline
                v-model="booking.end.address"
                :rules="[v => !!v || 'Please enter returning address!']"
                required
                label="Returning Address">
              </v-text-field>

              <!-- QUANTITY -->
              <v-flex offset-xs6 offset-sm8>
                <v-select
                  label="Bike quantity"
                  v-model="booking.quantity"
                  outline
                  :items="[1,2,3,4,5]"></v-select>
              </v-flex>
             
            </v-flex>

          </v-layout>
        </v-form>
        
        <v-divider></v-divider>

        <!-- COST -->
        <v-flex offset-sm6 offset-md8>
          <v-list>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Number of Bike(s)</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>{{ booking.quantity }}</v-list-tile-action>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Number of Day(s)</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>{{ dayNumber }}</v-list-tile-action>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title class="font-weight-bold">Sub Total</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action class="font-weight-bold">${{ bike.price * dayNumber * booking.quantity }}</v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-flex>
        
        <!-- BUTTON -->
        <v-card-actions>
          <v-layout wrap justify-space-between>
            <v-flex py-1 xs12 sm4>
              <v-btn :disabled="btnDisabled" block @click="saveBooking"><v-icon small left>bookmark</v-icon>save and continue</v-btn>  
            </v-flex>
            <v-flex py-1 xs12 sm4>
              <v-btn :disabled="btnDisabled" block color="amber" @click="checkOut">check out<v-icon right>arrow_right</v-icon></v-btn>  
            </v-flex>
          </v-layout>
        </v-card-actions>    
      </v-container>
    </v-card>
  </div>
</template>
<script>
import { mapGetters} from 'vuex'

export default {
  props: ['booking', 'dayNumber', 'today', 'tomorrow', 'btnDisabled', 'locations'],
  data () {
    return {
      bikeId: null,
      deDateMenu: false,
      deTimeMenu: false,
      reDateMenu: false,
      reTimeMenu: false,
      valid: true
      
      // startLocation: {
      //   text: '', 
      //   value: ''
      // },
      // endLocation: {
      //   text: '', 
      //   value: ''
      // }
    }
  },

  computed: {
    ...mapGetters(['bikeById', 'signedInUser']),
    bike () {
      return this.bikeById(this.bikeId)
    },
    
   
  },

  mounted () {
    this.bikeId = this.booking.bikeId
  },

  watch: {
    
  },

  methods: {

    allowedMin: m => m % 5 === 0,
    allowedHours: v => v >= 6 && v <= 20,

    saveBooking () {
      if (this.$refs.form.validate()) {
        this.$emit('save', this.booking)
      } else {
        return
      }
    },
    checkOut () {
      if (this.$refs.form.validate()) {
         this.$emit('checkout', this.booking)
      } else {
        return
      }
    },
    countDay () {
      this.$emit('count-day', this.dayNumber)
    }
  }

}
</script>
