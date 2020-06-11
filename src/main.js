import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import vuelidate from './plugins/vuelidate'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  vuelidate,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
