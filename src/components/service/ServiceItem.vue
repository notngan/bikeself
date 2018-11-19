<template>
<div>
  <v-card hover tile height="200" flat> 
      <v-layout px-4 fill-height align-center wrap>
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
              <h2 class="text-xs-center text-md-left text-capitalize title font-weight-bold">{{ service.title}}</h2>
              <div class="mt-2 text-xs-center text-md-left"> {{ service.description }}</div>
            </v-layout>
          </v-card-title>
        </v-flex>

      </v-layout>
  </v-card>
  <v-divider></v-divider>
</div>
</template>

<script>
export default {
  props: ['service']
}
</script>

