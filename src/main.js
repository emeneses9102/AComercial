import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'
import VueExcelXlsx from 'vue-excel-xlsx'

import router from './router'
import store from './store'
import App from './App.vue'

// Importar configuración de validaciones
import '@/helpers/validations'

// Global Components
import './global-components'

// 3rd party plugins
import '@/libs/portal-vue'
import '@/libs/toastification'
import '@/libs/sweet-alerts'
import '@/libs/vue-select'

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)

// Composition API
Vue.use(VueCompositionAPI)

// Excel XLSX
Vue.use(VueExcelXlsx)

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

export default new Vue({
  router,
  store,
  created() {
    const secret = localStorage.getItem(process.env.VUE_APP_NAME_VAR_SECURITY_ENCRYPT) ? JSON.parse(atob(localStorage.getItem(process.env.VUE_APP_NAME_VAR_SECURITY_ENCRYPT))) : null
    if (secret) this.$store.commit('authentication/login', secret)
    this.$apiSimsac.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          if (window.location.pathname !== '/iniciar-sesion') {
            this.$store.dispatch('auth/expiredToken')
          }
        }
        return Promise.reject(error)
      },
    )
  },
  render: h => h(App),
}).$mount('#app')
