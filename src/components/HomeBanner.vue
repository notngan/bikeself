<template>
  <section id="home-banner">
        <form class="home-banner">
          <v-container fill-height>
            <v-layout justify-center column>
              <v-layout align-end>
                <v-flex xs12 sm4 lg3 pr-2>
                  <v-select
                    width="'80%'"
                    solo
                    dark
                    :background-color="'rgba(0,0,0,0.8)'"
                    :items="locations"
                    placeholder="Departure locations"
                  ></v-select>

                  <v-menu
                    ref="menu"
                    v-model="menu"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                  >
                    <v-text-field
                    dark
                    :background-color="'rgba(0,0,0,0.8)'"
                    solo
                    placeholder="Departure date"
                    slot="activator"
                    v-model="dateFormatted"
                    persistent-hint
                    @blur="date = parseDate(dateFormatted)"
                    ></v-text-field>
                    <v-date-picker 
                      :width="'320'" 
                      v-model="date" 
                      no-title 
                      @input="menu = false"
                      ></v-date-picker>
                  </v-menu>
                   
                </v-flex>
            
                <v-flex xs12 sm4 lg3 pl-2>

                  <v-select
                    solo
                    dark
                    :background-color="'rgba(0,0,0,0.8)'"
                    :items="locations"
                    placeholder="Returning locations"
                  ></v-select>

                  <v-menu
                    ref="menu2"
                    v-model="menu2"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                  >
                    <v-text-field
                      dark
                      :background-color="'rgba(0,0,0,0.8)'"
                      solo
                      placeholder="Returning date"
                      slot="activator"
                      v-model="dateFormatted2"
                      persistent-hint
                      @blur="date2 = parseDate(dateFormatted2)"
                    ></v-text-field>
                
                    <v-date-picker :width="'320'" no-title v-model="date2" @input="menu2 = false"></v-date-picker>
                  </v-menu>  
                </v-flex>
              </v-layout>
              
              <v-layout>
                <v-flex xs12 sm8 lg6>
                  <v-btn block large :color="'#FFC107'">search bikes</v-btn>
                </v-flex>
              </v-layout>

            </v-layout>
          </v-container>
        </form>
      </section>
</template>

<script>
export default {
  data () {
    return {
      dateFormatted: null,
      menu: false,
      date: null,

      dateFormatted2: null,
      menu2: false,
      date2: null,
      
      locations: ['Hội An', 'Huế', 'Đà Nẵng']
    }
  },
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    },
    computedDateFormatted2 () {
      return this.formatDate(this.date2)
    }
  },

  watch: {
    date () {
      this.dateFormatted = this.formatDate(this.date)
    },
    date2 () {
      this.dateFormatted2 = this.formatDate(this.date2)
    }
  },

  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
}
</script>

<style lang="scss" scoped>
.home-banner {
  overflow: hidden;
  height: 300px;
  //width: 100%;
  background: url('../assets/img/banner.jpg') no-repeat;
  background-size: cover;
  // form {
  //   width: 40%; 
  // }
}

</style>