<template>
  <v-card flat> 
    <v-container fluid fill-height>
      <v-layout justify-center align-center wrap fill-height>
        
        <v-flex xs12 md3>
          <div class="text-xs-center">
            <v-btn color="#333" fab outline large>
              <v-icon class="primary--text" x-large>{{ service.icon }}</v-icon>
            </v-btn>
          </div>
        </v-flex>

        <v-flex xs12 md9>
          <v-card-title>
            <v-layout column>
              <h3 class="text-xs-center text-md-left title font-weight-bold">{{ service.title}}</h3>
              <p class="text-xs-center text-md-left">{{ service.description}}</p>
            </v-layout>
          </v-card-title>
        </v-flex>

      </v-layout>
    </v-container>

    <v-divider></v-divider>
  </v-card>
</template>

<script>
export default {
  props: ['service']
}
</script>

