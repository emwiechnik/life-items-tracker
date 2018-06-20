// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './stateMgmt/rootStore'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import cloudService from './services/cloud.service'
import { i18n } from './services/i18n.setup'

Vue.use(Vuetify)

Vue.config.productionTip = false

cloudService.init().then(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    i18n,
    router,
    store,
    components: { App },
    template: '<App/>'
  })
})
