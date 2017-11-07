import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false
  },
  getters: {
    userState: state => {
      return state.isUserLoggedIn
    },
    userData: state => {
      return state.user
    },
    userToken: state => {
      return state.token
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      }
    },
    setUser (state, user) {
      state.user = user
      if (user) {
        state.isUserLoggedIn = true
      }
    },
    setUserState (state, bool) {
      state.isUserLoggedIn = bool
    },
    setInitialState (state) {
      state.token = null
      state.user = null
      state.isUserLoggedIn = false
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    setUserState ({commit}, bool) {
      commit('setUserState', bool)
    },
    setInitialState ({commit}) {
      commit('setInitialState')
    }
  }
})
