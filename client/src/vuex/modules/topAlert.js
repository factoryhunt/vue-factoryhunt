// import cookie from '../../assets/js/cookie'
// import router from '../../router'

export default {
  state: {
    alertState: null,
    alertMsg: ''
  },
  getters: {
    getAlertState: state => {
      return state.alertState
    },
    getAlertMsg: state => {
      return state.alertMsg
    }
  },
  mutations: {
    changeAlertState (state, payload) {
      state.alertState = payload.state
      if (state.alertState) {
        state.alertMsg = '<i class="fa fa-check-circle-o" aria-hidden="true"> ' + payload.msg
      } else {
        state.alertMsg = '<i class="fa fa-ban" aria-hidden="true"></i> ' + payload.msg
      }
    }
  }
}
