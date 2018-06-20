import Vue from 'vue'
import Vuex from 'vuex'
import dataModule from './data'
import userModule from './user'
import appModule from './app'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    dataModule,
    userModule,
    appModule
  }
})

export default store
