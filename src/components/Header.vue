<template>
<div>
  <v-navigation-drawer
    fixed 
    temporary 
    :width="'210'"
    v-model="sideNav">
    <v-toolbar v-if="isSignedIn" flat>
      <v-toolbar-title>Hi, {{ signedInUser.name }}!</v-toolbar-title>
    </v-toolbar>
    <v-list>
      <v-list-tile
        v-for="item in menuItems"
        :key="item.title"
        :to="item.link"
      >
        <v-list-tile-content>{{ item.title }}</v-list-tile-content>
      </v-list-tile>

      <!-- NOT SIGNED IN -->
      <template v-if="!isSignedIn">
        <v-divider></v-divider>
        <v-list-tile @click="openSignIn">
          <v-list-tile-content>Sign in</v-list-tile-content>
          <v-list-tile-action><v-icon>person</v-icon></v-list-tile-action>
          <v-dialog :max-width="'500px'" v-model="showSignInLocal">
            <sign-in-form/>
          </v-dialog>
        </v-list-tile>

        <v-divider></v-divider>
        <v-list-tile @click="openSignUp">
          <v-list-tile-content>Sign up</v-list-tile-content>
          <v-list-tile-action><v-icon>person_add</v-icon></v-list-tile-action>
          <v-dialog :max-width="'500px'" v-model="showSignUpLocal">
            <sign-up-form/>
          </v-dialog>
        </v-list-tile>
      </template>

      <!-- SIGNED IN -->
      <template v-if="isSignedIn">
        <v-divider></v-divider>
        <v-list-tile :to="'/user/' + signedInUser.id">
          <v-list-tile-content>View profile</v-list-tile-content>
          <v-list-tile-action><v-icon>info</v-icon></v-list-tile-action>
        </v-list-tile>

        <v-divider></v-divider>
        <v-list-tile @click="openComfirm">
          <v-list-tile-content>Sign out</v-list-tile-content>
          <v-list-tile-action><v-icon>exit_to_app</v-icon></v-list-tile-action>
          <comfirm-dialog
            :name="'sign out'"
            :show-comfirm="showComfirmLocal"
            @close="closeComfirm"
            @comfirm="onSignOut"/>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>

  <v-toolbar
    class="primary"
    fixed
    >
    <!-- SIDE ICON -->
    <v-toolbar-side-icon
      v-if="notAdmin"
      @click.stop="sideNav = !sideNav"
      class="hidden-md-and-up">
    </v-toolbar-side-icon>
    
    <v-container py-2 fluid fill-height>
      <v-layout px-0 mx-0 justify-space-between wrap align-center>
        
        <v-spacer class="hidden-md-and-up"></v-spacer>
        
        <!-- LOGO -->
        <v-toolbar-items>
          <v-layout align-center wrap>
            <router-link v-if="notAdmin"  :to="'/'"><img width="120px" src="../assets/img/logo.svg"></router-link>
            <h1 v-if="!notAdmin" class="heading">Admin</h1>
            <v-divider 
              class="mx-3"
              inset
              vertical v-if="!notAdmin"></v-divider>
          </v-layout>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        
        <!-- MAIN MENU -->
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn
            v-for="item in menuItems"
            :key=" item.title"
            small
            flat
            :to="item.link">
            {{ item.title}}
          </v-btn>
        </v-toolbar-items>
        <v-spacer class="hidden-sm-and-down"></v-spacer>
      </v-layout>
    </v-container> 
   
        
        <!-- SUB MENU -->
    <v-btn :to="'/bookings'" flat icon :color="'rgba(0,0,0,0.7)'">
      <v-badge
        color="red"
        overlap
        v-model="showBadge"
        >
        <span slot="badge">{{ bookings.length }}</span>
          <v-icon>bookmark</v-icon>
      </v-badge>
    </v-btn>
    
      
    <v-menu open-on-hover min-width="190" dark offset-y class="hidden-sm-and-down">
      <v-btn flat slot="activator" :color="'rgba(0,0,0,0.7)'"><v-icon>person</v-icon><span v-if="isSignedIn"> &nbsp; &nbsp;{{ signedInUser.name }}</span></v-btn>
      
      <v-list>
        <!-- INFO -->
        <v-list-tile :to="'/user/' + signedInUser.id" v-if="isSignedIn">
          <v-list-tile-content>View profile</v-list-tile-content>
          <v-list-tile-action><v-icon>info</v-icon></v-list-tile-action>
        </v-list-tile>

        <!-- SIGN OUT -->
        <v-list-tile @click="openComfirm" v-if="isSignedIn">
          <v-list-tile-content>Sign out</v-list-tile-content>
          <v-list-tile-action><v-icon>exit_to_app</v-icon></v-list-tile-action>
          <comfirm-dialog
            :name="'sign out'"
            :show-comfirm="showComfirmLocal"
            @close="closeComfirm"
            @comfirm="onSignOut"/>
        </v-list-tile>

        <!-- SIGN IN  -->
        <v-list-tile v-if="!isSignedIn" @click="openSignIn">
          <v-list-tile-content>Sign in</v-list-tile-content>
          <v-list-tile-action><v-icon>person</v-icon></v-list-tile-action>
          <v-dialog :max-width="'500px'" v-model="showSignInLocal">
            <sign-in-form/>
          </v-dialog>
        </v-list-tile>
        
        <!-- SIGN UP  -->
        <v-list-tile v-if="!isSignedIn" @click="openSignUp">
          <v-list-tile-content>Sign up</v-list-tile-content>
          <v-list-tile-action><v-icon>person_add</v-icon></v-list-tile-action>
          <v-dialog :max-width="'500px'" v-model="showSignUpLocal">
            <sign-up-form/>
          </v-dialog>
        </v-list-tile>
      </v-list>
    </v-menu>
          
        <!-- ADMIN MENU -->
        <!-- <v-toolbar-items v-if="!notAdmin && adminIsAuthenticated">
          <v-btn @click="showComfirm = true" flat>Log out &nbsp;<v-icon small>exit_to_app</v-icon></v-btn>
          <v-dialog
            v-model="showComfirm"
            max-width="280"
          >
            <v-card>
              <v-card-title class="subheading">Do you really want to log out?</v-card-title>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="grey darken-2"
                  flat
                  @click="showComfirm = false"
                >
                  No, thanks
                </v-btn>

                <v-btn
                  color="error"
                  flat
                  @click="logAdminOut"
                >
                  Log out
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar-items> -->

       
  </v-toolbar>
  
</div>
</template>

<script>
import SignInForm from './user/SignInForm.vue'
import SignUpForm from './user/SignUpForm.vue'
import ComfirmDialog from './user/ComfirmDialog.vue'
// import appMessage from './Message.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: { 
    SignInForm, 
    SignUpForm, 
    ComfirmDialog, 
    // appMessage
  },
  data () {
    return {
      sideNav: false,
      menuItems: [
      { title: 'Home', link: '/'},
      { title: 'Rentals', link: '/rentals'},
      { title: 'Services', link: '/services'},
      { title: 'Tours', link: '/tours'},
      { title: 'About us', link: '/about'},
      { title: 'Contact', link: '/contact'}
      ],
    }
  },
  computed: {
    ...mapGetters(['isSignedIn', 'signedInUser', 'showSignIn', 'showSignUp', 'showComfirm', 'bookings']),
    showSignInLocal: {
      get () {
        return this.showSignIn
      },
      set (value) {
        return this.displaySignIn(value)
      } 
    },
    showSignUpLocal: {
      get () {
        return this.showSignUp
      },
      set (value) {
        return this.displaySignUp(value)
      } 
    },
    showComfirmLocal: {
      get () {
        return this.showComfirm
      },
      set (value) {
        return this.displayComfirm(value)
      } 
    },
    notAdmin () {
      return this.$route.name !== 'admin' && this.$route.name !== 'adminLogin'
    },
    adminIsAuthenticated () {
      return this.$store.getters.adminIsAuthenticated 
    },
    showBadge () {
      if (this.bookings.length > 0) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions(['signUserOut', 'displaySignIn', 'displaySignUp', 'displayComfirm']),

    onSignOut () {
      this.signUserOut()
      this.closeComfirm()
    }, 
    closeComfirm () {
      this.displayComfirm(false)
    },
    openComfirm () {
      this.displayComfirm(true)
    },
    openSignIn () {
      this.displaySignIn(true)
    },
    openSignUp () {
      this.displaySignUp(true)
    }
  }
}
</script>
