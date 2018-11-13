import router from '../../router'

const state = {
  bookingList: [
    // {
    //   id: 'skjks',
    //   bikeId: '1',
    //   quantity: 1,
    //   dayNumber: 2,
    //   start: {
    //     date:'2018-11-22',
    //     time: '6:30',
    //     location: 'Hue',
    //     address: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    //   },
    //   end: { 
    //     date:'2018-11-24',
    //     time: '7:30',
    //     location: 'Da Nang',
    //     address: 'Lorem ipsum dolor sit amet, consectetur'
    //   }
    // }
  ],
  transactionList: [],
}

const mutations = {
  'SAVE_TO_BOOKINGS' (state, payload) {
    state.bookingList.push(payload)
  },
  'LOAD_BOOKING_LIST' (state, payload) {
    state.bookingList = payload
  },
  'REMOVE_BOOKING' (state, payload) {
    const record = state.bookingList.find(item => item.id == payload.id)
    state.bookingList.splice(state.bookingList.indexOf(record), 1)
    console.log('booking removed')
  },
  'UPDATE_BOOKING' (state, payload) {
    var record = state.bookingList.find(item => item.id == payload.id)
    console.log('updated', record)
  },
  'SAVE_TRANSACTION' (state, payload) {
    state.transactionList.push(payload)
    console.log('transaction saved')
    router.push('/checkout/comfirm/' + payload.id)
  },

  'LOAD_TRANSACTION_LIST' (state, payload) {
    state.transactionList = payload
    console.log('transactions loaded')
  }
}

const actions = {

}

const getters = {
  bookings (state) {
    return state.bookingList
  },

  transactions (state) {
    return state.transactionList
  },

  bookingById (state) {
    return (id) => {
      return state.bookingList.find((booking) => {
        return booking.id === id
      })
    }
  },
  transactionById (state) {
    return (id) => {
      return state.transactionList.find((transaction) => {
        return transaction.id === id
      })
    }
  },
  
  isLoading (state) {
    return state.loading
  }
}

export default {
  state, 
  mutations, 
  actions,
  getters
}