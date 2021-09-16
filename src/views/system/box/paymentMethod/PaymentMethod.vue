<template>
  <div>
    <modal-save-payment-method />
    <modal-search-payment-method />
    <modal-show-payment-method />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportPaymentMethod,
          url: urlApiPaymentMethod,
          serverQuery: serverQueryPaymentMethod,
          columns: columnsPaymentMethod,
          optionsColumnsFilter: columnsFilterPaymentMethod,
        }"
      />
      <table-payment-method />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import { onMounted } from '@vue/composition-api'
import { endPointsCombo, loadCombos } from '@/helpers/combos'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import ModalSavePaymentMethod from './ModalSavePaymentMethod/ModalSavePaymentMethod.vue'
import ModalSearchPaymentMethod from './ModalSearchPaymentMethod/ModalSearchPaymentMethod.vue'
import ModalShowPaymentMethod from './ModalShowPaymentMethod/ModalShowPaymentMethod.vue'
import TablePaymentMethod from './TablePaymentMethod/TablePaymentMethod.vue'
import {
  MODAL_ID, clearStatePaymentMethod, columnsPaymentMethod, urlApiPaymentMethod, serverQueryPaymentMethod, columnsFilterPaymentMethod, titleReportPaymentMethod, combosPaymentMethod,
} from './ServicesPaymentMethod/useVariablesPaymentMethod'

export default {
  name: 'PaymentMethod',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSavePaymentMethod,
    ModalSearchPaymentMethod,
    ModalShowPaymentMethod,
    TablePaymentMethod,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStatePaymentMethod()
    }

    onMounted(() => {
      loadCombos(combosPaymentMethod, ['paymentMethodSunat'], `${endPointsCombo.medioPagoSunat}/1`, 'Medio de Pago SUNAT')
    })

    return {
      MODAL_ID,
      clearModal,
      columnsPaymentMethod,
      urlApiPaymentMethod,
      serverQueryPaymentMethod,
      columnsFilterPaymentMethod,
      titleReportPaymentMethod,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
