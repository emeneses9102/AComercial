const initialBoxSession = {
  _id: 0,
}

export default {
  namespaced: true,
  state: {
    boxSession: (() => {
      if (localStorage.getItem(process.env.VUE_APP_NAME_VAR_BOX_SESSION_ENCRYPT)) {
        return JSON.parse(atob(localStorage.getItem(process.env.VUE_APP_NAME_VAR_BOX_SESSION_ENCRYPT)))
      }
      return { ...initialBoxSession }
    })(),
  },
  mutations: {
    login(state, payload) {
      state.boxSession = payload
      localStorage.setItem(process.env.VUE_APP_NAME_VAR_BOX_SESSION_ENCRYPT, btoa(JSON.stringify(payload)))
    },
    logout(state) {
      localStorage.removeItem(process.env.VUE_APP_NAME_VAR_BOX_SESSION_ENCRYPT)
      state.boxSession = { ...initialBoxSession }
    },
  },
  actions: {
    login({ commit }, payload) {
      commit('login', payload)
    },
    logout({ commit }) {
      commit('logout')
    },
  },
}
