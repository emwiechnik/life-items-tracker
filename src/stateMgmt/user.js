import { REFRESH_USER_DETAILS } from './mutationTypes'
import cloudService from '../services/cloud.service'

const state = {
  user: {
    name: '',
    email: '',
    id: '',
    authenticated: false
  }
}

const getters = {
  userName: state => state.user.name,
  userEmail: state => state.user.email,
  userId: state => state.user.id,
  userAuthenticated: state => state.user.authenticated
}

const actions = {
  refresh (context) {
    let user = cloudService.getCurrentUser()
    if (user) {
      context.commit(REFRESH_USER_DETAILS, user)
    }
  },
  loginWithEmailAndPassword (context, { email, password }) {
    return new Promise((resolve, reject) => {
      cloudService.signInWithEmailAndPassword(email, password).then(() => {
        context.dispatch('refresh').then(() => {
          resolve()
        })
      }, err => {
        reject(err)
      })
    })
  },
  loginWithGoogle (context) {
    return new Promise((resolve, reject) => {
      cloudService.signInUsingGoogle().then(() => {
        context.dispatch('refresh').then(() => {
          resolve()
        })
      })
    })
  },
  logout (context) {
    return new Promise((resolve, reject) => {
      cloudService.signOut().then(resolve, reject)
    })
  },
  signUp (context, { email, password }) {
    return new Promise((resolve, reject) => {
      cloudService.signUp(email, password).then(resolve, reject)
    })
  }
}

const mutations = {
  [REFRESH_USER_DETAILS] (state, user) {
    state.user.name = user.name
    state.user.id = user.uid
    state.user.email = user.email
    state.user.authenticated = user.isAuthenticated
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
