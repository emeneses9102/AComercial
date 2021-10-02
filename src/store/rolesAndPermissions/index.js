// import { endPointsCombo } from '@/helpers/combos'
import options from '@/options'
import navigationVertical from '@/navigation/vertical'
import { getNavigationAndOptions } from '@/helpers/rolesAndPermissions'

// Estado inicial de navigation
const initialStateNavigation = [
  {
    title: 'Inicio',
    icon: 'HomeIcon',
    route: 'home',
  },
]

export default {
  namespaced: true,
  state: {
    navigation: (() => {
      if (localStorage.getItem(process.env.VUE_APP_NAME_VAR_NAVIGATION_ENCRYPT)) {
        return JSON.parse(atob(localStorage.getItem(process.env.VUE_APP_NAME_VAR_NAVIGATION_ENCRYPT)))
      }
      return [...initialStateNavigation]
    })(),
    options: (() => {
      if (process.env.NODE_ENV === 'development') {
        return { ...options }
      }
      if (localStorage.getItem(process.env.VUE_APP_NAME_VAR_OPTIONS_ENCRYPT)) {
        return JSON.parse(atob(localStorage.getItem(process.env.VUE_APP_NAME_VAR_OPTIONS_ENCRYPT)))
      }
      return {}
    })(),
  },
  mutations: {
    INSERT_NAVIGATION(state, payload) {
      state.navigation = [...payload]
      localStorage.setItem(process.env.VUE_APP_NAME_VAR_NAVIGATION_ENCRYPT, btoa(JSON.stringify(state.navigation)))
    },
    CLEAR_NAVIGATION(state) {
      state.navigation = [...initialStateNavigation]
      localStorage.removeItem(process.env.VUE_APP_NAME_VAR_NAVIGATION_ENCRYPT)
    },
    INSERT_OPTIONS(state, payload) {
      state.options = { ...payload }
      localStorage.setItem(process.env.VUE_APP_NAME_VAR_OPTIONS_ENCRYPT, btoa(JSON.stringify(state.options)))
    },
    CLEAR_OPTIONS(state) {
      state.options = {}
      localStorage.removeItem(process.env.VUE_APP_NAME_VAR_OPTIONS_ENCRYPT)
    },
  },
  actions: {
    async insertNavigation({ commit }, payload) {
      let result = false
      // Mode development
      if (process.env.NODE_ENV === 'development') {
        const navigation = [...navigationVertical]
        commit('INSERT_NAVIGATION', navigation)
        commit('INSERT_OPTIONS', options)
        result = true
        // Mode production
      } else {
        const { menuAll, optionsAll } = getNavigationAndOptions(payload)
        const navigation = [...initialStateNavigation, ...menuAll]
        commit('INSERT_NAVIGATION', navigation)
        commit('INSERT_OPTIONS', optionsAll)
        result = true
      }
      return result
    },
  },
}
