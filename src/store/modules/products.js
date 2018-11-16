
const state = {
  productList: [
    // {
    // id: '1',
    // show: true,
    // title: 'Wave RSX',
    // price: 12,
    // imageUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/09/fb/35/d2/dirtbike-rental-vietnam.jpg',
    // description: 'This is a very awesome bike which is very awesome.',
    // ///quantity: 2
    // }
  ]
}

const mutations = {
  'UPDATE_PRODUCT_LIST' (state, payload) {
    state.productList = payload
  },
  'SET_CREATED_BIKE' (state, payload) {
    state.productList.push(payload)
  },
  'SET_UPDATED_BIKE' (state, payload) {
    let record = state.productList.find(item => item.id == payload.id)
    Object.assign(record, payload)
    console.log(record)
  }
}

const actions = {

}

const getters = {
  products (state) {
    return state.productList
  },
  
  bikeById (state) {
    return (bikeId) => {
      return state.productList.find((bike) => {
        return bike.id === bikeId
      })
    }
  }
}

export default {
	state,
	mutations,
	actions,
	getters
}