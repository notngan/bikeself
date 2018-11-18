<template>
  <div v-if="tour" class="wrapper">
    <v-container>
      
      <!-- ARTICLE -->
      <v-layout justify-center>
        <v-flex xs12 sm8>
          <article>
            <h1 class="text-capitalize mb-3 display-2 font-weight-bold">{{ tour.title }}</h1>
            <em class="subheading grey--text">{{ tour.description }}</em>

            <v-divider class="my-2"></v-divider>
            
            <section v-for="(section, index) in tour.sections" :key="index">
              <h2 class="mb-2 mt-3">{{ section.h }}</h2>
              <p>{{ section.p }}</p>
              <v-img max-height="350" :src="section.image" v-if="section.image" :alt="section.h"></v-img>
            </section>

            <div class="my-3 text-xs-right font-weight-bold">{{ tour.author }}</div>
          </article>
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
      tourId: null
    }
  },

  computed: {
    ...mapGetters(['tourById']),
    tour () {
      return this.tourById(this.tourId)
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

