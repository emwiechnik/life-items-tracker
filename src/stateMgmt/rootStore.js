import Vue from 'vue'
import Vuex from 'vuex'
import dataModule from './data'
import userModule from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    dataModule,
    userModule
  }
})

export default store
