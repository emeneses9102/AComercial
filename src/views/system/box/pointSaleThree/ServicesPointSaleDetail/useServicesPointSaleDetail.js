/* eslint no-param-reassign: ["error", { "props": false }] */

import { ref } from '@vue/composition-api'
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
  tabIndexOptionsTools,
} from '../ServicesPointSale/useVariablesPointSale'
import {
  getPointSaleById,
  sendPointSale,
} from '../ServicesPointSale/useServicesPointSale'
import {
  loadItemsPointSaleTributeSummary,
} from '../ServicesPointSaleTributeSummary/useServicesPointSaleTributeSummary'

// Función para obtener los datos desde la API y actualizar los valores de listPointSaleDetail
export const loadItemsPointSaleDetail = async (page = null, perPage = null) => {
  serverQueryPointSaleDetail.value.indice = statePointSale.value._id
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
  const statePointSaleDetailFinal = ref({
    _id: statePointSaleDetail.value._id,
    idPuntoVenta: statePointSale.value._id,
    idTArticulo: statePointSaleDetail.value.idTArticulo,
    cantidad: statePointSaleDetail.value.cantidad,
    accion: 0,
  })
  statePointSaleDetail.value.idPuntoVenta = statePointSale.value._id
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) statePointSaleDetail.value.loading = true
  const response = await sendForm(statePointSaleDetailFinal, urlApiPointSaleDetail, titleNotificationPointSaleDetail, action, _id)
  if (action === ACTION_REGISTER || action === ACTION_UPDATE) statePointSaleDetail.value.loading = false
  return response
}

// Función para recuperar el foco del campo de texto para buscar un producto
export const recoverFocusInputSearchProduct = () => {
  const $inputSearchProduct = document.getElementById('input-search-product')
  setTimeout(() => {
    $inputSearchProduct.focus()
  }, 1)
}

// Función para agregar un articulo a la lista
export const addArticleToList = async newArticle => {
  if (statePointSale.value.idSocio && statePointSale.value.idComprobante && statePointSale.value.idCorrelativo && statePointSale.value.idFormaPago && statePointSale.value.idMoneda) {
    if (!statePointSale.value._id) {
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
      store.commit('pointSale/ACTIVE_LOADING')
      await Promise.all([
        loadItemsPointSaleDetail(1),
        getPointSaleById(statePointSale.value._id),
        loadItemsPointSaleTributeSummary(1),
      ])
      store.commit('pointSale/DESACTIVE_LOADING')
      clearStatePointSaleDetail()
    } else {
      const articleExists = listPointSaleDetail.value.rows.find(article => article.idTArticulo === newArticle.idTArticulo)
      if (articleExists) {
        statePointSaleDetail.value = { ...articleExists }
        statePointSaleDetail.value._id = articleExists._id
        statePointSaleDetail.value.cantidad = articleExists.cantidad + 1
        store.commit('pointSale/ACTIVE_LOADING')
        const { data: dataPointSaleDetail, status: statusPointSaleDetail } = await sendPointSaleDetail(ACTION_UPDATE)
        store.commit('pointSale/DESACTIVE_LOADING')
        recoverFocusInputSearchProduct()
        if (!statusPointSaleDetail || !dataPointSaleDetail) return false
        store.commit('pointSale/ACTIVE_LOADING')
        await Promise.all([
          loadItemsPointSaleDetail(1),
          getPointSaleById(statePointSale.value._id),
          loadItemsPointSaleTributeSummary(1),
        ])
        store.commit('pointSale/DESACTIVE_LOADING')
        clearStatePointSaleDetail()
      } else {
        store.commit('pointSale/ACTIVE_LOADING')
        const { data: dataPointSaleDetail, status: statusPointSaleDetail } = await sendPointSaleDetail(ACTION_REGISTER)
        store.commit('pointSale/DESACTIVE_LOADING')
        recoverFocusInputSearchProduct()
        if (!statusPointSaleDetail || !dataPointSaleDetail) return false
        store.commit('pointSale/ACTIVE_LOADING')
        await Promise.all([
          loadItemsPointSaleDetail(1),
          getPointSaleById(statePointSale.value._id),
          loadItemsPointSaleTributeSummary(1),
        ])
        store.commit('pointSale/DESACTIVE_LOADING')
        clearStatePointSaleDetail()
      }
    }
    recoverFocusInputSearchProduct()
    tabIndexOptionsTools.value = 1
    return true
  }
  messageToast('warning', 'Punto de Venta', 'Ingresa los campos que se encuentran de color amarillo (Advertencia)')
  return false
}

// Función para actualizar la cantidad de un articulo de lista, recibira como parametro la opracion - +
export const updateQuantity = async (operation, _id, quantity) => {
  const articleExists = listPointSaleDetail.value.rows.find(article => article.idTArticulo === _id)
  if (articleExists) {
    statePointSaleDetail.value = { ...articleExists }
    statePointSaleDetail.value._id = articleExists._id
    statePointSaleDetail.value.idTArticulo = articleExists.idTArticulo
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
    store.commit('pointSale/ACTIVE_LOADING')
    await Promise.all([
      loadItemsPointSaleDetail(1),
      getPointSaleById(statePointSale.value._id),
      loadItemsPointSaleTributeSummary(1),
    ])
    store.commit('pointSale/DESACTIVE_LOADING')
    clearStatePointSaleDetail()
    return true
  }
  return true
}

// Función para eliminar un articulo de la lista
export const removeArticle = async _id => {
  const result = await confirmSwal('Artículo', null, '¿Desea eliminar el Artículo de la lista?', 'Si, elimínalo')
  if (result) {
    const articleExists = listPointSaleDetail.value.rows.find(article => article.idTArticulo === _id)
    store.commit('pointSale/ACTIVE_LOADING')
    const { status, data } = await sendPointSaleDetail(ACTION_DELETE, articleExists._id)
    store.commit('pointSale/DESACTIVE_LOADING')
    if (!status || !data) return false
    store.commit('pointSale/ACTIVE_LOADING')
    await Promise.all([
      loadItemsPointSaleDetail(1),
      getPointSaleById(statePointSale.value._id),
      loadItemsPointSaleTributeSummary(1),
    ])
    store.commit('pointSale/DESACTIVE_LOADING')
    clearStateProductSelected()
    return true
  }
  return false
}

// Función para buscar un Artículo por un valor
export const searchArticle = async () => {
  if (searchProductById.value.trim().length !== 0) {
    serverQueryArticlePointSale.value.campofiltro = stateFieldFilterArticle.value
    serverQueryArticlePointSale.value.filtro = searchProductById.value
    store.commit('pointSale/ACTIVE_LOADING')
    const { data, error } = await getRequest('/tarticulos', 'Buscando Artículo', serverQueryArticlePointSale.value)
    store.commit('pointSale/DESACTIVE_LOADING')
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
    statePointSaleDetail.value.idTArticulo = _id
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
