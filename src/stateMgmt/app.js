import { SET_LOCALE } from './mutationTypes'
import { loadLanguageAsync } from '../services/i18n.setup'

const actions = {
  setLocale (context, lang) {
    context.commit(SET_LOCALE, lang)
  }
}

const mutations = {
  [SET_LOCALE] (state, lang) {
    loadLanguageAsync(lang).then(() => {
      console.log('changed the language to: ' + lang)
    })
  }
}

export default {
  namespaced: true,
  actions,
  mutations
}
