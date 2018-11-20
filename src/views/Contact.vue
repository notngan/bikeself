<template>
  <div class="wrapper">
    <v-container>
      <v-layout wrap justify-center>

        <v-flex xs12 sm6 offset-sm1>
          <h1 class="font-weight-bold mb-4 display-2">How can we help you<span v-if="name !== null">, {{ name }}</span>?</h1>
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
 
        <v-flex xs12 sm4 offset-sm1>
          <v-layout class="text-xs-center text-sm-left" column>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.571439224269!2d108.23949331428636!3d16.087713888869537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314217f45884e355%3A0x69e1e76645deb553!2zMjE1IE5nw7QgUXV54buBbiwgTcOibiBUaMOhaSwgU8ahbiBUcsOgLCDEkMOgIE7hurVuZywgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1542710097876" frameborder="0" style="border:0" allowfullscreen></iframe>
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
