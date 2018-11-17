<template>
  <v-container fluid class="wrapper">
    <v-layout justify-space-around>
      
      <!-- ADD NEW -->
      <v-flex>
        <v-card flat>
          <v-toolbar flat>
            <v-toolbar-title>New Article</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn dark class="mb-2" @click="newForm = !newForm">
              <v-icon v-if="newForm == false" small>add</v-icon>
              <v-icon v-if="newForm == true" small>close</v-icon>&nbsp;
              <span v-if="newForm == false"> New Article</span>
              <span v-if="newForm == true"> Close</span>
            </v-btn>
          </v-toolbar>
          
          <v-container v-if="newForm">
            <v-form @submit.prevent="createArticle">
              <v-text-field
                label="Title"
                solo
                v-model="article.title"
                >
              </v-text-field>
              <v-textarea
                label="Short Description"
                solo
                v-model="article.description">
              </v-textarea>
              <v-text-field 
                solo label="Cover Image URL"
                v-model="article.image"></v-text-field>
              
              <div class="grey lighten-2" v-for="(sec, index) in article.sections" :key="index" >
                <v-layout justify-end align-end>
                  <v-btn small @click="closeSection(index)" icon><v-icon>close</v-icon></v-btn>
                </v-layout>

                <v-container class="mb-3 px-5">
                  <h2 class="mb-3">Section {{index + 1}}</h2>
                  <v-text-field solo v-model="sec.h" label="Heading"></v-text-field>
                  <v-textarea solo v-model="sec.p" label="Paragraph"></v-textarea>
                  <v-text-field solo v-model="sec.image" label="Image URL"></v-text-field>
                </v-container>
              </div>
              
              <v-layout justify-end>
                <v-btn @click="addSection" flat><v-icon small>add</v-icon>&nbsp; new section</v-btn>
              </v-layout>
              <v-layout column justify-end>
                <v-btn class="amber" type="submit">create</v-btn>
              </v-layout>
            </v-form>
          </v-container>

        </v-card>
      </v-flex>
      
      <!-- PREVIEW -->
      <v-flex>
        <v-card flat>
          <v-toolbar flat>
            <v-toolbar-title>Preview</v-toolbar-title>
          </v-toolbar>
          <v-container>
            <article>
              <h1>{{ article.title }}</h1>
              <em>{{ article.description }}</em>
            </article>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    
  </v-container>   
</template>

<script> 
export default { 
  data () {
    return {
      newForm: true,
      article: {
        title: null,
        description: null, 
        image: null,
        sections: [
          { h: null, p: null, image: null }
        ]
      } 
    }
  },
  computed: {
   
  },
  methods: {
    addSection () {
      this.article.sections.push({ h: null, p: null, image: null })
    },
    closeSection (index) {
      this.article.sections.splice(index, 1)
    //  console.log(index)
    },
    createArticle () {
      console.log(this.article)
    }
  }

}
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
}
.position {
  position: relative;
}
</style>

