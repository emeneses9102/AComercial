/* eslint-disable import/prefer-default-export */

import store from '@/store'

// Importar funciones y variables necesarias para crear los servicios del mantenimiento Almacén
import { endPointsCombo, loadCombos, resetCombos } from '@/helpers/combos'
import {
  getDataById,
  sendForm,
} from '@/helpers/manageTables'
import { messageToast } from '@/helpers/messageExtensions'
import { combosVoucher } from '../components/PointSaleTools/ComponentsTools/ModalOptionsVoucher/useVariablesVoucher'
import { getBoxSessionByIdCollaborator, getCurrencyLocal } from '../ServicesBoxSession/useServicesBoxSession'
import { clearStateClient } from '../ServicesClient/useVariablesClient'
import { clearListPointSaleDetail, clearStatePointSaleDetail } from '../ServicesPointSaleDetail/useVariablesPointSaleDetail'
import { clearStateProductSelected } from '../ServicesProduct/useVariablesProduct'
import {
  statePointSale,
  keySelectedOfBoard,
  urlApiPointSale,
  titleNotificationPointSale,
  clearStatePointSale,
  tabIndexOptionsTools,
} from './useVariablesPointSale'
import {
  clearListPointSaleTributeSummary,
} from '../ServicesPointSaleTributeSummary/useVariablesPointSaleTributeSummary'

// Función para obtener un recurso por _id desde la Api y almacenarlo en la variable statePointSale
export const getPointSaleById = async _id => {
  const { data, status } = await getDataById(urlApiPointSale, _id, titleNotificationPointSale)
  if (status && data) {
    statePointSale.value.facturado = data.facturado
    statePointSale.value.cerrado = data.cerrado
    statePointSale.value.cancelado = data.cancelado
    statePointSale.value.anulado = data.anulado
    statePointSale.value.subTotal = data.subTotal
    statePointSale.value.total = data.total
    statePointSale.value.totalPagado = data.totalPagado
    statePointSale.value.vuelto = data.vuelto
  }
}

// Función para gestionar un Almacén
export const sendPointSale = async (action, _id = null) => {
  const response = await sendForm(statePointSale, urlApiPointSale, titleNotificationPointSale, action, _id)
  return response
}

const verifyBoxSessionActive = async () => {
  store.commit('pointSale/ACTIVE_LOADING')
  const response = await getBoxSessionByIdCollaborator(store.state.authentication.user.idColaborador)
  store.commit('pointSale/DESACTIVE_LOADING')
  if (response) {
    store.commit('pointSale/ACTIVE_LOADING')
    const responseCurrency = await getCurrencyLocal()
    if (responseCurrency) {
      store.dispatch('boxSession/login', { ...response, idMoneda: responseCurrency._id })
    } else {
      store.dispatch('boxSession/login', { ...response, idMoneda: 0 })
    }
    setTimeout(async () => {
      statePointSale.value.idSesionCaja = store.state.boxSession.boxSession._id
      statePointSale.value.idVendedor = store.state.boxSession.boxSession.idCajero
      statePointSale.value.idMoneda = store.state.boxSession.boxSession.idMoneda
      await loadCombos(combosVoucher, ['voucher'], `${endPointsCombo.comprobantePuntoVenta}/1/${store.state.boxSession.boxSession._id}/0`, 'Comprobante')
      store.commit('pointSale/DESACTIVE_LOADING')
    }, 10)
  } else {
    messageToast('danger', 'Sesión Caja', 'No tienes una sesión aperturada')
  }
}

export const clearViewPointSale = async () => {
  store.dispatch('boxSession/logout')
  store.commit('pointSale/TOGGLE_SHOW_PRODUCT_DETAIL', false)
  if (!store.state.pointSale.showProductDetail) {
    clearStateProductSelected()
    keySelectedOfBoard.value = ''
  }
  tabIndexOptionsTools.value = 0
  clearStateClient()
  clearStateProductSelected()
  clearStatePointSale()
  clearStatePointSaleDetail()
  clearListPointSaleDetail()
  clearListPointSaleTributeSummary()
  resetCombos(combosVoucher, ['voucher', 'correlative'])
  verifyBoxSessionActive()
}
