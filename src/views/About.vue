<template>
  <div class="wrapper">
    <!-- STORY -->
    <v-container>
      <v-layout justify-center mb-4>
        <v-flex xs12 sm8 class="text-xs-center">
          <v-divider class="mb-4"></v-divider>
          <h2 class="mb-4 accent--text display-2 font-weight-thin">The Bikeself Story</h2>
          <v-divider class="mb-4"></v-divider>
          <h3 class="mb-3 grey--text">What is <span class="accent--text">one-way</span> rental?</h3>          
          <p>Bleghbleghvomit my furball really tie the room together twitch tail in permanent irritation yet need to check on human, have not seen in an hour might be dead oh look, human is alive, hiss at human, feed me but scratch leg; meow for can opener to feed me give me some of your food give me some of your food give me some of your food meh, i don't want it. If it smells like fish eat as much as you wish. Rub against owner because nose is wet. I like cats because they are fat and fluffy hide at bottom of staircase to trip human thug cat yet roll over and sun my belly yet meoooow, or i like big cats and i can not lie eat the rubberband. Get video posted to internet for chasing red dot give me some of your food give me some of your food give me some of your food meh, i don't want it. Flex claws on the human's belly and purr like a lawnmower. </p>
          <h3 class="mb-3 grey--text">"Rent a <span class="accent--text">bike</span>, ride it your<span class="accent--text">self</span>"</h3>
          <p> Chase after silly colored fish toys around the house. Disappear for four days and return home with an expensive injury; bite the vet make plans to dominate world and then take a nap scratch the box purr while eating and stare at guinea pigs so this human feeds me, i should be a god or i'm going to lap some water out of my master's cup meow. I like fish. Lay on arms while you're using the keyboard bring your owner a dead bird. Destroy the blinds cat meoooow i iz master of hoomaan, not hoomaan master of i, oooh damn dat dog. Roll on the floor purring your whiskers off paw at beetle and eat it before it gets away for always hungry and sit on human and hide from vacuum cleaner yet stand in front of the computer screen leave hair everywhere.</p>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- TEAM -->
    <v-layout class="accent" column>
      <v-container>
        <v-layout justify-center>
          <v-flex xs12 sm8 class="text-xs-center">
            <h2 style="color: #eee" class="mb-4 display-2 font-weight-thin">Meet Our Team</h2>
            <p style="color: #aaa">Bite nose of your human if human is on laptop sit on the keyboard pooping rainbow while flying in a toasted bread costume in space lies down for my cat stared at me he was sipping his tea, too stretch. Catty ipsum intently sniff hand, for catasstrophe yet try to jump onto window and fall while scratching at wall make meme, make cute face.</p>
          </v-flex>
        </v-layout>
      </v-container>
      <v-layout py-3 justify-center wrap>
        <v-flex v-for="(item, index) in teams" :key="index" xs12 sm4 md3 mb-5 class="text-xs-center">
          <div class="avatar-wrap">
            <img :src="require(`../assets/img/${item.avatar}.jpg`)" alt="bikeself - meet our team">
          </div>
          <h3 class="primary--text mt-2 headline font-weight-bold">{{ item.name }}</h3>
          <div style="color: #aaa">{{ item.role }}</div>
        </v-flex>
      </v-layout>
    </v-layout>

    <!-- GUARANTEE -->
    <v-container>
      <v-layout justify-center mb-4>
        <v-flex xs12 sm8 class="text-xs-center">
          <h2 class="mb-3 accent--text display-2 font-weight-thin">Our Guarantee</h2>
          <p>Rub against owner because nose is wet. I like cats because they are fat and fluffy hide at bottom of staircase to trip human thug cat yet roll over and sun my belly yet meoooow, or i like big cats and i can not lie eat the rubberband. Get video posted to internet for chasing red dot give me some of your food give me some of your food give me some of your food meh, i don't want it. Flex claws on the human's belly and purr like a lawnmower.</p>
        </v-flex>
      </v-layout>

      <v-layout wrap justify-center>
        <v-flex class="text-xs-center" px-2 my-2 xs10 sm6 md5 v-for="(item, index) in guarantees" :key="index">
          <v-btn color="#333" fab outline large>
              <v-icon class="primary--text" x-large>{{ item.icon }}</v-icon>
            </v-btn>
          <h3 class="text-capitalize mt-1 headline font-weight-bold">{{ item.title }}</h3>
          <p>They do that then cats take over the world meow. I show my fluffy belly but it's a trap! if you pet it i will tear up your hand.</p>
        </v-flex>
      </v-layout>
      <v-layout justify-center my-3>
        <v-flex xs12 sm10 class="text-xs-center">
          <v-divider class="mb-4"></v-divider>
          <h2 class="mb-4 accent--text display-2 font-weight-thin">Thanks for choosing us!</h2>
          <v-divider class="mb-4"></v-divider>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      teams: [
        { name: 'Ngan Bich', role: 'Developer', avatar: 'ngan' },
        { name: 'Ham Tai', role: 'Marketer', avatar: 'tai' },
        { name: 'Thao Mai', role: 'Business Analyst', avatar: 'thao' },
      ],
      guarantees: [
        { title: 'newest & safest bikes', icon: 'stars' },
        { title: 'always be pre-tested', icon: 'done_all' },
        { title: 'fast support', icon: 'build' },
      ] 
    }
  }

}
</script>

<style lang="scss" scoped>
.avatar-wrap {
  border-radius: 100%;
  margin: 0 auto;
  height: 200px;
  width: 200px;
  overflow: hidden;
  //border: 1px #FFC107 solid;
  position: relative;
  img {
    height: 100%;
    position: absolute;
    left: 0;
  }
}
</style>
