<template>
  <div>
    <modal-save-payment-form />
    <modal-search-payment-form />
    <modal-show-payment-form />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportPaymentForm,
          url: urlApiPaymentForm,
          serverQuery: serverQueryPaymentForm,
          columns: columnsPaymentForm,
          optionsColumnsFilter: columnsFilterPaymentForm,
        }"
      />
      <table-payment-form />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import ModalSavePaymentForm from './ModalSavePaymentForm/ModalSavePaymentForm.vue'
import ModalSearchPaymentForm from './ModalSearchPaymentForm/ModalSearchPaymentForm.vue'
import ModalShowPaymentForm from './ModalShowPaymentForm/ModalShowPaymentForm.vue'
import TablePaymentForm from './TablePaymentForm/TablePaymentForm.vue'
import {
  MODAL_ID, clearStatePaymentForm, columnsPaymentForm, urlApiPaymentForm, serverQueryPaymentForm, columnsFilterPaymentForm, titleReportPaymentForm,
} from './ServicesPaymentForm/useVariablesPaymentForm'

export default {
  name: 'PaymentForm',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSavePaymentForm,
    ModalSearchPaymentForm,
    ModalShowPaymentForm,
    TablePaymentForm,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStatePaymentForm()
    }

    return {
      MODAL_ID,
      clearModal,
      columnsPaymentForm,
      urlApiPaymentForm,
      serverQueryPaymentForm,
      columnsFilterPaymentForm,
      titleReportPaymentForm,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
