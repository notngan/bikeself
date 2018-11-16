<template>
<v-container v-if="isSignedIn" my-0 py-0 fluid fill-height>
  <v-layout column justify-center>
    <v-toolbar flat>
      <v-toolbar-title>All Items</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- ADD NEW -->
      <v-dialog persistent v-model="newDialog" max-width="600px">
        <v-btn slot="activator" dark class="mb-2"><v-icon small>add</v-icon> &nbsp; Add New Bike</v-btn>
        <v-card>
          <admin-form
          @close="close"
          @save-bike="createBikeLocal"
          :model="editedItem"
          :is-editing="false"/>
        </v-card>
      </v-dialog>
    </v-toolbar>
   
    <v-data-table
    :headers="headers"
    expand
    :items="products"
    :item-key="products.id"
    >
      <template v-if="props.item.show == true" slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td class="text-capitalize">{{ props.item.title }}</td>
        <td>{{ props.item.price }}</td>
        <td>{{ props.item.quantity }}</td>
        <td><v-img :src="props.item.imageUrl"></v-img></td>
        <td>{{ props.item.description }}</td>
        <td>
          <v-layout justify-space-around>
            <v-flex>
              <v-dialog v-model="editDialog" max-width="700px">
                <v-icon @click="openEditDialog(props.item)" slot="activator" small>edit</v-icon>
                <v-card>
                  <admin-form
                  @close="close"
                  @save-bike="editBikeLocal"
                  :model="editedItem"
                  :is-editing="true"/>
                </v-card>
              </v-dialog>
            </v-flex>

            <v-flex>
              <v-dialog v-model="deleteDialog" max-width="700px">
                <v-icon @click="deleteDialog = true" slot="activator" small>delete</v-icon>
                <v-card>

                  <v-container>
                    <v-card-title>Remove this item so the user will no longer see it</v-card-title>
                    
                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="grey darken-2" flat @click="close">Cancel</v-btn>
                      <v-btn color="error" flat @click="deleteBike(props.item)">Remove</v-btn>
                    </v-card-actions>

                  </v-container>

                </v-card>
              </v-dialog>
            </v-flex>
          </v-layout>
        </td>
      </template>
      </v-data-table>
    </v-layout>
  </v-container>
</template>

<script>
import AdminForm from './AdminForm.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: { AdminForm },
  data () {
    return {
      newDialog: false,
      editDialog: false,
      deleteDialog: false,
      headers: [
        { text: 'ID', value: 'id', sortable: false },
        { text: 'Title', sortable: false, value: 'title' },
        { text: 'Price($)', value: 'price' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Image', value: 'imageUrl', sortable: false },
        { text: 'Description', value: 'description', sortable: false },
        { text: 'Actions', sortable: false }
      ],
      editedIndex: -1,
      defaultItem:{
        title: '',
        price: 0,
        quantity: 0,
        imageUrl: '',
        description: '',
      },
      editedItem: {
        title: '',
        quantity: 0,
        price: 0,
        imageUrl: '',
        description: '',
      }    
    }
  },
  computed: {
    ...mapGetters(['isSignedIn', 'currentUser', 'products']),
    // currentUser () {
    //   return this.userById(this.signedInUser.id)
    // }
  },
  watch: {
    newDialog (val) {
      val || this.close()
    },
    editDialog (val) {
      val || this.close()
    },
    isSignedIn (val) {
      if (!val) {
        this.$router.push('/admin/login')
      }
    },
    currentUser (val) {
      if(val.isAdmin == false) {
        this.$router.push('/admin/login')
        this.addMessage({
          class: 'error',
          message: 'Please sign in with admin account!'
        })
      }
    }

  },
  methods: {
    ...mapActions(['signUserOut', 'addMessage', 'createBike', 'editBike']),
    close () {
      this.deleteDialog = false 
      this.newDialog = false 
      this.editDialog = false
      setTimeout (() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    createBikeLocal () {
      const len = this.products.length + 1
      let index
      if (len < 100) {
        index = ('00' + len).slice(-3)
      } else {
        index = len
      }
      const bikeData = {
        show: true,
        title: this.editedItem.title,
        price: this.editedItem.price,
        imageUrl: this.editedItem.imageUrl,
        description: this.editedItem.description,
        quantity: this.editedItem.quantity
      }
      console.log(index)
      this.createBike({
        bike: bikeData, 
        index: index
      })
      this.close()
    },
    openEditDialog (item) {
      this.editDialog = true
      this.editedItem = item
    },
    editBikeLocal () {
      const bikeData = {
        show: true,
        title: this.editedItem.title,
        quantity: this.editedItem.quantity,
        price: this.editedItem.price,
        imageUrl: this.editedItem.imageUrl,
        description: this.editedItem.description
      }
      this.editBike({
        id: this.editedItem.id,
        bike: bikeData
      })
      this.close()
    },
    deleteBike(item) {
      this.editedItem = item
      this.editedItem.show = false
      this.$store.dispatch('deleteBike', {
        id: this.editedItem.id,
        show: this.editedItem.show
      })
      setTimeout (() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    }
  }
}
</script> 