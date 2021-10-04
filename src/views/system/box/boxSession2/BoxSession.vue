<template>
  <div>
    <modal-open-box />
    <modal-box-description />
    <modal-save-box-session />
    <modal-search-box-session />
    <modal-show-box-session />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportBoxSession,
          url: urlApiBoxSession,
          serverQuery: serverQueryBoxSession,
          columns: columnsBoxSession,
          optionsColumnsFilter: columnsFilterBoxSession,
        }"
      />
      <table-box-session />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import { onMounted } from '@vue/composition-api'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import {
  endPointsCombo,
  loadCombos,
} from '@/helpers/combos'
import ModalSaveBoxSession from './ModalSaveBoxSession/ModalSaveBoxSession.vue'
import ModalOpenBox from './ModalSaveBoxSession/ModalOpenBox.vue'
import ModalBoxDescription from './ModalSaveBoxSession/ModalBoxDescription.vue'
import ModalSearchBoxSession from './ModalSearchBoxSession/ModalSearchBoxSession.vue'
import ModalShowBoxSession from './ModalShowBoxSession/ModalShowBoxSession.vue'
import TableBoxSession from './TableBoxSession/TableBoxSession.vue'
import {
  MODAL_ID,
  clearStateBoxSession,
  columnsBoxSession,
  urlApiBoxSession,
  titleNotificationBoxSession,
  serverQueryBoxSession,
  columnsFilterBoxSession,
  titleReportBoxSession,
  combosBoxSession,
} from './ServicesBoxSession/useVariablesBoxSession'
import {
  clearStateBoxSessionDetail,
  clearDataTableBoxSessionDetail,
  clearFiltersBoxSessionDetail,
  combosBoxSessionDetail,
} from './ServicesBoxSessionDetail/useVariablesBoxSessionDetail'
import { clearDataTableBoxSessionVoucherDetail } from './ServicesBoxSessionVoucherDetail/useVariablesBoxSessionVoucherDetail'

export default {
  name: 'BoxSession',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSaveBoxSession,
    ModalOpenBox,
    ModalBoxDescription,
    ModalSearchBoxSession,
    ModalShowBoxSession,
    TableBoxSession,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateBoxSession()
      clearStateBoxSessionDetail()
      clearFiltersBoxSessionDetail()
      clearDataTableBoxSessionDetail()
      clearDataTableBoxSessionVoucherDetail()
    }

    onMounted(() => {
      loadCombos(combosBoxSession, ['cashier'], `${endPointsCombo.colaborador}/1`, 'Cajero')
      loadCombos(combosBoxSession, ['storage'], `${endPointsCombo.almacen}/1`, 'Almacen')
      loadCombos(combosBoxSessionDetail, ['paymentMethod'], `${endPointsCombo.medioPago}/1`, 'Medio Pago')
      loadCombos(combosBoxSessionDetail, ['currency'], `${endPointsCombo.moneda}/1`, 'Monedas')
    })

    return {
      MODAL_ID,
      clearModal,
      // openModal,
      columnsBoxSession,
      urlApiBoxSession,
      titleNotificationBoxSession,
      serverQueryBoxSession,
      columnsFilterBoxSession,
      titleReportBoxSession,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
