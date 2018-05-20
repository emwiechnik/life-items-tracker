import { SET_ITEMS } from './mutationTypes'
import dataService from '../services/data.service'

const state = {
  items: [],
  settings: {

  }
}

const getters = {
  items: state => state.items,
  settings: state => state.settings
}

const actions = {
  loadItems (context) {
    dataService.getItems().then(items => {
      context.commit(SET_ITEMS, items)
    })
  },
  addItem (context, newItem) {
    dataService.addItem(newItem).then(() => {
      context.dispatch('loadItems')
    })
  }
}

const mutations = {
  [SET_ITEMS] (state, items) {
    state.items = items
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
