<template>
  <div v-if="tour" class="wrapper">
    <v-container>
      
      <!-- ARTICLE -->
      <v-layout justify-center>
        <v-flex xs12 sm8>
          <article>
            <h1 class="text-capitalize mb-3 display-2 font-weight-bold">{{ tour.title }}</h1>

            <div class="my-3 text-xs-right grey--text caption">{{ tour.author }},&nbsp;{{ tour.date }}</div>

            <em class="subheading grey--text">{{ tour.description }}</em>

            <v-divider class="my-2"></v-divider>
            
            <section v-for="(section, index) in tour.sections" :key="index">
              <h2 class="mb-2 mt-3">{{ section.h }}</h2>
              <p>{{ section.p }}</p>
              <v-img max-height="350" :src="section.image" v-if="section.image" :alt="section.h"></v-img>
            </section>

          </article>
        </v-flex>
      </v-layout>
      <v-divider class="my-3"></v-divider>
      <!-- BIKE -->
      <v-layout align-center fill-height justify-space-between>
        <h2 class="font-weight-bold display-1">Popular Bikes</h2>
        <v-btn flat small :to="'/rentals'"> View all
          <v-icon small>keyboard_arrow_right</v-icon>
        </v-btn>
      </v-layout>
      <v-layout wrap>
        <v-flex
          pa-2
          v-for="bike in relatedBikes"
          :key="bike.id"
          mb-1
          xs12 sm6 md4 lg3>
          <bike-item :bike="bike"/>
      </v-flex>
      </v-layout>

    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BikeItem from '../bike/BikeItem.vue'
export default {
  components: { BikeItem },
  data () {
    return {
      tourId: null
    }
  },

  computed: {
    ...mapGetters(['tourById', 'products']),
    tour () {
      return this.tourById(this.tourId)
    },
    relatedBikes () {
      return this.products.slice(0, 3)
    }
  },
  mounted () {
    this.tourId = this.$route.params.id
  } 
}
</script>

<style lang="scss" scoped>
  .wrapper {
    min-height: 100vh;
  }
</style>

