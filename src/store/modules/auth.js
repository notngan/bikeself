import { firebaseAuth } from '../../firebaseConfig'

const state = {
  isSignedIn: firebaseAuth().currentUser !== null,
  user: firebaseAuth().currentUser,
  showSignIn: false,
  showSignUp: false,
  comfirm: false,
  countryList: []
}

const mutations = {
  'AUTH_STATUS_CHANGE' (state) {
    state.isSignedIn = firebaseAuth().currentUser != null;
    state.user = firebaseAuth().currentUser;
  },
  'DISPLAY_SIGN_IN' (state, payload) {
    state.showSignIn = payload
  },
  'DISPLAY_SIGN_UP' (state, payload) {
    state.showSignUp = payload
  },
  'DISPLAY_COMFIRM' (state, payload) {
    state.comfirm = payload
  },
  'LOAD_COUNTRY_LIST' (state, payload) {
    state.countryList = payload
  }
}

const actions = {

}

const getters = {
  showSignIn: (state) => {
    return state.showSignIn
  },
  showSignUp: (state) => {
    return state.showSignUp
  },
  showComfirm: (state) => {
    return state.comfirm
  },
  isSignedIn: (state) => {
    return state.isSignedIn
  },
  signedInUser: (state) => {
    if (state && state.user) {
      return {
        id: state.user.uid,
        email: state.user.email,
        name: state.user.displayName
      } 
    } else {
      return {}
    }
  },
  countries: (state) => {
    return state.countryList
  }
}

export default {
	state,
	mutations,
	actions,
	getters
}