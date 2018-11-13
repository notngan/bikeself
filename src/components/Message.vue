<template>
<v-bottom-sheet hide-overlay v-model="messages.show">
  <v-flex mx-4>
    <v-alert
      :value="messages.show"
      :color="messages.class"
      dismissible
      >
      {{ messages.message }}
    </v-alert> 
  </v-flex>
  </v-bottom-sheet>
</template>

<script>
export default {
  data () {
    return {
      //showAlert: true
    }
  },
  computed: {
    messages () {
      return this.$store.getters.messages
    },
  },

  watch: {
    // messages (val) {
    //   if (val.message !== '' && val.class !== '') {
    //     val.show = true
    //   }
    // } 
  }
}
</script>

<style lang="scss">
  .fixed {
    position: fixed;
  }
</style>


