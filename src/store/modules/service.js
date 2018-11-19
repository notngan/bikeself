//import { firebaseAuth } from '../../firebaseConfig'

const state = {
	
	articleList: [],


}

const mutations = {
	'SET_CREATED_ARTICLE' (state, payload) {
		state.articleList.push(payload)
  },
  'LOAD_ARTICLE_LIST' (state, payload) {
    state.articleList = payload
	},

}

const actions = {

}

const getters = {
	articles (state) {
		return state.articleList
	},

	tourById (state) {
    return (id) => {
      return state.articleList.find((tour) => {
        return tour.id === id
      })
    }
  },
}

export default {
	state,
	mutations,
	actions,
	getters
}