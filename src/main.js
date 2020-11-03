import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import vueHeadful from 'vue-headful'
import Vuelidate from "vuelidate"
import VueToast from 'vue-toast-notification'
import Vuesax from 'vuesax'
import '@/utilities/filters/filters'
import VueCookies from 'vue-cookies'


window.axios = require('axios')
//axios setup
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'https://airbnb-tours-api.herokuapp.com/api/v1'
// axios.defaults.baseURL = 'http://localhost:3000/api/v1'
Vue.http.options.credentials = true


//Css imports
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/style.css'
import './assets/css/toast-theme.css'
import './assets/css/custom.css'


Vue.use(VueToast, {
  position: 'top',
  duration: 5000
});

//Vue-headful component setup
Vue.component('vue-headful', vueHeadful)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
//vuesax
Vue.use(Vuesax)
//vue cookies
Vue.use(VueCookies)
//vue toast
Vue.use(VueToast)


//Vuelidate setup
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
