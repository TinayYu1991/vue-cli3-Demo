import Vue from 'vue'
import App from './App.vue'
import router from './routers/index'

import './plugins/axios'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
