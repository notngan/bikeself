<template>
<div>
  <v-card class="mb-3">
    <v-toolbar color="grey lighten-1" flat>
      <h3>
        {{ transaction.id }}
      </h3>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon>
        ${{ transaction.booking.cost }}
      </v-toolbar-side-icon>
    </v-toolbar>
    <v-list>
      <v-layout wrap justify-space-between>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>{{ transaction.booking.start.location }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ transaction.booking.start.date }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-icon>arrow_right</v-icon>

        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>{{ transaction.booking.end.location }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ transaction.booking.end.date }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider vertical></v-divider>
        <v-list-tile>
          <v-list-tile-action>
            <v-list-tile-title>{{ transaction.booking.quantity }} bike(s)</v-list-tile-title>
          </v-list-tile-action>
        </v-list-tile>
      </v-layout>
    </v-list>
  </v-card>
</div>
  
</template>

<script>
export default {
  props: ['transaction']
  
}
</script>
