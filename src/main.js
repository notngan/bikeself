import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/store'
// import * as firebase from 'firebase'
import { firebaseListener } from './firebaseConfig'

Vue.config.productionTip = false

firebaseListener(authStatusChange)

new Vue({
  router,
  store, 
  render: h => h(App)
}).$mount('#app')

function authStatusChange(signedIn, user) {
  if (store) {
    store.commit('AUTH_STATUS_CHANGE')
    if (user) {
      store.dispatch('loadBookingList', user.uid)
      store.dispatch('loadTransactionList', user.uid)
    //  console.log(user)
    }
  }
}