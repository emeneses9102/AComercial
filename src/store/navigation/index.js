import { endPointsCombo } from '@/helpers/combos'
import { getRequest } from '@/helpers/requestRaw'
import navigationVertical from '@/navigation/vertical'

export default {
  namespaced: true,
  state: {
    navigation: (() => {
      if (localStorage.getItem(process.env.VUE_APP_NAME_VAR_SECURITY_ENCRYPT)) {
        
      }
    })(),
  },
  mutations: {
    generateNavigation(state, payload) {

    },
  },
  actions: {
    async generateNavigation({ commit }, payload) {
      let result = false
      if (process.env.NODE_ENV === 'development') {
        const navigation = { ...navigationVertical }
        commit(generateNavigation, navigation)
        result = true
      } else {
        const { error, data } = await getRequest(`${endPointsCombo.permisosPorIdRol}/${payload}`, 'Generación del Menú')
        if (!error) {
          result = false
        } else {
          commit(generateNavigation, data)
          result = true
        }
      }
      return result
    },
  },
}
