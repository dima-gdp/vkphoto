import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Loader from '@/components/Loader.vue'

import 'toastr/build/toastr.min.css'
import messagePlugin from '@/helpers/message.plugin.js'

VK.init({
  apiId: 7809414
})

Vue.use(messagePlugin)
Vue.component('Loader', Loader)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
