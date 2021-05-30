import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: 'rus',
    contacts : null,
    portfolio: null,
    news: null,
    services: null,
    about: null,
    name: {
      rus:{
        name: 'САМСОН',
        dev: 'Умные инженерные решения'
      },
      eng: {
        name: 'SAMSON',
        dev: 'Smart ingeneering solutions'
      }
    }
  },
  mutations: {
    setContacts(state, it){
      state.contacts = it
    },
    setPortfolio(state, it){
      state.portfolio = it
    },
    setNews(state, it){
      state.news = it
    },
    setServices(state, it){
      state.services = it
    },
    setAbout(state, it){
      state.about = it
    },
    setLang(state, it){
      state.lang = it
    },
  },
  actions: {
    setAbout ({commit}, it){
      commit('setAbout', it)
    }
  },
  modules: {
  }
})
