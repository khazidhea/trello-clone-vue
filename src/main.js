import Vue from 'vue'

import init from '@/init'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

init()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
