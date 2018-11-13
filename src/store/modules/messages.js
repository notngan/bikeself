const state = {
  messageGroup: {
    class: '', 
    message: '',
    show: false
  },
  timeoutEvent: null
}

const mutations = {
  'ADD_MESSAGE' (state, payload) {
    state.messageGroup = {
			class: payload.class,
      message: payload.message,
      show: true
		}
    
    if (state.timeoutEvent) {
      clearTimeout(state.timeoutEvent)
    }
    state.timeoutEvent = setTimeout(() => {
      state.messageGroup = {
        class: '',
        message: '',
        show: false
      }
    }, 5000)
  },
  'CLEAR_MESSAGE' (state) {
    state.messageGroup = {
			class: '',
      message: '',
      show: false
		}
  }
}

const actions = {
  addMessage({commit}, payload) {
    console.log('addMessage')
    commit('ADD_MESSAGE', payload)
  },
  clearMessage({commit}) {
    commit('CLEAR_MESSAGE')
  }
}

const getters = {
  messages: (state) => {
    return state.messageGroup
  }
}
export default {
	state,
	mutations,
	actions,
	getters
}