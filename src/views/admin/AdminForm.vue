<template>
  <form>
    <form @submit.prevent="saveBike">
      <v-container grid-list-md>
        <v-layout mb-4>
          <span class="headline">{{ formTitle }}</span>
        </v-layout>
        <v-layout column wrap>
          <v-flex>
            <v-text-field required v-model="model.title" label="Title *"></v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field required prefix="$" v-model="model.price" label="Price *"></v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field required v-model="model.imageUrl" label="Image URL *"></v-text-field>
          </v-flex>
          <v-flex>
            <img :src="model.imageUrl" height="150px">
          </v-flex>
          <v-flex>
            <v-textarea required v-model="model.description" label="Description *"></v-textarea>
          </v-flex>
        </v-layout>
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
      </v-container>
    </form>
  </form>
</template>

<script>
export default {
  props: ['model', 'isEditing', 'formTitle'],
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

