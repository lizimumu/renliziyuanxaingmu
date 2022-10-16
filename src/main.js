import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import * as directive from '@/directive'
// 引入暴露出的对象并且注册
import Print from 'vue-print-nb'
Vue.use(Print)
import components from './components/index'
Vue.use(components)
console.log(directive)
Object.keys(directive).forEach(ele => {
  Vue.directive(ele, directive[ele])
})
// Vue.directive('imgerror', imgerror)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()

 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// 注释掉，模拟数据用不到
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
