/* eslint no-param-reassign: ["error", { "props": false }] */

import store from '@/store'
import {
  confirmSwal, messageToast,
} from '@/helpers/messageExtensions'
import {
  getRequest,
} from '@/helpers/requestRaw'
import {
  ACTION_DELETE,
  ACTION_REGISTER,
  ACTION_UPDATE,
} from '@/helpers/actionsApi'
import {
  formatDateBySeparator,
} from '@/helpers/date'
import {
  getDataById,
  loadTable,
  sendForm,
} from '@/helpers/manageTables'
import {
  clearStateProductSelected, serverQueryArticlePointSale,
} from '../ServicesProduct/useVariablesProduct'
import {
  statePointSaleDetail,
  listPointSaleDetail,
  urlApiPointSaleDetail,
  titleNotificationPointSaleDetail,
  serverQueryPointSaleDetail,
  clearStatePointSaleDetail,
} from './useVariablesPointSaleDetail'
import {
  searchProductById,
  stateFieldFilterArticle,
  statePointSale,
} from '../ServicesPointSale/useVariablesPointSale'
import {
  sendPointSale,
} from '../ServicesPointSale/useServicesPointSale'

// Función para obtener los datos desde la API y actualizar los valores de listPointSaleDetail
export const loadItemsPointSaleDetail = async (page = null, perPage = null) => {
  const status = await loadTable(serverQueryPointSaleDetail, listPointSaleDetail, urlApiPointSaleDetail, titleNotificationPointSaleDetail, page, perPage)
  return status
}

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable statePointSaleDetail
export const getPointSaleDetailById = async _id => {
  const { data, status } = await getDataById(urlApiPointSaleDetail, _id, titleNotificationPointSaleDetail)
  if (status) {
    statePointSaleDetail.value = { ...statePointSaleDetail.value, ...data }
  }
}

// Función para gestionar un Detalle Punto de Venta
export const sendPointSaleDetail = async (action, _id = null) => {
  statePointSaleDetail.value.idPuntoVenta = statePointSale.value._id
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) statePointSaleDetail.value.loading = true
  const response = await sendForm(statePointSaleDetail, urlApiPointSaleDetail, titleNotificationPointSaleDetail, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) statePointSaleDetail.value.loading = false
  return response
}

// Función para calcular los totales del detalle
export const calculateTotal = () => {
  statePointSale.value.subTotal = 0
  statePointSale.value.total = 0
  listPointSaleDetail.value.rows.forEach(article => {
    statePointSale.value.subTotal += (article.precio * article.cantidad)
    statePointSale.value.total += (article.precio * article.cantidad)
  })
}

export const recoverFocusInputSearchProduct = () => {
  const $inputSearchProduct = document.getElementById('input-search-product')
  setTimeout(() => {
    $inputSearchProduct.focus()
  }, 1)
}

// Función para agregar un articulo a la lista
export const addArticleToList = async newArticle => {
  if (statePointSale.value.idSocio && statePointSale.value.idComprobante && statePointSale.value.idFormaPago && statePointSale.value.idMoneda) {
    if (!listPointSaleDetail.value.rows.length || !statePointSale.value._id) {
      statePointSale.value.accion = ACTION_REGISTER
      statePointSale.value.vencimiento = formatDateBySeparator()
      store.commit('pointSale/ACTIVE_LOADING')
      const { data, status } = await sendPointSale(ACTION_REGISTER)
      store.commit('pointSale/DESACTIVE_LOADING')
      if (!status || !data) return false
      store.commit('pointSale/ACTIVE_LOADING')
      const { data: dataPointSaleDetail, status: statusPointSaleDetail } = await sendPointSaleDetail(ACTION_REGISTER)
      store.commit('pointSale/DESACTIVE_LOADING')
      recoverFocusInputSearchProduct()
      if (!statusPointSaleDetail || !dataPointSaleDetail) return false
      newArticle._id = dataPointSaleDetail.id
      listPointSaleDetail.value.rows = [newArticle]
      clearStatePointSaleDetail()
    } else {
      const articleExists = listPointSaleDetail.value.rows.find(article => article.idArticulo === newArticle.idArticulo)
      if (articleExists) {
        const newListPointSaleDetail = listPointSaleDetail.value.rows.map(article => (
          article.idArticulo === newArticle.idArticulo
            ? { ...article, cantidad: article.cantidad + 1 }
            : article
        ))
        statePointSaleDetail.value = { ...articleExists }
        statePointSaleDetail.value._id = articleExists._id
        statePointSaleDetail.value.cantidad = articleExists.cantidad + 1
        store.commit('pointSale/ACTIVE_LOADING')
        const { data: dataPointSaleDetail, status: statusPointSaleDetail } = await sendPointSaleDetail(ACTION_UPDATE)
        store.commit('pointSale/DESACTIVE_LOADING')
        recoverFocusInputSearchProduct()
        if (!statusPointSaleDetail || !dataPointSaleDetail) return false
        listPointSaleDetail.value.rows = [...newListPointSaleDetail]
        clearStatePointSaleDetail()
      } else {
        store.commit('pointSale/ACTIVE_LOADING')
        const { data: dataPointSaleDetail, status: statusPointSaleDetail } = await sendPointSaleDetail(ACTION_REGISTER)
        store.commit('pointSale/DESACTIVE_LOADING')
        recoverFocusInputSearchProduct()
        if (!statusPointSaleDetail || !dataPointSaleDetail) return false
        newArticle._id = dataPointSaleDetail.id
        listPointSaleDetail.value.rows = [newArticle, ...listPointSaleDetail.value.rows]
        clearStatePointSaleDetail()
      }
    }
    calculateTotal()
    recoverFocusInputSearchProduct()
    return true
  }
  messageToast('warning', 'Punto de Venta', 'Ingresa los campos que se encuentran de color amarillo (Advertencia)')
  return false
}

// Función para actualizar la cantidad de un articulo de lista, recibira como parametro la opracion - +
export const updateQuantity = async (operation, _id, quantity) => {
  const articleExists = listPointSaleDetail.value.rows.find(article => article.idArticulo === _id)
  const articleExistsIndex = listPointSaleDetail.value.rows.findIndex(article => article.idArticulo === _id)
  if (articleExists) {
    statePointSaleDetail.value = { ...articleExists }
    statePointSaleDetail.value._id = articleExists._id
    statePointSaleDetail.value.idArticulo = articleExists.idArticulo
    switch (operation) {
      case '+':
        statePointSaleDetail.value.cantidad = articleExists.cantidad + 1
        break
      case '-':
        statePointSaleDetail.value.cantidad = articleExists.cantidad - 1
        break
      case 'UPDATE':
        statePointSaleDetail.value.cantidad = Number(quantity)
        break
      default:
        statePointSaleDetail.value.cantidad = articleExists.cantidad
        break
    }
    store.commit('pointSale/ACTIVE_LOADING')
    const { status, data } = await sendPointSaleDetail(ACTION_UPDATE)
    store.commit('pointSale/DESACTIVE_LOADING')
    if (!status || !data) return false
    listPointSaleDetail.value.rows.splice(articleExistsIndex, 1, { ...articleExists, cantidad: statePointSaleDetail.value.cantidad })
    clearStatePointSaleDetail()
    calculateTotal()
    return true
  }
  return true
}

// Función para eliminar un articulo de la lista
export const removeArticle = async _id => {
  const result = await confirmSwal('Artículo', null, '¿Desea eliminar el Artículo de la lista?', 'Si, elimínalo')
  if (result) {
    const articleExists = listPointSaleDetail.value.rows.find(article => article.idArticulo === _id)
    const articleExistsIndex = listPointSaleDetail.value.rows.findIndex(article => article.idArticulo === _id)
    store.commit('pointSale/ACTIVE_LOADING')
    const { status, data } = await sendPointSaleDetail(ACTION_DELETE, articleExists._id)
    store.commit('pointSale/DESACTIVE_LOADING')
    if (!status || !data) return false
    listPointSaleDetail.value.rows.splice(articleExistsIndex, 1)
    clearStateProductSelected()
    calculateTotal()
    return true
  }
  calculateTotal()
  return false
}

// Función para buscar un Artículo por un valor
export const searchArticle = async () => {
  if (searchProductById.value.trim().length !== 0) {
    // store.commit('pointSale/CHANGE_LOADING_PRODUCT_LIST', true)
    serverQueryArticlePointSale.value.campofiltro = stateFieldFilterArticle.value
    serverQueryArticlePointSale.value.filtro = searchProductById.value
    store.commit('pointSale/ACTIVE_LOADING')
    const { data, error } = await getRequest('/articulos', 'Buscando Artículo', serverQueryArticlePointSale.value)
    store.commit('pointSale/DESACTIVE_LOADING')
    // store.commit('pointSale/CHANGE_LOADING_PRODUCT_LIST', false)
    if (error || !data) return false
    if (data.length !== 1) {
      return messageToast('warning', 'Artículo Buscado', 'No se encontró ningun artículo')
    }
    searchProductById.value = ''
    const {
      _id,
      nombre,
      imagen,
      precioVenta,
      descuento,
    } = data[0]
    statePointSaleDetail.value.idArticulo = _id
    statePointSaleDetail.value.cantidad = 1
    statePointSaleDetail.value.nombreArticulo = nombre
    statePointSaleDetail.value.imagenArticulo = imagen
    statePointSaleDetail.value.precio = precioVenta
    statePointSaleDetail.value.descuento = descuento
    return addArticleToList(statePointSaleDetail.value)
  }
  messageToast('warning', 'Artículo', 'Debes ingresar un valor para filtrar un Artículo')
  return false
}
