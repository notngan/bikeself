<template>
  <div>
  <v-card hover tile flat>
    <v-img :height="'200px'" :src="bike.imageUrl"></v-img>
    <v-card-title>
      <v-layout fill-height justify-space-between>
        <v-flex xs8>
          <h3>{{ bike.title}}</h3>
          <p class="caption text-truncate">{{ bike.description}}</p>
        </v-flex>
        <v-flex class="text-xs-right" xs4>
          <h3 class="font-weight-bold primary--text">${{ bike.price }}</h3>
          <p class="caption">per day</p>
        </v-flex>
      </v-layout>
    </v-card-title>


    <v-card-actions>
      <v-layout px-2 wrap align-center justify-end>
        <v-flex px-1 mb-1 xs12 sm6>
          <v-btn :to="'/rentals/'+ bike.id" depressed small block>
            View details
          </v-btn>
        </v-flex>
        <v-flex px-1 xs12 sm6>
          <v-btn @click="book" small depressed color="amber" block>
            Book now
          </v-btn>
        </v-flex>
      </v-layout>
    </v-card-actions>
    
  <v-divider class="mt-2"></v-divider>
  </v-card>

  <!-- <v-dialog :max-width="'700px'" v-model="showCheckOut">
    <v-card>
    </v-card>
  </v-dialog> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: ['bike'],
  data () {
    return {
      bookClicked: false
    }
  },
  computed: {
    ...mapGetters(['isSignedIn'])
  },
  watch: {
    isSignedIn(val) {
      if (val !== null && val !== undefined && this.bookClicked == true) {
        this.$router.push('/booking/' + this.bike.id)
      }
    }
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

