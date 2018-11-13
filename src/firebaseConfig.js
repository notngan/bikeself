import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAUJmTiKD0erc0DCMFrh2zFHEEnn9Wb35w",
  authDomain: "bikeself.firebaseapp.com",
  databaseURL: "https://bikeself.firebaseio.com",
  projectId: "bikeself",
  storageBucket: "bikeself.appspot.com",
  messagingSenderId: "842147681210"
}
firebase.initializeApp(config);

export function firebaseListener(func) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      func(true, user) 
    } else {
      func(false)
    }
  }, function(error) {
    console.log(error)
  })
}

export const database = firebase.database(); 
export const firebaseAuth = firebase.auth;
