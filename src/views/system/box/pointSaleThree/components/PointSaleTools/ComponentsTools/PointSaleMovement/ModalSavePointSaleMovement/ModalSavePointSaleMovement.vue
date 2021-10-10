<template>
  <b-modal
    :id="MODAL_ID"
    centered
    size="lg"
    title="Agregar Pagos"
    no-close-on-backdrop
  >
    <detail
      class="mt-1"
    />
    <detail-table class="mt-1" />

    <template #modal-footer>
      <button-component
        variant="outline-primary"
        icon-button="PowerIcon"
        text-default="Cerrar"
        :method-function="()=>$bvModal.hide(MODAL_ID)"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal,
} from 'bootstrap-vue'
import { onMounted } from '@vue/composition-api'
import { endPointsCombo, loadCombos } from '@/helpers/combos'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import Detail from './Detail.vue'
import DetailTable from './DetailTable.vue'
import {
  titleNotificationPointSale, statePointSale,
} from '../../../../../ServicesPointSale/useVariablesPointSale'
import { combosPointSaleMovement, MODAL_ID } from '../../../../../ServicesPointSaleMovement/useVariablesPointSaleMovement'

export default {
  name: 'ModalSavePointSaleMovement',
  components: {
    BModal,
    Detail,
    DetailTable,
    ButtonComponent,
  },
  setup() {
    onMounted(() => {
      loadCombos(combosPointSaleMovement, ['currency'], `${endPointsCombo.moneda}/1`, 'Moneda')
      loadCombos(combosPointSaleMovement, ['paymentMethod'], `${endPointsCombo.medioPago}/1`, 'Medio de Pago')
    })
    return {
      MODAL_ID,
      titleNotificationPointSale,
      statePointSale,
    }
  },
}
</script>

<style lang="scss">
#modal-point-sale-movement {
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
