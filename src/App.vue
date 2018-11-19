<template>
  <v-app>
    <app-header/>
    
    <v-toolbar flat></v-toolbar>

    <router-view/>
    
    <app-footer/>
    
    <app-message/>
  
  </v-app>
</template>

<style lang="scss">

</style>
<script>
import AppFooter from './components/Footer.vue'
import AppHeader from './components/Header.vue'
import AppMessage from './components/Message.vue'

import { mapGetters, mapActions } from 'vuex' 


export default {
  components: {
    AppFooter, 
    AppHeader,
    AppMessage
  },
  
  data () {
    return {
    }
  },

  computed: {
    ...mapGetters(['signedInUser', 'isSignedIn'])
  },

  watch: {
    isSignedIn (val) {
      if (val) {
        this.addMessage({
          class: 'success',
          message: 'You have signed in successfully!'
        })
      }
    }
  }, 

  methods: {
    ...mapActions([
      'addMessage',
      'loadArticleList',
      'loadUserList',
      'loadProductList', 
      'loadTransactionList', 
      'loadCountryList', 
      'loadBookingList',
    ])
  },

  created () {
    this.loadUserList()
    this.loadArticleList()
    this.loadProductList()
    this.loadCountryList()
    this.loadBookingList(this.signedInUser.id)
    this.loadTransactionList(this.signedInUser.id)
  }
}
</script>

<style lang="scss">
.logo-active, .btn-active{
  background: rgba(0,0,0,0);
}
.heading {
  color: rgba(0,0,0,0.5);
}
.wrapper {
  min-height: 100vh;
}
</style>
