/* eslint-disable import/prefer-default-export */

import store from '@/store'

// Importar funciones y variables necesarias para crear los servicios del mantenimiento Almacén
import { endPointsCombo, loadCombos, resetCombos } from '@/helpers/combos'
import {
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
  urlApiPointSale,
  titleNotificationPointSale,
  clearStatePointSale,
} from './useVariablesPointSale'

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
    const responseCurrency = await getCurrencyLocal()
    if (responseCurrency) {
      store.dispatch('boxSession/login', { ...response, idMoneda: responseCurrency._id })
    } else {
      store.dispatch('boxSession/login', { ...response, idMoneda: 0 })
    }
    setTimeout(() => {
      statePointSale.value.idSesionCaja = store.state.boxSession.boxSession._id
      statePointSale.value.idVendedor = store.state.boxSession.boxSession.idCajero
      statePointSale.value.idMoneda = store.state.boxSession.boxSession.idMoneda
      loadCombos(combosVoucher, ['voucher'], `${endPointsCombo.comprobantePuntoVenta}/1/${store.state.boxSession.boxSession._id}/0`, 'Comprobante')
    }, 10)
  } else {
    messageToast('danger', 'Sesión Caja', 'No tienes una sesión aperturada')
  }
}

export const clearViewPointSale = async () => {
  store.dispatch('boxSession/logout')
  clearStateClient()
  clearStateProductSelected()
  clearStatePointSale()
  clearStatePointSaleDetail()
  clearListPointSaleDetail()
  resetCombos(combosVoucher, ['voucher', 'correlative'])
  verifyBoxSessionActive()
}
