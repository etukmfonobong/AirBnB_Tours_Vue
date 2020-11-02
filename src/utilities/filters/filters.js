import Vue from 'vue'
import moment from "moment";

//filters
Vue.filter('dateStyle', (val) => {
  return moment(val).format('MMMM YYYY') //Made use of moment.js to format date
})

Vue.filter('removeDash', (val) => {
  return val.split('-').join(' ')
})

Vue.filter('extractFirstName', (val => {
  let str = val.split(' ')
  return str[0]
}))

