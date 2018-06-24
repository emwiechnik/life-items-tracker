import Vue from 'vue'
import VueI18n from 'vue-i18n'
import axios from 'axios'

Vue.use(VueI18n)

const clientSource = axios.create({})

export const i18n = new VueI18n({
  locale: '', // initially do not set it to any locale
  fallbackLocale: 'en'
})

const loadedLanguages = []

function setI18nLanguage (lang) {
  i18n.locale = lang
  document.querySelector('html').setAttribute('lang', lang)
  return lang
}

export function loadLanguageAsync (lang) {
  return new Promise((resolve, reject) => {
    if (i18n.locale !== lang) {
      if (!loadedLanguages.includes(lang)) {
        clientSource.get(`static/lang/${lang}.json`).then(response => {
          let entries = response.data
          i18n.setLocaleMessage(lang, entries)
          loadedLanguages.push(lang)
          resolve(setI18nLanguage(lang))
        }, err => {
          reject(err)
        })
      } else {
        resolve(setI18nLanguage(lang))
      }
      return
    }
    resolve(lang)
  })
}
