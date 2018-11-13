<template>
  <v-card>
    <v-container fluid>
      <v-card-title class="display-1">
        Sign In
      </v-card-title>
      <!-- <v-card-text class="errortext">
        {{ messages.message }}
      </v-card-text>                      -->
      <form @submit.prevent="onSignIn">
        <v-card-text>
          <v-layout column>
            <v-flex>
              <v-text-field
                name="email"
                label="Email"
                v-model="email"
                type="email"
                required></v-text-field>
            </v-flex>

            <v-flex>
              <v-text-field
                name="password"
                label="Password"
                v-model="password"
                type="password"
                required></v-text-field>
            </v-flex>

          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="openSignUp" flat>Create an Account</v-btn>
          <v-btn type="submit" class="primary black--text">Sign in</v-btn>
        </v-card-actions>
      </form>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex' 
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapGetters(['messages']),
  },
  methods: {
    ...mapActions(['signUserIn', 'displaySignUp', 'displaySignIn']),
    onSignIn () {
      this.signUserIn({
        email: this.email,
        password: this.password
      })
      this.displaySignIn(false)
    },
    openSignUp () {
      this.displaySignIn(false)
      this.displaySignUp(true)
    }
  }
}
</script>

