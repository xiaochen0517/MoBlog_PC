// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Cookies from 'js-cookie'

// use
Vue.use(mavonEditor)

Vue.config.productionTip = false
Vue.use(element)
Vue.prototype.axios = axios
Vue.prototype.$Cookies = Cookies
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://192.168.43.179:8080/moblog/'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data () {
    return {
    }
  },
  router,
  components: { App },
  template: '<App/>'
})
