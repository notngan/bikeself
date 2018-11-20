<template>
  <div class="wrapper">
    <v-container>
      <v-layout wrap>
        <v-flex xs5>
          <h1 class="mb-3 display-2">How can we <br>help you, {{ signedInUser.name.split(' ')[0]}}?</h1>
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
              label="Your question here.">
            </v-text-field>
            <v-textarea
              v-model="detail"
              label="Please describe its details!"
              outline>
            </v-textarea>
          </v-form>
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
      question: null
    }
  },
  computed: {
    ...mapGetters(['signedInUser'])
  }

}
</script>