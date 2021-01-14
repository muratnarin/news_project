import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import './assets/scss/custom.scss'

import axios from '@/plugins/axios.js'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  beforeCreate() {
    this.$store.commit('syncStore')
  },
  render: h => h(App)
}).$mount('#app')
