// import cookie from '../../assets/js/cookie'
import axios from 'axios'
import store from '../store'
// import router from '../../router'

export default {
  state: {
    token: null,
    accountId: null,
    contactId: null
  },
  getters: {
    getAccountId: state => {
      return state.accountId
    },
    getContactId: state => {
      return state.contactId
    },
    isLoggedIn: state => {
      return state.token !== null
    }
  },
  mutations: {
    login (state, payload) {
      state.token = payload.token
      state.accountId = payload.user.account_id
      state.contactId = payload.user.contact_id
    },
    clearAuthData (state) {
      state.token = null
      state.accountId = false
      state.contactId = false
    }
  },
  actions: {
    login ({commit}, payload) {
      const data = {
        email: payload.email,
        password: payload.password
      }
      return new Promise((resolve, reject) => {
        axios.post('/api/auth/login', data)
          .then(res => {
            const token = res.data.token
            const user = res.data.user
            commit('login', {
              token,
              user
            })
            localStorage.setItem('token', token)
            resolve()
          })
          .catch((err) => {
            reject(err.response)
          })
      })
    },
    signUp ({dispatch}, payload) {
      const data = {
        company: payload.company,
        email: payload.email,
        password: payload.password
      }
      const register = () => {
        return new Promise((resolve, reject) => {
          axios.post('/api/auth/register', data)
          .then((res) => { resolve(res.data) })
          .catch(err => { reject(err) })
        })
      }
      const sendVerifyEmail = () => {
        return new Promise((resolve, reject) => {
          const data = {
            email: payload.email,
            subject: '가입을 축하합니다. 이메일을 인증해주세요.'
          }
          axios.post('/api/mail/signup', data)
            .then(() => { resolve() })
            .catch(err => { reject(err) })
        })
      }
      const login = () => {
        return new Promise((resolve, reject) => {
          dispatch('login', {
            email: payload.email,
            password: payload.password
          })
          .then(() => { resolve() })
          .catch((err) => { reject(err) })
        })
      }
      return new Promise(async (resolve, reject) => {
        try {
          const data = await register()
          await sendVerifyEmail()
          await login()
          resolve(data)
        } catch (err) {
          reject(err)
        }
      })
    },
    logout ({commit}) {
      return new Promise((resolve) => {
        location.reload()
        localStorage.removeItem('token')
        commit('clearAuthData')
        resolve()
      })
    },
    autoLogin () {
      return new Promise((resolve, reject) => {
        checkToken()
          .then(res => {
            Promise.all([
              fetchContactDataById(res.cid),
              fetchAccountDataById(res.id)
            ]).then(result => {
              resolve(result)
            }).catch(err => {
              reject(err.response)
            })
          })
          .catch(err => {
            reject(err.response)
          })
      })
    }
  }
}

function checkToken () {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('token')
    // if (!token) {
    //   reject()
    // }
    const data = {
      headers: { 'x-access-token': token }
    }
    axios.get('/api/auth/check', data)
      .then((res) => {
        const accountId = res.data.info.id
        const contactId = res.data.info.cid
        console.log(res)
        store.commit('login', {
          token,
          user: {
            account_id: accountId,
            contact_id: contactId
          }
        })
        resolve(res.data.info)
      })
      .catch((err) => {
        reject(err.response)
      })
  })
}

function fetchContactDataById (id) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/data/contact/${id}`)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err.response)
      })
  })
}
function fetchAccountDataById (id) {
  return new Promise((resolve, reject) => {
    axios.get(`/api/data/account/${id}`)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err.response)
      })
  })
}
