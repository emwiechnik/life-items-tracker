import { SET_ITEMS, SET_AUTHORIZED, SET_CONNECTED } from './mutationTypes'
import dataService from '../services/data.service'

const state = {
  items: [],
  settings: {

  },
  authorized: true,
  connected: true
}

const getters = {
  items: state => state.items,
  settings: state => state.settings,
  authorized: state => state.authorized,
  connected: state => state.connected
}

const actions = {
  init (context, userId) {
    return new Promise((resolve, reject) => {
      dataService.init(userId).then(resolve, reject)
    })
  },
  sync (context) {
    return new Promise((resolve, reject) => {
      dataService.sync().then(resolve, reject)
    })
  },
  loadItems (context) {
    context.commit(SET_AUTHORIZED, true)
    if (dataService.isInitialized() === false) {
      if (context.rootState.userModule.user.authenticated) {
        context.dispatch('init', context.rootState.userModule.user.id).then(() => {
          context.dispatch('sync').then(() => {
            dataService.getItems().then(items => {
              context.commit(SET_ITEMS, items)
            })
          })
        }, err => {
          if (!err.response) {
            context.commit(SET_CONNECTED, false)
          } else if (err.response.status === 401) {
            context.commit(SET_AUTHORIZED, false)
          } else {
            console.log('Failed. Details below.')
            console.log(err)
          }
        })
      }
      return
    }
    dataService.getItems().then(items => {
      context.commit(SET_ITEMS, items)
    })
  },
  addItem (context, newItem) {
    dataService.addItem(newItem).then(() => {
      context.dispatch('loadItems')
    })
  },
  updateItem (context, updatedItem) {
    dataService.updateItem(updatedItem).then(() => {
      context.dispatch('loadItems')
    })
  }
}

const mutations = {
  [SET_ITEMS] (state, items) {
    state.items = items
  },
  [SET_AUTHORIZED] (state, value) {
    state.authorized = value
  },
  [SET_CONNECTED] (state, value) {
    state.connected = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
