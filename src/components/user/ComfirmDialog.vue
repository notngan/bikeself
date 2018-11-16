<template>
  <v-dialog
    v-model="showComfirm"
    max-width="280"
  >
    <v-card>
      <v-card-title class="subheading">Do you really want to {{ name }}?</v-card-title>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="close" flat>Cancel</v-btn>

        <v-btn
          color="error"
          flat
          @click="comfirm"
        >
          {{ name }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script> 
export default {
  props: ['name', 'showComfirm'],
  methods: {
    comfirm () {
      this.$emit('comfirm')
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
