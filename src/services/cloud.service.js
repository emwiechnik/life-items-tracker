// import firebase from 'firebase'
import * as firebase from 'firebase/app'
import 'firebase/auth'

// todo: consider moving the whole service into TypeScript, so that you can make use of strong typing and nicely implemented polymorphism

// Firebase configuration
let config = {
  apiKey: 'AIzaSyB9zjooxD0njIrxFeM2Arn30tJ5BDNt8o4',
  authDomain: 'myfirstfirebaseproject-d7d27.firebaseapp.com',
  databaseURL: 'https://myfirstfirebaseproject-d7d27.firebaseio.com',
  projectId: 'myfirstfirebaseproject-d7d27',
  storageBucket: 'myfirstfirebaseproject-d7d27.appspot.com',
  messagingSenderId: '400499969549'
}

// Models
class AuthenticatedUser {
  constructor (uid, name, fullName, email, avatarUrl) {
    this.uid = uid
    this.name = name
    this.fullName = fullName
    this.email = email
    this.avatarUrl = avatarUrl
    this.isAuthenticated = true
  }
}

class UnauthenticatedUser {
  constructor () {
    this.isAuthenticated = false
  }
}

// Utility methods
function generateUserNameFromEmail (email) {
  let preprocessed = email.replace(/[@]/g, '_')
  let userName = preprocessed.replace(/[^a-zA-Z0-9_.-]/g, '')
  return userName
}

// The actual service that handles Firebase calls
const cloudService = {
  init () {
    firebase.initializeApp(config)

    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(resolve, reject)
    })
  },
  signInWithEmailAndPassword (email, password) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        resolve()
      }, err => {
        reject(err)
      })
    })
  },
  signInUsingGoogle () {
    return new Promise((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider).then(user => {
        resolve()
      }, err => {
        reject(err)
      })
    })
  },
  signOut () {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut().then(() => {
        resolve()
      }, err => {
        reject(err)
      })
    })
  },
  getCurrentUser () {
    let user = firebase.auth().currentUser

    if (user) {
      let userName = generateUserNameFromEmail(user.email)
      return new AuthenticatedUser(user.uid, userName, user.displayName, user.email, user.photoURL)
    }

    return new UnauthenticatedUser()
  }
}

export default cloudService
