<template>
   <v-card flat>
      <v-img
        :src="tour.image"
        height="200px"
      >
      </v-img>

      <v-container
        fill-height
        fluid
        pa-3
      >
        <v-layout fill-height align-center>
          <v-flex xs12 flexbox>
            <span class="title text-uppercase" v-text="tour.title"></span>
            <p class="body-1"> {{ tour.description }}</p>
          </v-flex>
          
          <v-flex>
            <v-card-actions>
              <v-btn large icon>
                <v-icon>info</v-icon>
              </v-btn>
              <v-btn large icon>
                <v-icon>bookmark</v-icon>
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>

      <v-divider></v-divider>
     
    </v-card>
</template>

<script>
export default {
  props: ['tour']
}
</script>

<style lang="scss">
</style>

