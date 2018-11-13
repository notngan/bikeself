<template>
  <div class="tours">
    <v-container grid-list-lg>
      <v-layout mb-3>
        <h2 class="font-weight-bold display-1">Self-guided Tours</h2>
      </v-layout>
      <v-layout row wrap>
        <v-flex
          v-for="tour in allTours"
          v-bind="{ [`md${tour.flex}`]: true }"
          :key="tour.title"
        >
          <tour-item :tour="tour"/>
        </v-flex>
      </v-layout>
    </v-container>    
  </div>
</template>

<script>
import TourItem from '.././components/tour/TourItem.vue'
export default {
  components: { TourItem },
  computed: {
    allTours () {
      return this.$store.state.allTours
    }
  }
}
</script>
