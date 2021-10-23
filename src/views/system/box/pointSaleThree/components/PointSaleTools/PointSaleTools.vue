<template>
  <b-card>
    <div>
      <div class="d-flex justify-content-between align-items-center">
        <h4 class="text-success">
          N° Operación :
        </h4>
        <h4 class="text-success">
          {{ statePointSale._id }}
        </h4>
      </div>
      <div class="d-grid align-items-center mt-1">
        <b-badge
          class="d-flex align-items-center"
          :variant="statePointSale.cerrado ? 'light-success' : 'light-danger'"
        >
          <feather-icon :icon="statePointSale.cerrado ? 'CheckIcon' : 'SlashIcon'" />
          <div
            class="ml-25 pointsale-tools__text-status"
          >
            Cerrado
          </div>
        </b-badge>
        <b-badge
          class="d-flex align-items-center"
          :variant="statePointSale.cancelado ? 'light-success' : 'light-danger'"
        >
          <feather-icon :icon="statePointSale.cancelado ? 'CheckIcon' : 'SlashIcon'" />
          <div
            class="ml-25 pointsale-tools__text-status"
          >
            Pagado
          </div>
        </b-badge>
        <b-badge
          class="d-flex align-items-center"
          :variant="statePointSale.anulado ? 'light-success' : 'light-danger'"
        >
          <feather-icon :icon="statePointSale.anulado ? 'CheckIcon' : 'SlashIcon'" />
          <div
            class="ml-25 pointsale-tools__text-status"
          >
            Anulado
          </div>
        </b-badge>
        <b-badge
          class="d-flex align-items-center"
          :variant="statePointSale.facturado ? 'light-success' : 'light-danger'"
        >
          <feather-icon :icon="statePointSale.facturado ? 'CheckIcon' : 'SlashIcon'" />
          <div
            class="ml-25 pointsale-tools__text-status"
          >
            Facturado
          </div>
        </b-badge>
      </div>
    </div>
    <div class="pointsale-tools__actions">
      <b-tabs
        v-model="tabIndexOptionsTools"
        fill
      >
        <b-tab>
          <template #title>
            <feather-icon icon="ArrowLeftIcon" />
            <span>Opc. Inicio</span>
          </template>
          <div class="text-center pointsale-tools__buttons mt-1">
            <modal-options-currency />
            <modal-options-payment-method />
            <modal-description-sale />
            <modal-options-vendor />
            <modal-options-voucher />
            <modal-save-point-sale-movement />
            <modal-show-point-sale-movement />
            <modal-query-point-sale
              server-query-filtro-fecha="a.fecha"
              :server-query-finicio="`${formatDateBySeparator()}`"
              :server-query-ffin="`${formatDateBySeparator()}`"
              :server-query-opcional="`a.idSesionCaja=${$store.state.boxSession.boxSession._id}`"
              @on-point-sale-selected="pointSaleSelected"
            />
            <modal-payment />
            <modal-point-sale-tribute-detail />

            <!-- Botón para seleccionar un vendedor -->
            <button-component
              :vertical="true"
              text-default="Vendedor"
              :variant="statePointSale.idVendedor ? 'success': 'warning'"
              icon-button="UserIcon"
              icon-size="24"
              :method-function="()=>$bvModal.show('modal-options-vendor')"
              :disabled="!!!boxSession._id || !!statePointSale.cancelado"
            />
            <!-- Botón para Seleccionar Forma de Pago -->
            <button-component
              :vertical="true"
              text-default="Form. Pago"
              :variant="statePointSale.idFormaPago ? 'success' : 'warning'"
              icon-button="CreditCardIcon"
              icon-size="24"
              :method-function="()=>$bvModal.show('modal-options-payment-method')"
              :disabled="!!!boxSession._id || !!statePointSale.cancelado"
            />
            <!-- Botón para Selecionar Moneda -->
            <button-component
              :vertical="true"
              text-default="Moneda"
              :variant="statePointSale.idMoneda ? 'success' : 'warning'"
              icon-button="DollarSignIcon"
              icon-size="24"
              :method-function="()=>$bvModal.show('modal-options-currency')"
              :disabled="!!!boxSession._id || !!statePointSale.cancelado"
            />
            <!-- Botón para ingresar la descripción de la Operación -->
            <button-component
              :vertical="true"
              text-default="Descrip"
              variant="success"
              icon-button="EditIcon"
              icon-size="24"
              :method-function="()=>$bvModal.show('modal-description-sale')"
              :disabled="!!!boxSession._id"
            />
            <!-- Botón para seleccionar un comprobante -->
            <button-component
              :vertical="true"
              text-default="Comprobant."
              :variant="statePointSale.idComprobante ? 'success' : 'warning'"
              icon-button="FileIcon"
              icon-size="24"
              :method-function="()=>$bvModal.show('modal-options-voucher')"
              :disabled="!!!boxSession._id || !!statePointSale.cancelado"
            />
            <!-- Botón para seleccionar si esta despachado o no -->
            <button-component
              :vertical="true"
              text-default="Despachado"
              :variant="statePointSale.despachado ? 'success' : 'secondary'"
              icon-button="ShoppingBagIcon"
              icon-size="24"
              :method-function="()=>dispatchOperation()"
              :disabled="!!!boxSession._id || !!statePointSale.cancelado"
            />
            <!-- Botón para seleccionar una Orden de Pedido -->
            <button-component
              :vertical="true"
              text-default="Pedidos"
              icon-button="ArchiveIcon"
              icon-size="24"
              :disabled="!!!boxSession._id"
            />
            <!-- Botón para seleccionar una Orden de Servicio -->
            <button-component
              :vertical="true"
              text-default="Servicios"
              icon-button="TruckIcon"
              icon-size="24"
              :disabled="!!!boxSession._id"
            />
            <!-- Botón para buscar una operacion -->
            <button-component
              :vertical="true"
              text-default="Operaciones"
              icon-button="CrosshairIcon"
              icon-size="24"
              :method-function="()=>$bvModal.show('modal-query-point-sale')"
              :disabled="!!!boxSession._id"
            />
            <!-- Botón para mostrar u ocultar el detalle articulo -->
            <button-component
              :vertical="true"
              text-default="Teclado"
              icon-button="EyeIcon"
              icon-size="24"
              :method-function="showProductDetail"
              :disabled="!!!boxSession._id"
            />
          </div>
        </b-tab>

        <b-tab>
          <template #title>
            <feather-icon icon="ArrowRightIcon" />
            <span>Opc.Fin</span>
          </template>

          <div class="pointsale-tools__operations">
            <!-- Imprimir un ticket -->
            <button-component
              :vertical="true"
              text-default="Imprimir"
              icon-button="PrinterIcon"
              icon-size="24"
              :method-function="printTicket"
              :disabled="!!!boxSession._id || !!statePointSale.anulado || (!!!statePointSale.cerrado && !!!statePointSale.cancelado)"
            />
            <!-- Botón para Consultar Tributos -->
            <button-component
              :vertical="true"
              text-default="Tributos"
              icon-button="InfoIcon"
              icon-size="24"
              :method-function="()=>$bvModal.show('modal-point-sale-tribute-detail')"
              :disabled="!!!boxSession._id || !!!listPointSaleDetail.rows.length"
            />
            <!-- Botón para Consultar los Pagos -->
            <button-component
              :vertical="true"
              text-default="Pagos"
              icon-button="DollarSignIcon"
              icon-size="18"
              :method-function="()=>openModalPointSaleMovement('SHOW')"
              :disabled="!!!boxSession._id || !!!listPointSaleDetail.rows.length"
            />
            <!-- Limpiar Operación -->
            <button-component
              :vertical="true"
              text-default="Limpiar"
              icon-button="DeleteIcon"
              icon-size="24"
              :method-function="()=>clearViewPointSale()"
              :disabled="!!!boxSession._id"
            />
            <!-- Botón para Pagar Operación -->
            <button-component
              :vertical="true"
              text-default="Pagar"
              icon-button="ShoppingBagIcon"
              icon-size="18"
              :method-function="()=>openModalPointSaleMovement()"
              :disabled="!!!boxSession._id || !!!listPointSaleDetail.rows.length || !!statePointSale.cancelado"
            />
            <!-- Botón para Cerrar Operación -->
            <button-component
              :vertical="true"
              text-default="Cerrar"
              icon-button="ShoppingBagIcon"
              icon-size="18"
              :method-function="()=>closeOperation()"
              :disabled="(!!!boxSession._id || !!!listPointSaleDetail.rows.length || !!statePointSale.cancelado || !!statePointSale.cerrado)"
            />
            <!-- Botón para Facturar Operación -->
            <button-component
              :vertical="true"
              text-default="Facturar"
              icon-button="ShoppingBagIcon"
              icon-size="18"
              :method-function="()=>$bvModal.show('modal-pointsale-payment')"
              :disabled="!!!boxSession._id || !!!listPointSaleDetail.rows.length || !!!statePointSale.cancelado || !!!statePointSale.cerrado"
            />
            <!-- Botón para Anular Operación -->
            <button-component
              :vertical="true"
              variant="danger"
              text-default="Anular"
              icon-button="PowerIcon"
              icon-size="18"
              :disabled="!boxSession._id || !statePointSale._id"
              :method-function="()=>cancelOperation()"
            />
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </b-card>
</template>

<script>
import {
  BCard,
  BBadge,
  BTabs,
  BTab,
} from 'bootstrap-vue'
import { mapState } from 'vuex'
import store from '@/store'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import ModalQueryPointSale from '@/components/ModalQueryPointSale/ModalQueryPointSale.vue'
import {
  ACTION_POINT_SALE_CANCEL,
  ACTION_POINT_SALE_CLOSE,
  ACTION_POINT_SALE_PAY,
  ACTION_REGISTER,
} from '@/helpers/actionsApi'
import { formatDateBySeparator } from '@/helpers/date'
import { getRequest } from '@/helpers/requestRaw'
import { confirmSwal } from '@/helpers/messageExtensions'
import { generateContentTicketHTMLPointSale } from '@/helpers/printPointSale'
import { endPointsCombo, loadCombos, resetCombos } from '@/helpers/combos'
import {
  clearStatePointSale,
  keySelectedOfBoard, statePointSale, tabIndexOptionsTools,
} from '../../ServicesPointSale/useVariablesPointSale'
import {
  clearStateProductSelected,
} from '../../ServicesProduct/useVariablesProduct'
import ModalOptionsCurrency from './ComponentsTools/ModalOptionsCurrency/ModalOptionsCurrency.vue'
import ModalOptionsPaymentMethod from './ComponentsTools/ModalOptionsPaymetMethod/ModalOptionsPaymentMethod.vue'
import ModalDescriptionSale from './ComponentsTools/ModalDescriptionSale/ModalDescriptionSale.vue'
import ModalOptionsVendor from './ComponentsTools/ModalOptionsVendor/ModalOptionsVendor.vue'
import ModalOptionsVoucher from './ComponentsTools/ModalOptionsVoucher/ModalOptionsVoucher.vue'
import ModalPayment from './ComponentsTools/ModalPayment/ModalPayment.vue'
import ModalSavePointSaleMovement from './ComponentsTools/PointSaleMovement/ModalSavePointSaleMovement/ModalSavePointSaleMovement.vue'
import ModalShowPointSaleMovement from './ComponentsTools/PointSaleMovement/ModalShowPointSaleMovement/ModalShowPointSaleMovement.vue'
import ModalPointSaleTributeDetail from './ComponentsTools/ModalPointSaleTributeDetail/ModalPointSaleTributeDetail.vue'
import { clearViewPointSale, getPointSaleById, sendPointSale } from '../../ServicesPointSale/useServicesPointSale'
import {
  clearListPointSaleDetail, clearStatePointSaleDetail, listPointSaleDetail,
} from '../../ServicesPointSaleDetail/useVariablesPointSaleDetail'
import { clearStateClient, stateClient } from '../../ServicesClient/useVariablesClient'
import { combosVoucher } from './ComponentsTools/ModalOptionsVoucher/useVariablesVoucher'
import { clearDataTablePointSaleMovement, clearStatePointSaleMovement, serverQueryPointSaleMovement } from '../../ServicesPointSaleMovement/useVariablesPointSaleMovement'
import { loadItemsPointSaleMovement } from '../../ServicesPointSaleMovement/useServicesPointSaleMovement'
import { listPointSaleTributeSummary } from '../../ServicesPointSaleTributeSummary/useVariablesPointSaleTributeSummary'

export default {
  name: 'PointSaleTools',
  components: {
    BCard,
    BBadge,
    BTabs,
    BTab,
    ModalQueryPointSale,
    ModalOptionsCurrency,
    ModalOptionsPaymentMethod,
    ModalDescriptionSale,
    ModalOptionsVendor,
    ModalOptionsVoucher,
    ModalPayment,
    ModalSavePointSaleMovement,
    ModalShowPointSaleMovement,
    ModalPointSaleTributeDetail,
    ButtonComponent,
  },
  computed: {
    ...mapState('boxSession', ['boxSession']),
  },
  setup(props, context) {
    // Función para mostrar / ocultar la columna del producto detalle
    const showProductDetail = () => {
      store.commit('pointSale/TOGGLE_SHOW_PRODUCT_DETAIL')
      if (!store.state.pointSale.showProductDetail) {
        clearStateProductSelected()
        keySelectedOfBoard.value = ''
      }
    }

    // Verificar si el total de la operacion es igual al monto pagado
    const verifyAmountPayment = () => {
      if (statePointSale.value.totalPagado < statePointSale.value.total) {
        statePointSale.value.accion = ACTION_POINT_SALE_CANCEL
      } else {
        statePointSale.value.accion = ACTION_POINT_SALE_PAY
      }
    }

    const pointSaleSelected = async ({ pointSale, listPointSaleDetail: list, listPointSaleTributeSummary: listTributeSummary }) => {
      store.commit('pointSale/ACTIVE_LOADING')
      statePointSale.value._id = pointSale._id
      statePointSale.value.fecha = formatDateBySeparator(pointSale.fecha, '-')
      statePointSale.value.idSesionCaja = pointSale.idSesionCaja
      statePointSale.value.idVendedor = pointSale.idVendedor
      statePointSale.value.idFormaPago = pointSale.idFormaPago
      statePointSale.value.idComprobante = pointSale.idComprobante
      statePointSale.value.idCorrelativo = pointSale.idCorrelativo
      statePointSale.value.idSocio = pointSale.idSocio
      statePointSale.value.idMoneda = pointSale.idMoneda
      statePointSale.value.vencimiento = formatDateBySeparator(pointSale.vencimiento)
      statePointSale.value.idOrdenPedido = pointSale.idOrdenPedido
      statePointSale.value.idOrdenServicio = pointSale.idOrdenServicio
      statePointSale.value.descripcion = pointSale.descripcion
      statePointSale.value.subTotal = pointSale.subTotal
      statePointSale.value.total = pointSale.total
      statePointSale.value.totalPagado = pointSale.totalPagado
      statePointSale.value.vuelto = pointSale.vuelto
      statePointSale.value.despachado = pointSale.despachado
      statePointSale.value.anulado = pointSale.anulado
      statePointSale.value.facturado = pointSale.facturado
      statePointSale.value.idAnula = pointSale.idAnula
      statePointSale.value.cancelado = pointSale.cancelado
      statePointSale.value.idCancela = pointSale.idCancela
      statePointSale.value.cerrado = pointSale.cerrado
      listPointSaleDetail.value.rows = [...list]
      listPointSaleTributeSummary.value.rows = [...listTributeSummary]
      resetCombos(combosVoucher, ['correlative'])
      loadCombos(combosVoucher, ['correlative'], `${endPointsCombo.correlativoPuntoVenta}/1/${store.state.boxSession.boxSession._id}/${statePointSale.value.idComprobante}`, 'Correlativos')
      const { data, error } = await getRequest(`/socio/?_id=0&tabla=socios&pinicio=1&pfin=1&campo=a.id&indice=${pointSale.idSocio}`)
      store.commit('pointSale/DESACTIVE_LOADING')
      if (error || !data) return false
      stateClient.value._id = data[0]._id
      stateClient.value.nombreDocumento = data[0].nombreDocumento
      stateClient.value.numeroDocumento = data[0].numeroDocumento
      stateClient.value.nombres = data[0].nombres
      stateClient.value.numeroRuc = data[0].numeroRuc
      stateClient.value.razonSocial = data[0].razonSocial
      stateClient.value.nombreUbigeo = data[0].nombreUbigeo
      stateClient.value.direccion = data[0].direccion
      stateClient.value.telefono = data[0].telefono
      stateClient.value.correo = data[0].correo
      return true
    }

    // Función para enviar el operacion
    const sendOperation = async () => {
      verifyAmountPayment()
      store.commit('pointSale/ACTIVE_LOADING')
      const { data, status } = await sendPointSale(ACTION_REGISTER)
      store.commit('pointSale/DESACTIVE_LOADING')
      if (!status || !data) return false
      return true
    }

    const openModalPointSaleMovement = (openModalFor = 'REGISTER') => {
      clearStatePointSaleMovement()
      clearDataTablePointSaleMovement()
      serverQueryPointSaleMovement.value.indice = statePointSale.value._id
      loadItemsPointSaleMovement(1)
      if (openModalFor === 'REGISTER') context.root.$bvModal.show('modal-point-sale-movement')
      else context.root.$bvModal.show('modal-point-sale-movement-show')
    }

    const dispatchOperation = () => {
      statePointSale.value.despachado = statePointSale.value.despachado ? 0 : 1
    }

    const cancelOperation = async () => {
      const result = await confirmSwal('Punto Venta', null, '¿Desea anular la operación?', 'Si, anulalo')
      if (result) {
        store.commit('pointSale/ACTIVE_LOADING')
        const { data, status } = await sendPointSale(ACTION_POINT_SALE_CANCEL)
        store.commit('pointSale/DESACTIVE_LOADING')
        if (!status || !data) return false
        store.commit('pointSale/ACTIVE_LOADING')
        await getPointSaleById(statePointSale.value._id)
        store.commit('pointSale/DESACTIVE_LOADING')
        return true
      }
      return false
    }

    const closeOperation = async () => {
      store.commit('pointSale/ACTIVE_LOADING')
      const { data, status } = await sendPointSale(ACTION_POINT_SALE_CLOSE)
      store.commit('pointSale/DESACTIVE_LOADING')
      if (!status || !data) return false
      store.commit('pointSale/ACTIVE_LOADING')
      await getPointSaleById(statePointSale.value._id)
      store.commit('pointSale/DESACTIVE_LOADING')
      return true
    }

    const printTicket = () => {
      const $iframesExisting = document.querySelectorAll('iframe')
      $iframesExisting.forEach(node => {
        node.remove()
      })
      const $body = document.querySelector('body')
      const $iframe = document.createElement('iframe')
      $iframe.name = 'myIframe'
      $iframe.classList.add('myIframe')
      $iframe.style.display = 'none'
      $iframe.style.width = 0
      $iframe.style.height = 0
      $iframe.style.margin = 0
      $body.append($iframe)
      $iframe.contentWindow.document.documentElement.querySelector('body').innerHTML = generateContentTicketHTMLPointSale(statePointSale.value, listPointSaleDetail.value.rows, stateClient.value, listPointSaleTributeSummary.value.rows)
      window.frames.myIframe.focus()
      window.frames.myIframe.print()
    }

    const clearPointSaleData = () => {
      clearStateClient()
      clearStateProductSelected()
      clearStatePointSale()
      clearStatePointSaleDetail()
      clearListPointSaleDetail()
      resetCombos(combosVoucher, ['correlative'])
      statePointSale.value.idSesionCaja = store.state.boxSession.boxSession._id
      statePointSale.value.idVendedor = store.state.boxSession.boxSession.idCajero
      statePointSale.value.idMoneda = store.state.boxSession.boxSession.idMoneda
    }

    return {
      clearViewPointSale,
      showProductDetail,
      statePointSale,
      sendOperation,
      dispatchOperation,
      cancelOperation,
      closeOperation,
      listPointSaleDetail,
      pointSaleSelected,
      printTicket,
      clearPointSaleData,
      formatDateBySeparator,
      openModalPointSaleMovement,
      tabIndexOptionsTools,
    }
  },
}
</script>

<style lang="scss">
.d-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .5em;

  @media screen and (orientation: portrait) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
}
</style>
