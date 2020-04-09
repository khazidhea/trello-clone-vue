import Vue from 'vue'

import init from '@/init'
import vuetify from '@/plugins/vuetify'

import App from './App.vue'
import router from './router'
import store from './store'
import { CHECK_AUTH } from './store/auth.module/actions.type'

Vue.config.productionTip = false

init()

new Vue({
  router,
  store,

  created () {
    this.$store.dispatch(CHECK_AUTH)
  },

  vuetify,
  render: h => h(App)
}).$mount('#app')
