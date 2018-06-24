import { SET_LOCALE } from './mutationTypes'
import { loadLanguageAsync } from '../services/i18n.setup'

const state = {
  lang: {
    locale: '',
    name: '',
    available: [
      { name: 'English', locale: 'en' },
      { name: 'Polski', locale: 'pl' }
    ]
  }
}

const getters = {
  lang: state => state.lang.locale,
  langName: state => state.lang.name,
  availableLanguages: state => state.lang.available
}

const actions = {
  setDefaultLocale (context) {
    context.dispatch('setLocale', 'en')
  },
  setLocale (context, lang) {
    context.commit(SET_LOCALE, lang)
  }
}

const mutations = {
  [SET_LOCALE] (state, lang) {
    loadLanguageAsync(lang).then(() => {
      state.lang.locale = lang
      state.lang.name = state.lang.available.filter(l => l.locale === lang)[0].name
      console.log('changed the language to: ' + lang)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
