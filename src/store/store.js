import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { database, firebaseAuth } from '../firebaseConfig';
//import router from '../router'


import auth from './modules/auth'
import messages from './modules/messages'
import products from './modules/products'
import booking from './modules/booking'
import admin from './modules/admin'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    messages,
    products,
    booking,
    admin
  },
  actions: {
    signUserUp ({commit}, payload) {
      
      // create user
      firebaseAuth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(data => {
        
        // save to database
        database.ref('/users' ).child(data.user.uid).set({
          name: payload.name, 
          email: payload.email,
          isAdmin: false
        }).then(() => {
          console.log('user saved')
        }).catch( error => {
          console.log(error)
        })
        commit('CLEAR_MESSAGE')
        // const foo = {
        //   id: data.user.uid,
        //   email: data.user.email,
        // }
        // update user
        data.user.updateProfile({
          displayName: payload.name
        }).then(() => {
          // const newUser = {
          //   ...foo,
          //   name: data.user.displayName
          // }
          console.log(data.user)
          
          }).catch(error => {
          console.log(error)
        })
      })
      .catch(error => {
        commit('ADD_MESSAGE', error)
        console.log(error)
      })
    },

    signUserIn ({commit}, payload) {
      firebaseAuth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(data => {
        console.log(data.user)
      })
      .catch(error => {
        commit('ADD_MESSAGE', error)
      })
    },
    
    logAdminIn({commit}, payload) {
      firebaseAuth().signInWithEmailAndPassword(payload.email, payload.password).then(() => {
        commit('SET_ADMIN', true)
        //router.push('/admin')
      }).catch( error => {
        console.log(error)
      })
    },

    signUserOut () {
      firebaseAuth().signOut().then(() => {
        console.log('signed out')
      })
    },

    loadUserList ({commit}) {
      database.ref('users').once('value').then((data) => {
        const users = []
        const obj = data.val()

        for (let key in obj) {
          users.push({
            id: key, 
            name: obj[key].name,
            email: obj[key].email,
            isAdmin: obj[key].isAdmin
          })
        }

        commit('LOAD_USER_LIST', users)
      //  console.log(users)
      }).catch((error) => {
        console.log(error)
      })

    },
    
    loadProductList ({commit}) {
      database.ref('bikes').once('value').then((data) => {
        const bikes = []
        const obj = data.val()
        for (let key in obj) {
          bikes.push({
            id: key,
            show: obj[key].show,
            title: obj[key].title,
            price: obj[key].price,
            imageUrl: obj[key].imageUrl,
            description: obj[key].description
            //quantity: 12
          })
        }
        commit('UPDATE_PRODUCT_LIST', bikes)
        
       // console.log(bikes)
      }).catch((error) => {
        console.log(error)
      })
    },

    displaySignIn ({commit}, payload) {
      commit('DISPLAY_SIGN_IN', payload)
    },
    displaySignUp ({commit}, payload) {
      commit('DISPLAY_SIGN_UP', payload)
    },
    displayComfirm ({commit}, payload) {
      commit('DISPLAY_COMFIRM', payload)
    },

    loadCountryList ({commit}) {
      axios.get('https://restcountries.eu/rest/v1/all')
      .then(response => {
        commit('LOAD_COUNTRY_LIST', response.data)
        //console.log(response.data)
      })
      .catch(error => {
        console.log(error);
      })
    },

    saveToBookings ({commit}, payload) {
      database.ref('bookings/' + payload.uid).push(payload.booking).then((data) => {
        const key = data.key
        commit('SAVE_TO_BOOKINGS', {
          ...payload.booking, 
          id: key
        })
        console.log(payload.booking)
      }).catch((error) => {
        console.log(error)
      })
    },

    loadBookingList ({commit}, uid) {
      database.ref('bookings/' + uid).once('value').then((data) => {
        const bookings = []
        const obj = data.val()
        for (let key in obj) {
          bookings.push({
            id: key,
            bikeId: obj[key].bikeId,
            quantity: obj[key].quantity,
            dayNumber: obj[key].dayNumber,
            start: obj[key].start,
            end: obj[key].end
          })
        }
        commit('LOAD_BOOKING_LIST', bookings)
        //console.log(bookings)
      }).catch((error) => {
        console.log(error)
      })
    },

    removeBooking({commit}, payload) {
      database.ref('bookings/' + payload.uid).child(payload.id).remove().then(() => {
        commit('REMOVE_BOOKING', payload)
        //console.log(payload.id)
      }).catch(error => {
        console.log(error)
      })
    },

    updateBooking ({commit}, payload) {
      database.ref(`bookings/${payload.uid}`).child(payload.booking.id).update(payload.booking).then(() => {
        commit('UPDATE_BOOKING', payload.booking)
        //console.log(payload.booking)
      }).catch(error => {
        console.log(error)
      })
    },

    saveToTransactions ({commit}, payload) {
      const transaction = {
        booking: payload.booking,
        info: payload.info,
        payment: payload.payment
      }
      database.ref('transactions/' + payload.uid).push(transaction).then((data) => {
        const key = data.key
        commit('SAVE_TRANSACTION', {
          ...transaction, 
          id: key,
        })
      }).catch(error => {
        console.log(error)
      })
    },

    loadTransactionList ({commit}, uid) {
      database.ref(`transactions/${uid}`).once('value').then((data) => {
        const transactions = []
        const obj = data.val()
        for (let key in obj) {
          transactions.push({
            id: key,
            booking: obj[key].booking,
            info: obj[key].info,
            payment: obj[key].payment,
          })
        }
        commit('LOAD_TRANSACTION_LIST', transactions)
        //console.log(transactions)
      }).catch((error) => {
        console.log(error)
      })
    },
  }
})
  
  // mutations: {
  //   setSignedInUser (state, payload) {
  //     state.signedInUser = payload
  //   },
  //   setSignedUpUser (state, payload) {
  //     state.signedUpUser = payload
  //   },
  //   setCreatedAdmin (state, payload) {
  //     state.admins = payload
  //   },
  //   setLoadedBikes (state, payload) {
  //     state.allBikes = payload
  //   },
  //   setCreatedBike (state, payload) {
  //     state.allBikes.push(payload)
  //   },
  //   setEditedBike (state, payload) {
  //     const bike = state.allBikes.find(bike => {
  //       return bike.id === payload.id
  //     })
  //     if (payload.title) {
  //       bike.title = payload.title
  //     }
  //     if (payload.description) {
  //       bike.description = payload.description
  //     }
  //     if (payload.date) {
  //       bike.price = payload.price
  //     }
  //     if (payload.imageUrl) {
  //       bike.imageUrl = payload.imageUrl
  //     }
  //   },
  //   setDeletedBike (state, payload) {
  //     const bike = state.allBikeas.find(bike => {
  //       return bike.id === payload.id
  //     })
  //     bike.show = payload.show
  //   },
  //   setAdmin (state, payload) {
  //     state.admin = payload
  //   },
  //   setError (state, payload) {
  //     state.error = payload.message
  //   },
  //   clearError (state) {
  //     state.error = null
  //   },
  //   // setSuccess (state, payload) {
  //   //   state.success = payload
  //   // }
  // },
  // actions: {
  //   loadBikes({commit}) {
  //     firebase.database().ref('bikes').once('value')
  //       .then((data) => {
  //         const bikes = []
  //         const obj = data.val()
  //         for (let key in obj) {
  //           bikes.push({
  //             id: key,
  //             show: obj[key].show,
  //             title: obj[key].title,
  //             price: obj[key].price,
  //             imageUrl: obj[key].imageUrl,
  //             description: obj[key].description
  //           })
  //         }
  //         commit('setLoadedBikes', bikes)
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //       })
  //   },
  //   createBike ({commit}, payload) {
  //     const bike = {
  //       show: payload.show,
  //       title: payload.title,
  //       price: payload.price,
  //       imageUrl: payload.imageUrl,
  //       description: payload.description
  //     }
  //     firebase.database().ref('bikes').push(bike)
  //     .then((data) => {
  //       const key = data.key
  //       commit('setCreatedBike', {
  //         ...bike,
  //         id: key
  //       })
  //       console.log(bike)
  //     }).catch((error) => {
  //       console.log(error)
  //     })
  //   },
  //   editBike ({commit}, payload) {
  //     const editObj = {}
  //     if(payload.title) {
  //       editObj.title = payload.title
  //     }
  //     if(payload.price) {
  //       editObj.price = payload.price
  //     }
  //     if(payload.imageUrl) {
  //       editObj.imageUrl = payload.imageUrl
  //     }
  //     if(payload.description) {
  //       editObj.description = payload.description
  //     }
  //     firebase.database().ref('bikes').child(payload.id).update(editObj)
  //       .then(() => {
  //         commit('setEditedBike', payload)
  //       })
  //       .catch(error => {
  //         console.log(error)
  //       })
  //   },
  
  //   logAdminIn ({commit}, payload) {
  //     commit('clearError')
  //     firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
  //       .then(admin => {
  //         const newAdmin = {
  //           id: admin.uid
  //         }
  //         commit('setAdmin', newAdmin)
  //       })
  //       .catch(error => {
  //         commit('setError', error)
  //       })
  //   },

  //   logAdminOut ({commit}) {
  //     firebase.auth().signOut()
  //     commit('setAdmin', null)
  //   },
  //   // signUserOut ({commit}) {
  //   //   firebase.auth().signOut()
  //   //   commit('setSignedInUser', null)
  //   //   console.log('signed out')
  //   // },
  //   signUserUp ({commit}, payload) {
  //     commit('clearError')
  //     firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
  //     .then(data => {
  //       const foo = {
  //         id: data.user.uid,
  //         email: data.user.email,
  //         bookings: []
  //       }
  //       console.log(foo)

  //       data.user.updateProfile({
  //         displayName: payload.name
  //       }).then(() => {
  //         const newUser = {
  //           ...foo,
  //           name: data.user.displayName
  //         }
  //         commit('setSignedUpUser', newUser)
  //         console.log(newUser)

  //       }).catch(error => {
  //         console.log(error)
  //       })
  //     })
  //     .catch(error => {
  //       commit('setError', error)
  //       console.log(error)
  //     })
  //   },
  //   signUserIn ({commit}, payload) {
  //     commit('clearError')
  //     firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
  //       .then(data => {
  //         const newUser = {
  //           id: data.user.uid,
  //           email: data.user.email,
  //           name: data.user.displayName,
  //           bookings: []
  //         }
  //         commit('setSignedInUser', newUser)
  //         //console.log(newUser)
  //       })
  //       .catch(error => {
  //         commit('setError', error)
  //       })
  //   },
  //   clearError ({commit}) {
  //     commit('clearError')
  //   },
  //   autoSignIn ({commit}, payload) {
  //     commit('setSignedInUser', {id: payload.uid, email: payload.email, name: payload.displayName, bookings: [] })
  //   },
  // },
  // getters: {
  //   bikeById (state) {
  //     return (bikeId) => {
  //       return state.allBikes.find((bike) => {
  //         return bike.id === bikeId
  //       })
  //     }
  //   },
  //   slicedTours (state) {
  //     return state.allTours.slice(0,3);
  //   },
  //   admin (state) {
  //     return state.admin
  //   },
  //   adminIsAuthenticated (getters) {
  //     return getters.admin !== null && getters.admin !== undefined 
  //   },
  //   userIsAuthenticated (getters) {
  //     return getters.signedInUser !== null && getters.signedInUser !== undefined 
  //   },
  //   error (state) {
  //     return state.error
  //   },
  //   success (state) {
  //     return state.success
  //   },
  //   signedInUser (state) {
  //     return state.signedInUser
  //   },
  //   signedUpUser (state) {
  //     return state.signedUpUser
  //   },
  // }

