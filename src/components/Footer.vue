<template>
 <footer>
   <v-container fill-height>
     <v-layout my-0 py-0 justify-space-between wrap class="text-xs-center text-sm-left">
       <v-flex xs12 sm7 offset-sm1 offset-md0 md6 lg8 my-2>
         <h3>bikeself's office</h3>
         <v-layout wrap>
           <v-flex xs12 lg6>
             <h4>da nang</h4>
             <p>215 Ngo Quyen Street, Ward 22, Hai Trieu District.</p>
             <p>215 An Duong Vuong Street, Ward 2, Thanh Khe District.</p>
           </v-flex>
           <v-flex xs12 lg6>
             <h4>hue</h4>
             <p>215 Ngo Quyen Street, Ward 22, Hai Trieu District.</p>
             <p>215 An Duong Vuong Street, Ward 2, Thanh Khe District.</p>
           </v-flex>
         </v-layout>
       </v-flex>
      
       <v-flex xs12 sm4 md6 lg4 my-2>
         <v-layout wrap>
           <v-flex xs12 md6>
            <h3>hotline</h3>
            <p>1900 1910</p>
            <p>(+84) 909 191 053</p>
           </v-flex>

           <v-flex xs12 md6>
            <h3>social networks</h3>
            <p><a href="https://facebook.com" target="blank">Facebook</a></p>
            <p><a href="https://youtube.com" target="blank">YouTube</a></p>
           </v-flex>
         </v-layout>
       </v-flex>
     </v-layout>
   </v-container>
 </footer>
</template>

<script>
export default {
  name: 'app-footer'
}
</script>


<style lang="scss" scoped>
  footer {
    margin: 0;
    padding: 0;
    background: #212121;
  }
  h3 {
    text-transform: uppercase;
    color: #FFC107;
    margin-bottom: 1rem;
  }
  h4 {
    color: white;
    text-transform: capitalize;
    margin-bottom: 0.8rem;
    font-size: 1.2rem;
  }
  p, a {
    font-weight: 300;
    font-size: 0.95rem;
    text-transform: capitalize;
    color: #E0E0E0;
  }
</style>
