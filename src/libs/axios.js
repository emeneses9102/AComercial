import Vue from 'vue'

// Importar axios
import axios from 'axios'

// Crear la instancia de API_SIMSAC
const apiSimsac = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_API_SIMSAC_DEVELOPMENT : process.env.VUE_APP_API_SIMSAC_PRODUCTION,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Añadir $apiSimsac al prototipo de Vue
Vue.prototype.$apiSimsac = apiSimsac

// Crear la instancia de API_PERU
const apiPeru = axios.create({
  baseURL: process.env.VUE_APP_API_PERU,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.VUE_APP_API_PERU_TOKEN}`,
  },
})

// Añadir $apiPeru al prototipo de Vue
Vue.prototype.$apiPeru = apiPeru

export default {
  apiSimsac,
  apiPeru,
}
