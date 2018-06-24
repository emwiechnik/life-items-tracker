import { SET_ITEMS, SET_AUTHORIZED, SET_CONNECTED, SET_VIEW_MODE } from './mutationTypes'
import dataService from '../services/data.service'

const state = {
  items: [],
  viewMode: { upcoming: true, past: false },
  settings: {
  },
  authorized: true,
  connected: true
}

const sortItemsBy = 'dueDate'

const sortPredicates = (function () {
  return {
    dueDate: function (a, b) {
      return new Date(a.date) - new Date(b.date)
    }
  }
})()

const getters = {
  items: state => state.items,
  itemsViewMode: state => state.viewMode,
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
      context.dispatch('sync')
    })
  },
  updateItem (context, updatedItem) {
    dataService.updateItem(updatedItem).then(() => {
      // context.dispatch('loadItems')
      context.dispatch('sync')
    })
  },
  loadUpcomingItems (context) {
    if (context.rootState.dataModule.viewMode.upcoming) {
      return
    }
    context.commit(SET_VIEW_MODE, { upcoming: true })
    context.dispatch('loadItems')
  },
  loadPastItems (context) {
    if (context.rootState.dataModule.viewMode.past) {
      return
    }
    context.commit(SET_VIEW_MODE, { past: true })
    context.dispatch('loadItems')
  }
}

const mutations = {
  [SET_ITEMS] (state, items) {
    const filterPredicate = function (mode) {
      if (mode.upcoming) {
        return function (pred) {
          return new Date(pred.date) > Date.now()
        }
      } else {
        return function (pred) {
          return new Date(pred.date) < Date.now()
        }
      }
    }

    items = items.filter(filterPredicate(state.viewMode))
    items = items.sort(sortPredicates[sortItemsBy])
    state.items = items
  },
  [SET_AUTHORIZED] (state, value) {
    state.authorized = value
  },
  [SET_CONNECTED] (state, value) {
    state.connected = value
  },
  [SET_VIEW_MODE] (state, value) {
    state.viewMode = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
