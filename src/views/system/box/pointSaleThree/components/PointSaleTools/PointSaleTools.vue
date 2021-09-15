<template>
  <b-card>
    <div class="d-flex justify-content-between">
      <b-card-title>Ticket N°</b-card-title>
      <b-card-title>20315</b-card-title>
    </div>
    <div class="mt-3 text-center pointsale-tools__buttons">
      <button-component
        icon-button="AwardIcon"
        icon-size="24"
      />
      <button-component
        icon-button="CoffeeIcon"
        icon-size="24"
      />
      <button-component
        icon-button="DivideSquareIcon"
        icon-size="24"
      />
      <button-component
        icon-button="KeyIcon"
        icon-size="24"
      />
      <button-component
        icon-button="GiftIcon"
        icon-size="24"
      />
      <button-component
        icon-button="MonitorIcon"
        icon-size="24"
      />
      <button-component
        icon-button="PrinterIcon"
        icon-size="24"
      />
      <button-component
        icon-button="ThermometerIcon"
        icon-size="24"
      />
      <button-component
        icon-button="ShoppingCartIcon"
        icon-size="24"
      />
      <!-- <button-component
        icon-button="StarIcon"
        icon-size="24"
      />
      <button-component
        icon-button="ToolIcon"
        icon-size="24"
      />
      <button-component
        icon-button="AirplayIcon"
        icon-size="24"
      /> -->
      <button-component
        icon-button="FilterIcon"
        icon-size="24"
        :method-function="()=>$bvModal.show('modal-options-filter-article')"
      />
      <button-component
        icon-button="EyeIcon"
        icon-size="24"
        :method-function="showProductDetail"
      />
      <button-component
        icon-button="GridIcon"
        icon-size="24"
        :method-function="()=>$bvModal.show('modal-query-article')"
      />
      <button-component
        class="invoiced"
        text-default="Facturar"
        icon-button="CreditCardIcon"
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
  clearStateProductSelected, keySelectedOfBoard,
} from '../../ServicesPointSale/useVariablesPointSale'

export default {
  name: 'PointSaleTools',
  components: {
    BCard,
    BCardTitle,
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
