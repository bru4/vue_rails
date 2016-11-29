import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Index from './components/Index'

Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [
  {path: '/', component: Index}
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app')
