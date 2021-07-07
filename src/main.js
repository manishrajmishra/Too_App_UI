import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import '@/plugins/validation'
import {store} from './store/index'
import DateFilter from "./filters/date"
import axios from 'axios'
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false
Vue.filter("date", DateFilter);

window.eventBus = new Vue()

Vue.config.productionTip = false


axios.interceptors.response.use(response => {
  return response
}, err => {
  console.log(err.response)
  if(err.response.status === 401){
    store.dispatch('loggedOut')
  }
  return Promise.reject(err)
})

axios.interceptors.response.use(
  response => {
      return response
  },
  error => {
    if (!error.response) {
      const notification = {
        type:'error',
        message: 'Server Connection Error.'
      }
    store.dispatch('add',notification)
    }
    return Promise.reject(error)
  }
)

store.dispatch('retrieveUser', localStorage.getItem('token')).then(() => {
  new Vue({
    vuetify,
    store,
    router,
    render:h => h(App)
  }).$mount('#app')
})