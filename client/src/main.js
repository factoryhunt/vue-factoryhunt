// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
import Meta from 'vue-meta'

Vue.config.productionTip = false

// axios를 전역에서 사용할 수 있게 해줌
Vue.prototype.$http = axios
Vue.use(Meta)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
