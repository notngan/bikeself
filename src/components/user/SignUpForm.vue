<template>
    <v-card>
      <v-container fluid>
        <v-card-title class="display-1">
          Create an account
          
        </v-card-title>
        <v-card-text class="error--text">
          {{ messages.message }}
        </v-card-text>
        <form @submit.prevent="onSignUp">
          
          <v-card-text>
            <v-layout column>
              <v-flex>
                <v-text-field
                  name="name"
                  label="Full name"
                  v-model="name"
                  type="text"
                  required></v-text-field>
              </v-flex>
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
              <v-flex>
                <v-text-field
                  name="confirmPassword"
                  label="Confirm Password"
                  v-model="confirmPassword"
                  type="password"
                  :rules="[comparePasswords]"></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="openSignIn" flat>Sign in</v-btn>
            <v-btn type="submit" class="primary black--text">Create an Account</v-btn>
          </v-card-actions>
        </form>
      </v-container>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    ...mapGetters(['messages']),
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
    },
  },
  methods: {
    ...mapActions(['signUserUp', 'displaySignUp', 'displaySignIn']),
    onSignUp () {
      if(this.password !== this.confirmPassword) {
        return
      } else {
        this.signUserUp({
          email: this.email, 
          password: this.password,
          name: this.name
        })
        this.displaySignUp(false)
      }
    },
    openSignIn () {
      this.displaySignUp(false)
      this.displaySignIn(true)
    }
  }
}
</script>

