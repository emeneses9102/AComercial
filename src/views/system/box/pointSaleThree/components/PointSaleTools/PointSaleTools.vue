<template>
  <b-card>
    <div class="d-flex justify-content-between">
      <b-card-title>Ticket N°</b-card-title>
      <b-card-title>20315</b-card-title>
    </div>
    <div class="mt-3 text-center">
      <button-component
        icon-button="AirplayIcon"
        icon-size="32"
      />
      <button-component
        icon-button="AirplayIcon"
        icon-size="32"
      />
      <button-component
        icon-button="AirplayIcon"
        icon-size="32"
      />
      <button-component
        icon-button="AirplayIcon"
        icon-size="32"
      />
      <button-component
        icon-button="AirplayIcon"
        icon-size="32"
      />
      <button-component
        icon-button="AirplayIcon"
        icon-size="32"
      />
      <button-component
        icon-button="AirplayIcon"
        icon-size="32"
      />
      <button-component
        icon-button="AirplayIcon"
        icon-size="32"
      />
      <button-component
        icon-button="AirplayIcon"
        icon-size="32"
      />
      <button-component
        icon-button="AirplayIcon"
        icon-size="32"
      />
      <button-component
        icon-button="AirplayIcon"
        icon-size="32"
      />
      <button-component
        icon-button="AirplayIcon"
        icon-size="32"
      />
      <button-component
        icon-button="FilterIcon"
        icon-size="32"
        :method-function="()=>$bvModal.show('modal-options-filter-article')"
      />
      <button-component
        icon-button="EyeIcon"
        icon-size="32"
        :method-function="showProductDetail"
      />
      <button-component
        icon-button="GridIcon"
        icon-size="32"
        :method-function="()=>$bvModal.show('modal-query-article')"
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
