<template>
  <v-layout class="wrapper" justify-center align-center>
    <v-flex xs10 sm4>
      <v-card>
        <v-container>
          <v-card-title>
            <v-layout>
              <h1>Admin Log-in</h1>
            </v-layout>
          </v-card-title>

          <form @submit.prevent="onLogIn">
            <v-text-field
              name="email"
              outline
              label="Email"
              v-model="email"
              type="email"
              required
              ></v-text-field>

            <v-text-field
              name="password"
              outline
              label="Password"
              v-model="password"
              type="password"
              required
              ></v-text-field>

            <v-layout justify-end>
              <v-btn large color="accent" type="submit">Log in</v-btn>  
            </v-layout>
          </form>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      email: null,
      password: null,
      user: {}

    }
  }, 
  computed: {
    ...mapGetters(['currentUser', 'isSignedIn', 'userByEmail']),

    // user () {
    //   return this.userByEmail(this.email)
    // }
    // user () {
    //   return this.userById(this.id)
    // }
  },
  watch: {
    currentUser (val) {
      if (val) {
        if (val.isAdmin == true && this.isSignedIn) {
          this.$store.commit('SET_ADMIN', true)
          this.$router.push('/admin')
        } else {
          this.addMessage({
            class: 'error',
            message: 'Please sign in with admin account!'
          })
        }
      }
    }
  },

  mounted () {
  
  },

  methods: {
    ...mapActions(['signUserOut','addMessage','logAdminIn']),
    onLogIn () {
      this.user = this.userByEmail(this.email)
      if (this.user.isAdmin == false) {
        this.addMessage({
          class: 'error',
          message: 'Please sign in with admin account!'
        })
        return 
      } else {
        this.logAdminIn({
          email: this.email, 
          password: this.password,
        })
      }
    },
    
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
}
</style>

