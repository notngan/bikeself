<template>
  <div class="tours">
    <v-container grid-list-lg>
      <v-layout mb-3>
        <h2 class="font-weight-bold display-1">Self-guided Tours</h2>
      </v-layout>
      <v-layout row wrap>
        <v-flex
          xs12 md6
          v-for="tour in articles"
          :key="tour.id">
          <tour-item :tour="tour"/>
        </v-flex>
      </v-layout>
    </v-container>    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TourItem from '../components/tour/TourItem'
export default {
  components: { TourItem },
  computed: {
    ...mapGetters(['articles'])
  }
}
</script>
