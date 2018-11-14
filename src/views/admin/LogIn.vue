<template>
  <v-container fluid my-5 fill-height>
    <v-layout justify-center align-center>
      <v-flex xs10 sm6>
        <v-card>
            <v-container>
              <v-card-title>
                <v-layout>
                  <h1>Admin Log-in</h1>
                </v-layout>
              </v-card-title>

              <form @submit.prevent="onLogIn">
                <v-card-text>
                  <v-layout column>
                    <v-text-field
                      name="email"
                      label="Email"
                      v-model="email"
                      type="email"
                      required
                      ></v-text-field>

                    <v-text-field
                      name="password"
                      label="Password"
                      v-model="password"
                      type="password"
                      required
                      ></v-text-field>
                  </v-layout>
                </v-card-text>

                <v-card-actions>
                  <v-layout justify-end>
                    <v-btn large color="accent" type="submit">Log in</v-btn>  
                  </v-layout>
                </v-card-actions>  
              </form>
            </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
