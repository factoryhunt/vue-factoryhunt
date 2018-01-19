// import cookie from '../../assets/js/cookie'
// import router from '../../router'

export default {
  state: {
    alertState: null
  },
  getters: {
    getAlertState: state => {
      return state.alertState
    }
  },
  mutations: {
    changeAlertState (state, payload) {
      state.alertState = payload
    }
  }
}
