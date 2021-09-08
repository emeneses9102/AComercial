export default {
  namespaced: true,
  state: {
    showProductDetail: false,
    loadingProductList: false,
  },
  mutations: {
    TOGGLE_SHOW_PRODUCT_DETAIL(state, payload = null) {
      if (payload === null) {
        state.showProductDetail = !state.showProductDetail
      } else {
        state.showProductDetail = payload
      }
    },
    CHANGE_LOADING_PRODUCT_LIST(state, payload) {
      state.loadingProductList = payload
    },
  },
}
