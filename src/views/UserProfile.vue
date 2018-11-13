<template>
<div v-if="signedInUser">
  <v-container>
    <v-layout wrap>

      <!-- INFO -->
      <v-flex px-2 xs12 sm4>
        <v-card flat>
          <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR1X3cm5xzR4D1W9oPb2QWioKlrfLVd0DvXFUNqSjZfg-M0bpc"></v-img>
          
          <v-form class="mt-3">
            <v-select 
              label="Title"
              :items="genders"
              outline
              item-text="text"
              item-value="value"
            ></v-select>
            
            <v-text-field
              label="Full name"
              v-model="signedInUser.name"
              outline
            ></v-text-field>

            <v-text-field
              label="Email"
              v-model="signedInUser.email"
              outline
              disabled
            ></v-text-field>

            <v-text-field
              label="Phone number"
              v-model="phone"
              outline
            ></v-text-field>

            <v-btn block color="amber">update profile</v-btn>
          </v-form>

        </v-card>
      </v-flex>

      <!-- TRANSACTION -->
      <v-flex pa-2 xs12 sm8>
        <v-card flat>
          <h1 class="my-3">Your Rentals</h1>
          <transaction-item
            v-for="(transaction, index) in transactions" :key="index"
            :transaction="transaction"
          />
        </v-card>
      </v-flex>
    </v-layout>  
  </v-container>  
</div>
  
</template>

<script>
import { mapGetters } from 'vuex'
import TransactionItem from '../components/user/TransactionItem'
export default {
  components: { TransactionItem },
  data () {
    return {
      phone: null,
      genders: [
        { text: 'Ms.', value: 'Ms.'},
        { text: 'Mrs.', value: 'Mrs.'},
        { text: 'Mr.', value: 'Mr.'}
      ]
    }
  },
  computed: {
    ...mapGetters(['signedInUser', 'transactions'])
  },

  methods: {
  }
}
</script>
