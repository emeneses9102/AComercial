export default {
  namespaced: true,
  state: {
    pointSale: {
      _id: 0,
    },
    pointSaleDetail: [],
    showProductDetail: false,
    loadingProductList: false,
    loading: false,
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
    ACTIVE_LOADING(state) {
      state.loading = true
    },
    DESACTIVE_LOADING(state) {
      state.loading = false
    },
    UPDATE_POINT_SALE(state, payload) {
      state.pointSale = payload
    },
    UPDATE_POINT_SALE_DETAIL(state, payload) {
      state.pointSaleDetail = [...payload]
    },
    CLEAR_POINT_SALE(state) {
      state.pointSale = { _id: 0 }
    },
    CLEAR_POINT_SALE_DETAIL(state) {
      state.pointSaleDetail = []
    },
  },
}
