// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/*eslint-disable */
import 'es6-promise/auto'

import Vue from 'vue'
import App from './App'
import router from './router'
import { sync } from 'vuex-router-sync'

import Meta from 'vue-meta'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import axios from 'axios'
import scrollReveal from 'scrollreveal'
import store from './vuex/store'

// Global variable setting up received CDN (axios, jQuery, Google ..)
Vue.config.productionTip = false
Vue.prototype.$http = axios
window.scrollReveal = scrollReveal()
Vue.use(Meta)
Vue.component('icon', Icon)

// Vuex
sync(store, router)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

/*eslint-enable */
