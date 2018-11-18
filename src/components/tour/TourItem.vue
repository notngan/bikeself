<template>
   <v-card flat>
      <v-img
        :src="tour.image"
        height="200px"
      >
      </v-img>

      <v-layout align-center>
        <v-flex xs12>
          <v-card-title primary-title>
            <div>
                <h2 class="headline font-weight-bold text-capitalize mt-0">
                  <router-link :to="'tours/' + tour.id">{{ tour.title }}</router-link>
                </h2>
              <div>{{ tour.description }}</div>
            </div>
          </v-card-title> 
        </v-flex>
      </v-layout>

      <v-divider></v-divider>
     
    </v-card>
</template>

<script>
export default {
  props: ['tour']
}
</script>

<style lang="scss">
  a {
    text-decoration: none;
  }
</style>

