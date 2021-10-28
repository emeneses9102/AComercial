<template>
  <b-modal
    :id="MODAL_ID"
    centered
    size="lg"
    title="Agregar Pagos"
    no-close-on-backdrop
    @show="showModal"
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
      <button-component
        variant="primary"
        icon-button="DollarSignIcon"
        text-default="Pagar"
        :loading="statePointSale.loading"
        :method-function="()=>finishedOperation()"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal,
} from 'bootstrap-vue'
import store from '@/store'
import { onMounted } from '@vue/composition-api'
import { endPointsCombo, loadCombos } from '@/helpers/combos'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { messageToast } from '@/helpers/messageExtensions'
import { ACTION_POINT_SALE_PAY } from '@/helpers/actionsApi'
import Detail from './Detail.vue'
import DetailTable from './DetailTable.vue'
import {
  titleNotificationPointSale, statePointSale,
} from '../../../../../ServicesPointSale/useVariablesPointSale'
import {
  getPointSaleById,
  sendPointSale,
} from '../../../../../ServicesPointSale/useServicesPointSale'
import {
  combosPointSaleMovement, dataTablePointSaleMovement, MODAL_ID, statePointSaleMovement,
} from '../../../../../ServicesPointSaleMovement/useVariablesPointSaleMovement'

export default {
  name: 'ModalSavePointSaleMovement',
  components: {
    BModal,
    Detail,
    DetailTable,
    ButtonComponent,
  },
  setup(props, context) {
    onMounted(() => {
      loadCombos(combosPointSaleMovement, ['currency'], `${endPointsCombo.moneda}/1`, 'Moneda')
      loadCombos(combosPointSaleMovement, ['paymentMethod'], `${endPointsCombo.medioPago}/1`, 'Medio de Pago')
    })

    const showModal = () => {
      statePointSaleMovement.value.idMoneda = statePointSale.value.idMoneda
      console.log(store.state.boxSession.boxSession)
      statePointSaleMovement.value.idMedioPago = store.state.boxSession?.boxSession?.idMedioPago || 0
    }

    const finishedOperation = async () => {
      if (!dataTablePointSaleMovement.value.rows.length) {
        messageToast('warning', 'Punto de Venta', 'La tabla esta vacía')
        return true
      }
      statePointSale.value.loading = true
      store.commit('pointSale/ACTIVE_LOADING')
      const { data, status } = await sendPointSale(ACTION_POINT_SALE_PAY)
      store.commit('pointSale/DESACTIVE_LOADING')
      statePointSale.value.loading = false
      if (!status || !data) return false
      statePointSale.value.loading = true
      context.root.$bvModal.hide('modal-point-sale-movement')
      store.commit('pointSale/ACTIVE_LOADING')
      await getPointSaleById(statePointSale.value._id)
      store.commit('pointSale/DESACTIVE_LOADING')
      statePointSale.value.loading = false
      return true
    }

    return {
      MODAL_ID,
      titleNotificationPointSale,
      statePointSale,
      finishedOperation,
      showModal,
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
