import apis from '@/libs/axios'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    user: (() => {
      if (localStorage.getItem(process.env.VUE_APP_NAME_VAR_SECURITY_ENCRYPT)) {
        return JSON.parse(atob(localStorage.getItem(process.env.VUE_APP_NAME_VAR_SECURITY_ENCRYPT)))
      }
      return { usuario: null }
    })(),
  },
  mutations: {
    login(state, payload) {
      state.user = payload
      localStorage.setItem(process.env.VUE_APP_NAME_VAR_SECURITY_ENCRYPT, btoa(JSON.stringify(payload)))
      apis.apiSimsac.defaults.headers.common.Authorization = `Bearer ${payload.token}`
    },
    expiredToken(state) {
      localStorage.removeItem(process.env.VUE_APP_NAME_VAR_SECURITY_ENCRYPT)
      state.user = { usuario: null }
      window.location.reload()
    },
    logout(state) {
      localStorage.removeItem(process.env.VUE_APP_NAME_VAR_SECURITY_ENCRYPT)
      state.user = { usuario: null }
      router.push({ name: 'login' })
    },
  },
  actions: {
    login({ commit }, payload) {
      commit('login', payload)
    },
    expiredToken({ commit }) {
      commit('expiredToken')
    },
    logout({ commit }) {
      commit('logout')
    },
  },
}
