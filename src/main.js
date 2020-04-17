import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api/'
import './plugins/element.js'
import ydyPlugin from './plugin'
import smartParse from 'vue-smart-parse';
import './assets/style/theme/index.css'


Vue.use(ydyPlugin)
Vue.use(smartParse)

Vue.prototype.$api = api
Vue.config.productionTip = false

//定义总线机制
Vue.prototype.bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
