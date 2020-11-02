import Vue from 'vue'
import Vuex from 'vuex'
import Autentication from "./Autentication"
import AccountSettings from './AccoutSettings'
import Tour from "./Tour"


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Autentication,
    AccountSettings,
    Tour
  }
})
