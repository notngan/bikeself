<template>
<v-container my-0 py-0 fluid fill-height>
  <v-layout column justify-center>
    <v-toolbar flat color="white">
      <v-toolbar-title>All Items</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-dialog persistent v-model="newDialog" max-width="600px">
        <v-btn slot="activator" dark class="mb-2"><v-icon small>add</v-icon> &nbsp; New Item</v-btn>
        <v-card>
          <v-container>
            <admin-form
            :form-title="formTitle"
            @close="close"
            @save-bike="createBike"
            :model="editedItem"
            :is-editing="false"/>
          </v-container>
        </v-card>
      </v-dialog>
    </v-toolbar>
   
    <v-data-table
    :headers="headers"
    expand
    :items="allBikes"
    :item-key="allBikes.id"
    >
      <template v-if="props.item.show == true" slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td class="text-capitalize">{{ props.item.title }}</td>
        <td>{{ props.item.price }}</td>
        <td>{{ props.item.view }}</td>
        <td><v-img :src="props.item.imageUrl"></v-img></td>
        <td>{{ props.item.description }}</td>
        <td>
          <v-layout justify-space-around>
            <v-flex>
              <v-dialog v-model="editDialog" max-width="600px">
                <v-icon @click="openEditDialog(props.item)" slot="activator" small>edit</v-icon>
                <v-card>
                  <v-container>
                    <admin-form
                    :form-title="formTitle"
                    @close="close"
                    @save-bike="editBike"
                    :model="editedItem"
                    :is-editing="true"/>
                  </v-container>
                </v-card>
              </v-dialog>
            </v-flex>

            <v-flex>
              <v-dialog v-model="deleteDialog" max-width="600px">
                <v-icon @click="deleteDialog=true" slot="activator" small>delete</v-icon>
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
        { text: 'View(s)', value: 'view' },
        { text: 'Image', value: 'imageUrl', sortable: false },
        { text: 'Description', value: 'description', sortable: false },
        { text: 'Actions', sortable: false }
      ],
      editedIndex: -1,
      defaultItem: [
        { title: '' },
        { price: 0 },  
        { imageUrl: '' },
        { description: '' },
      ],
      editedItem: [
        { title: '' },
        { price: 0 },
        { imageUrl: '' },
        { description: '' },
      ]
    }
  },
  computed: {
    allBikes () {
      return this.$store.state.allBikes
    },
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    adminIsAuthenticated () {
      return this.$store.getters.adminIsAuthenticated 
    }
  },
  watch: {
    newDialog (val) {
      val || this.close()
    },
    editDialog (val) {
      val || this.close()
    },
    adminIsAuthenticated (val) {
      if (!val) {
        this.$router.push('/admin/signin')
      }
    }
  },
  methods: {
    close () {
      this.deleteDialog = false 
      this.newDialog = false 
      this.editDialog = false
      setTimeout (() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    createBike () {
      const bikeData = {
        show: true,
        title: this.editedItem.title,
        price: this.editedItem.price,
        imageUrl: this.editedItem.imageUrl,
        description: this.editedItem.description
      }
      this.$store.dispatch('createBike', bikeData)
      this.close()
    },
    openEditDialog (item) {
      this.editDialog = true
      this.editedItem = item
    },
    editBike () {
      this.$store.dispatch('editBike', {
        id: this.editedItem.id,
        title: this.editedItem.title,
        price: this.editedItem.price,
        imageUrl: this.editedItem.imageUrl,
        description: this.editedItem.description
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