import Vue from 'vue'
import Vuex from 'vuex'
import dataModule from './data'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    dataModule
  }
})

export default store
