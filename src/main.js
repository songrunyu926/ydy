import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import ydyPlugin from './plugin'
import './assets/style/theme/index.css'

import 'vue-area-linkage/dist/index.css'; // 三级级联样式
import VueAreaLinkage from 'vue-area-linkage';

Vue.use(ydyPlugin)
Vue.use(VueAreaLinkage)

Vue.config.productionTip = false

//定义总线机制
Vue.prototype.bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
