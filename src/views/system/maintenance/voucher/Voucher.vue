<template>
  <div>
    <modal-save-voucher />
    <modal-search-voucher />
    <modal-show-voucher />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportVoucher,
          url: urlApiVoucher,
          serverQuery: serverQueryVoucher,
          columns: columnsVoucher,
          optionsColumnsFilter: columnsFilterVoucher,
        }"
      />
      <table-voucher />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import { onMounted } from '@vue/composition-api'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import { endPointsCombo, loadCombos } from '@/helpers/combos'
import ModalSaveVoucher from './ModalSaveVoucher/ModalSaveVoucher.vue'
import ModalSearchVoucher from './ModalSearchVoucher/ModalSearchVoucher.vue'
import ModalShowVoucher from './ModalShowVoucher/ModalShowVoucher.vue'
import TableVoucher from './TableVoucher/TableVoucher.vue'
import {
  MODAL_ID, clearStateVoucher, columnsVoucher, urlApiVoucher, titleNotificationVoucher, serverQueryVoucher, columnsFilterVoucher, titleReportVoucher, combosVoucher,
} from './ServicesVoucher/useVariablesVoucher'
import {
  clearStateVoucherDetailCorrelative, clearDataTableVoucherDetailCorrelative, clearFiltersVoucherDetailCorrelative, combosVoucherDetailCorrelative,
} from './ServicesVoucherDetailCorrelative/useVariablesVoucherDetailCorrelative'

export default {
  name: 'Voucher',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSaveVoucher,
    ModalSearchVoucher,
    ModalShowVoucher,
    TableVoucher,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateVoucher()
      clearStateVoucherDetailCorrelative()
      clearFiltersVoucherDetailCorrelative()
      clearDataTableVoucherDetailCorrelative()
    }

    onMounted(() => {
      loadCombos(combosVoucher, ['voucherSunat'], `${endPointsCombo.comprobanteSunat}/1`, 'Comprobante Sunat')
      loadCombos(combosVoucher, ['operationSunat'], `${endPointsCombo.operacionSunat}/1`, 'Operacion Sunat')
      loadCombos(combosVoucher, ['voucherTypeSunat'], `${endPointsCombo.tipoComprobanteSunat}/1`, 'Tipo Comprobante Sunat')
      loadCombos(combosVoucherDetailCorrelative, ['predios'], `${endPointsCombo.predios}/1`, 'Predio')
    })

    return {
      MODAL_ID,
      clearModal,
      // openModal,
      columnsVoucher,
      urlApiVoucher,
      titleNotificationVoucher,
      serverQueryVoucher,
      columnsFilterVoucher,
      titleReportVoucher,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
