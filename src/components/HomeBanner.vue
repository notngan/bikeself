<template>
  <div class="home-banner">
    <v-parallax height="500" :src="require('../assets/img/banner.jpg')">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
          <v-autocomplete
            outline
            v-model="keyword"
            :items="products"
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
    } 
  },
  computed: {
    ...mapGetters(['products']),
  },
  watch: {
    keyword (val) {
      if (val) {
        //console.log(val)
        this.$router.push('/rentals/' + val)
      }
    }
  },
  mounted () {
    this.products.map(val => val.text = `${val.title}, ${val.description}`)
  }
}
</script>

<style lang="scss" scoped>

</style>