export default {
  namespaced: true,
  state: {
    showProductDetail: (() => {
      if (typeof JSON.parse(localStorage.getItem('showProductDetail')) === 'boolean') {
        return JSON.parse(localStorage.getItem('showProductDetail'))
      }
      return true
    })(),
    loadingProductList: false,
  },
  mutations: {
    TOGGLE_SHOW_PRODUCT_DETAIL(state) {
      state.showProductDetail = !state.showProductDetail
      localStorage.setItem('showProductDetail', JSON.stringify(state.showProductDetail))
    },
    CHANGE_LOADING_PRODUCT_LIST(state, payload) {
      state.loadingProductList = payload
    },
  },
}
