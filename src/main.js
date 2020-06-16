import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import vuelidate from './plugins/vuelidate'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.config.errorHandler = function (err, vm, info) {
  // handle error
  console.log('Vue error handllllller:', err, info)
  const jwtErrors = ['jwt malformed', 'jwt expired', 'jwt not active']
  if (jwtErrors.some(error =>
    err.message.includes(error))) {
    vm.$router.push({
      path: '/login',
      query: { redirect: vm.$route.path }
    })
  }
}

new Vue({
  router,
  vuelidate,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
