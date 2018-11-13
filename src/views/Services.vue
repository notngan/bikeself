<template>
  <div id="services">
    <v-container grid-list-md>
      <h2 class="font-weight-bold display-1">Free Services</h2>
      <v-layout fill-height wrap justify-center mt-3>
        <v-flex
          mb-4
          xs12 sm6
          v-for="(service, index) in services"
          :key="index"
        >
          <service-item :service="service"/>  
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import ServiceItem from '../components/service/ServiceItem.vue'
export default {
  components: { ServiceItem },
  computed: {
   services () {
      return this.$store.state.allServices
    }
  }
}
</script>
<style lang="scss" scoped>
</style>

