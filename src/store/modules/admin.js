//import { firebaseAuth } from '../../firebaseConfig'

const state = {
	userList: [],
	isAdmin: false,

}

const mutations = {
	'LOAD_USER_LIST' (state, payload) {
		state.userList = payload
	},

	'SET_ADMIN' (state, payload) {
		state.isAdmin = payload
	},

}

const actions = {

}

const getters = {
  isAdmin (state) {
		return state.isAdmin
	},
	users (state) {
		return state.userList
	},

	currentUser (state, getters) {
		return state.userList.find((user) => {
			return (user.id === getters.signedInUser.id)
		})
	},
	userByEmail (state) {
		return (email) => {
			return state.userList.find((user) => {
				return user.email === email
			})
		}
	}
	// bookingById (state) {
  //   return (id) => {
  //     return state.bookingList.find((booking) => {
  //       return booking.id === id
  //     })
  //   }
  // },
}

export default {
	state,
	mutations,
	actions,
	getters
}