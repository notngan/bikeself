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
                  <p class="caption error--text">{{ error }}</p>
                    <v-layout column>
                      <v-flex>
                        <v-text-field
                          name="email"
                          id="email"
                          label="Email"
                          v-model="email"
                          type="email"
                          required
                          ></v-text-field>
                      </v-flex>

                      <v-flex>
                        <v-text-field
                          name="password"
                          id="password"
                          label="Password"
                          v-model="password"
                          type="password"
                          required
                          ></v-text-field>
                      </v-flex>
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
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  }, 
  computed: {
    admin () {
      return this.$store.getters.admin 
    },
    error () {
      return this.$store.getters.error
    },
    adminIsAuthenticated () {
      return this.$store.getters.adminIsAuthenticated 
    }
  },
  watch: {
    adminIsAuthenticated (val) {
      if (val) {
        this.$router.push('/admin')
      }
    }
   },
   methods: {
     onLogIn () {
       this.$store.dispatch('logAdminIn', {email: this.email, password: this.password})
     }
   }
 }
</script>
