<template>
  <div class="home-banner">
    <v-parallax src="https://vietnammotorbiketour.asia/wp-content/uploads/2015/11/north-vietnam-motorbike-tours2.jpg" alt="Vietnam Rental Bikes">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 class="wrap">
          <v-autocomplete
            outline
            v-model="keyword"
            :items="items"
            hide-no-data
            :search-input.sync="search"
            :loading="isLoading"
            item-text="text"
            item-value="id"
            label="Search for bike..."
            persistent-hint
            append-icon="toys">
          </v-autocomplete> 
        </v-flex>
      </v-layout>
    </v-parallax> 
  </div>
</template>
 
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      keyword: null,
      search: null,
      items: [],
      isLoading: false,
    } 
  },
  computed: {
    ...mapGetters(['products']),
  },
  watch: {
    keyword (val) {
      if (val) {
        this.$router.push('/rentals/' + val)
      }
    },
    search (val) {
      if(val) {
        if (this.items.length > 0) return 
        this.isLoading = true
        setTimeout(() => {
          this.items = this.products
          this.isLoading = false
        }, 1000)
        this.items = []
      }
    },
  },
  created () {
    this.products.map(val => val.text = `${val.title}, ${val.description}`)
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
  .wrap {
    background-image: radial-gradient(closest-side, rgba(#fff,0.5), rgba(0,0,0,0));
    padding: 30px 30px 10px;
  }
</style>