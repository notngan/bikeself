<template>
  <v-container>
    <h3 class="my-3 headline">
      <span v-if="isEditing">Update This Bike</span>
      <span v-else>Add a New Bike</span>
    </h3>
    <form @submit.prevent="saveBike">
      <v-layout wrap>
        <v-flex pr-3 xs8>
          <v-text-field 
          outline 
          required 
          v-model="model.title" 
          label="Title"></v-text-field>
        </v-flex>

        <v-flex xs4>
          <v-text-field 
            outline 
            required 
            v-model="model.price" 
            label="Price ($)"></v-text-field>
        </v-flex>

        <v-flex pr-3 xs8>
          <v-text-field 
            outline 
            required 
            v-model="model.imageUrl" 
            label="Image URL"></v-text-field>
        </v-flex>
        
        <v-flex xs4>
          <v-text-field 
            outline 
            required 
            v-model="model.quantity" 
            label="Quantity"></v-text-field>         
        </v-flex>
      </v-layout>
      
      <v-img 
        height="150"
        width="150"
        class="mb-3"
        v-if="model.imageUrl" 
        :src="model.imageUrl"> </v-img>

      <v-textarea 
        outline 
        required 
        v-model="model.description" 
        label="Description"></v-textarea>

      <v-layout justify-end>
        <v-btn color="error" flat @click.native="close">Cancel</v-btn>
        <v-btn 
          color="blue darken-1" flat 
          :disabled="!formIsValid"
          type="submit"
          >
          <span v-if="isEditing">Save</span>
          <span v-else>Add</span>
        </v-btn>
      </v-layout>
    </form>
  </v-container>
</template>

<script>
export default {
  props: ['model', 'isEditing'],
  computed: {
    formIsValid () {
      return this.model.title !== '' && this.model.price >= 0 && this.model.imageUrl !== '' && this.model.description !== ''
    }
  },
  methods: {
    saveBike () {
      this.$emit('save-bike', this.model)
    },
    close () {
      this.$emit('close', this.model)
    }
  }
}
</script>

