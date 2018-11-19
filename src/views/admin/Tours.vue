<template>
<div class="wrapper">
  <v-container fluid>
    <v-layout wrap justify-space-around>
      
      <!-- ADD NEW -->
      <v-flex xs12 md6>
        <v-card flat>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-btn dark class="mb-2" @click="newForm = !newForm">
              <v-icon v-if="newForm == false" small>add</v-icon>
              <v-icon v-if="newForm == true" small>close</v-icon>&nbsp;
              <span v-if="newForm == false"> New Article</span>
              <span v-if="newForm == true"> Close</span>
            </v-btn>
          </v-toolbar>
          
          <v-container v-if="newForm">
            <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="onCreateArticle">
              <v-text-field
                label="Title"
                solo
                v-model="article.title"
                required
                type="text"
                :rules="[v => !!v || 'Title is required']"
                >
              </v-text-field>
              <v-textarea
                label="Short Description"
                solo
                v-model="article.description"
                :rules="[v => !!v || 'Description is required']"
                type="text"
                required>
              </v-textarea>
              <v-text-field 
                solo label="Cover Image URL"
                v-model="article.image"
                :rules="[v => !!v || 'Cover image is required']"></v-text-field>
              
              <div class="grey lighten-2" v-for="(sec, index) in article.sections" :key="index" >
                <v-layout justify-end align-end>
                  <v-btn small @click="closeSection(index)" icon><v-icon>close</v-icon></v-btn>
                </v-layout>

                <v-container class="mb-3 px-5">
                  <h2 class="mb-3">Section {{index + 1}}</h2>
                  <v-text-field 
                    solo 
                    v-model="sec.h"
                    type="text" 
                    label="Heading"></v-text-field>
                  <v-textarea 
                    solo 
                    v-model="sec.p"
                    type="text" 
                    label="Paragraph"></v-textarea>
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
      <v-flex xs12 md6>
        <v-card flat v-if="newForm">
          <v-toolbar flat>
            <v-toolbar-title>Preview</v-toolbar-title>
          </v-toolbar>
          <v-container>
            <article>
              <h1 class="text-capitalize display-3 font-weight-bold">{{ article.title }}</h1>
              <v-layout>
                <v-divider class="mt-2"></v-divider>
                <div class="grey--text y-4 px-1 font-weight-bold text-xs-right">{{ signedInUser.name }}</div>
              </v-layout>
              <em class="subheading my-4">{{ article.description }}</em>
              <section v-for="(section, index) in article.sections" :key="index">
                <h2 class="mb-2 mt-3">{{ section.h }}</h2>
                <p>{{ section.p }}</p>
                <v-img max-height="350" :src="section.image" v-if="section.image" :alt="section.h"></v-img>
              </section>
            </article>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    
  </v-container> 
</div>
</template>

<script> 
import { mapGetters, mapActions } from 'vuex'
export default { 
  data () {
    return {
      newForm: false,
      article: {
        title: null,
        description: null, 
        image: null,
        sections: [
          { h: null, p: null, image: null }
        ]
      },
      default: {
        title: null,
        description: null, 
        image: null,
        sections: [
          { h: null, p: null, image: null }
        ]
      },
      valid: true 
    }
  },
  computed: {
    ...mapGetters(['signedInUser'])
   
  }, 
  watch: {
    newForm (val) {
      if (val == false) {
        this.article = Object.assign({}, this.default)
      }
    }
  },
  methods: {
    ...mapActions(['createArticle', 'addMessage']),
    addSection () {
      this.article.sections.push({ h: null, p: null, image: null })
    },
    closeSection (index) {
      this.article.sections.splice(index, 1)
    //  console.log(index)
    },
    // createArticle () {
    //   console.log(this.article)
    // },

    onCreateArticle () {
      if (this.$refs.form.validate()) {
        this.article.author = this.signedInUser.name
        this.article.date = new Date().toISOString().substring(0,10)
        this.createArticle(this.article).then(() => {
          this.newForm = false
          this.addMessage({
            class: 'success',
            message: 'Your article have been posted.'
          })
        })
        
      }
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

