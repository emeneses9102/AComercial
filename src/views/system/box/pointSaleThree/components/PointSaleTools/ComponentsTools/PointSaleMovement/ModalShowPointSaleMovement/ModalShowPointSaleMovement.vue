<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    size="lg"
    title="Consultar Pagos"
    no-close-on-backdrop
  >
    <detail-table class="mt-1" />

    <template #modal-footer>
      <button-component
        variant="outline-primary"
        icon-button="PowerIcon"
        text-default="Cerrar"
        :method-function="()=>$bvModal.hide(`${MODAL_ID}-show`)"
      />
      <button-component
        variant="primary"
        icon-button="CheckIcon"
        text-default="Ok"
        :method-function="()=>$bvModal.hide(`${MODAL_ID}-show`)"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal,
} from 'bootstrap-vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import DetailTable from './DetailTable.vue'
import {
  titleNotificationPointSale, statePointSale,
} from '../../../../../ServicesPointSale/useVariablesPointSale'
import { MODAL_ID } from '../../../../../ServicesPointSaleMovement/useVariablesPointSaleMovement'

export default {
  name: 'ModalSavePointSaleMovement',
  components: {
    BModal,
    DetailTable,
    ButtonComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationPointSale,
      statePointSale,
    }
  },
}
</script>

<style lang="scss">
#modal-point-sale-movement-show {
  .modal-dialog {
    @media screen and (min-width: 576px) {
      max-width: 700px;
      width: 90%;
    }
  }
  .modal-lg {
    @media screen and (min-width: 992px) {
      max-width: 1000px;
      width: 90%;
    }
  }
}
</style>
