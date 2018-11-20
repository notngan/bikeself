<template>
  <div class="wrapper">
    <v-container>
      <v-layout wrap justify-space-between>

        <v-flex xs12 sm7>
        <h1 class="font-weight-bold mb-4 display-2">How can we help you<span>, {{ name }}</span>?</h1>
          <v-form>
            <v-select
              :items="helps"
              outline
              v-model="subject"
              label="What is it about?">
            </v-select>
            <v-text-field 
              v-model="question"
              outline
              label="Your question here."
              placeholder="I lost the bike, what should I do?">
            </v-text-field>
            <v-textarea
              v-model="detail"
              label="Please describe its details."
              outline>
            </v-textarea>
          </v-form>
        </v-flex>

        <v-flex xs12 sm4>
          <v-layout column>
            <v-flex mb-3>
              <h2>Hotline</h2>
              <div>1900 1910</div>
              <div>(+84) 909 191 053</div>
            </v-flex>
            <v-flex mb-3>
              <h2>Office</h2>
              <div>215 Ngo Quyen, Ward 22, Hai Trieu, Da Nang.</div>
              <div>55 Le Thanh Tai, Ward 12, Vi Da, Hue.</div>
              <div>11 Tran Thu Thao, Ward 2, Cam Nam, Hoi An.</div>
            </v-flex>
            <v-flex mb-3>
              <h2>Social</h2>
              <div>
                <a href="https://www.facebook.com/Bikeself/" target="blank">facebook/bikeself</a>
              </div>
              <div>
                <a href="https://www.youtube.com/" target="blank">youtube/bikeself</a>
              </div>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      helps: [
        `Bike's quality`,
        `Support services`,
        `Delivery and returning`,
        `Other`
      ],
      subject: null,
      detail: null, 
      question: null,
      name: null
    }
  },
  computed: {
    ...mapGetters(['signedInUser']),
  },
  watch: {
    signedInUser (val) {
      if (val) {
        this.name = val.name.split(' ')[0]
      }
    }
  },
  mounted () {
    
  },
}
</script>

<style lang="scss" scoped>
div {
  div {
    margin: 5px 0;
  }
}
</style>
