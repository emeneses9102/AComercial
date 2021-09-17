<template>
  <b-card>
    <div class="d-flex justify-content-between">
      <b-card-title>Ticket N°</b-card-title>
      <b-card-title>20315</b-card-title>
    </div>
    <div class="mt-1 text-center pointsale-tools__buttons">
      <modal-options-currency />
      <modal-options-payment-method />
      <modal-description-sale />
      <modal-options-vendor />
      <modal-options-voucher />
      <!-- Botón para Anular Operación -->
      <button-component
        class="cancel"
        variant="danger"
        icon-button="XIcon"
        icon-size="24"
      />
      <!-- Botón para Seleccionar un Cliente -->
      <button-component
        icon-button="UsersIcon"
        icon-size="24"
        :method-function="()=>$bvModal.show('modal-partner')"
      />
      <!-- Botón para Seleccionar Forma de Pago -->
      <button-component
        icon-button="CreditCardIcon"
        icon-size="24"
        :method-function="()=>$bvModal.show('modal-options-payment-method')"
      />
      <!-- Botón para Selecionar Moneda -->
      <button-component
        icon-button="DollarSignIcon"
        icon-size="24"
        :method-function="()=>$bvModal.show('modal-options-currency')"
      />
      <!-- Botón para ingresar la descripción de la Operación -->
      <button-component
        icon-button="EditIcon"
        icon-size="24"
        :method-function="()=>$bvModal.show('modal-description-sale')"
      />
      <!-- Botón para seleccionar un vendedor -->
      <button-component
        icon-button="UserIcon"
        icon-size="24"
        :method-function="()=>$bvModal.show('modal-options-vendor')"
      />
      <!-- Botón para seleccionar un comprobante -->
      <button-component
        icon-button="FileIcon"
        icon-size="24"
        :method-function="()=>$bvModal.show('modal-options-voucher')"
      />
      <!-- Botón para seleccionar una Orden de Pedido -->
      <button-component
        icon-button="ArchiveIcon"
        icon-size="24"
      />
      <!-- Botón para seleccionar una Orden de Servicio -->
      <button-component
        icon-button="TruckIcon"
        icon-size="24"
      />
      <!-- Botón para buscar operaciones -->
      <button-component
        icon-button="FilterIcon"
        icon-size="24"
      />
      <!-- Botón para seleccionar el campo de articulo a filtrar -->
      <button-component
        icon-button="FilterIcon"
        icon-size="24"
        :method-function="()=>$bvModal.show('modal-options-filter-article')"
      />
      <!-- Botón para mostrar u ocultar el detalle articulo -->
      <button-component
        icon-button="EyeIcon"
        icon-size="24"
        :method-function="showProductDetail"
      />
      <!-- Botón para buscar articulos -->
      <button-component
        icon-button="GiftIcon"
        icon-size="24"
        :method-function="()=>$bvModal.show('modal-query-article')"
      />
      <button-component
        class="invoiced"
        text-default="Finalizar"
        icon-button="ShoppingBagIcon"
        icon-size="24"
      />
    </div>
  </b-card>
</template>

<script>
import {
  BCard, BCardTitle,
} from 'bootstrap-vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import store from '@/store'
import {
  clearStateProductSelected,
  keySelectedOfBoard,
} from '../../ServicesPointSale/useVariablesPointSale'
import ModalOptionsCurrency from './ComponentsTools/ModalOptionsCurrency/ModalOptionsCurrency.vue'
import ModalOptionsPaymentMethod from './ComponentsTools/ModalOptionsPaymetMethod/ModalOptionsPaymentMethod.vue'
import ModalDescriptionSale from './ComponentsTools/ModalDescriptionSale/ModalDescriptionSale.vue'
import ModalOptionsVendor from './ComponentsTools/ModalOptionsVendor/ModalOptionsVendor.vue'
import ModalOptionsVoucher from './ComponentsTools/ModalOptionsVoucher/ModalOptionsVoucher.vue'

export default {
  name: 'PointSaleTools',
  components: {
    BCard,
    BCardTitle,
    ModalOptionsCurrency,
    ModalOptionsPaymentMethod,
    ModalDescriptionSale,
    ModalOptionsVendor,
    ModalOptionsVoucher,
    ButtonComponent,
  },
  setup() {
    // Función para mostrar / ocultar la columna del producto detalle
    const showProductDetail = () => {
      store.commit('pointSale/TOGGLE_SHOW_PRODUCT_DETAIL')
      if (!store.state.pointSale.showProductDetail) {
        clearStateProductSelected()
        keySelectedOfBoard.value = ''
      }
    }

    return {
      showProductDetail,
    }
  },
}
</script>
