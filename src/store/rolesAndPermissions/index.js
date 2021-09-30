// import { endPointsCombo } from '@/helpers/combos'
import navigationVertical from '@/navigation/vertical'
import { generateNavigation } from '@/helpers/rolesAndPermissions'

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
      if (localStorage.getItem(process.env.VUE_APP_NAME_VAR_PERMISSIONS_ENCRYPT)) {
        return JSON.parse(atob(localStorage.getItem(process.env.VUE_APP_NAME_VAR_PERMISSIONS_ENCRYPT)))
      }
      return [...initialStateNavigation]
    })(),
  },
  mutations: {
    INSERT_NAVIGATION(state, payload) {
      state.navigation = [...payload]
      localStorage.setItem(process.env.VUE_APP_NAME_VAR_PERMISSIONS_ENCRYPT, btoa(JSON.stringify(state.navigation)))
    },
    CLEAR_NAVIGATION(state) {
      state.navigation = [...initialStateNavigation]
      localStorage.removeItem(process.env.VUE_APP_NAME_VAR_PERMISSIONS_ENCRYPT)
    },
  },
  actions: {
    async insertNavigation({ commit }, payload) {
      let result = false
      // Mode development
      if (process.env.NODE_ENV === 'development') {
        const navigation = [...navigationVertical]
        commit('INSERT_NAVIGATION', navigation)
        result = true
        // Mode production
      } else {
        const navigation = [...initialStateNavigation, ...generateNavigation(payload)]
        commit('INSERT_NAVIGATION', navigation)
        result = true
      }
      return result
    },
  },
}
