<template>
  <div>
    <modal-save-access />
    <modal-search-access />
    <modal-show-access />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportAccess,
          url: urlApiAccess,
          serverQuery: serverQueryAccess,
          columns: columnsAccess,
          optionsColumnsFilter: columnsFilterAccess,
        }"
      />
      <table-access />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import { onMounted } from '@vue/composition-api'
import { endPointsCombo, loadCombos, resetCombos } from '@/helpers/combos'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import ModalSaveAccess from './ModalSaveAccess/ModalSaveAccess.vue'
import ModalSearchAccess from './ModalSearchAccess/ModalSearchAccess.vue'
import ModalShowAccess from './ModalShowAccess/ModalShowAccess.vue'
import TableAccess from './TableAccess/TableAccess.vue'
import {
  MODAL_ID, titleReportAccess, urlApiAccess, serverQueryAccess, columnsAccess, columnsFilterAccess, combosAccess, clearStateAccess,
} from './ServicesAccess/useVariablesAccess'
import {
  clearStateAccessOptionDetail, clearFiltersAccessOptionDetail, clearDataTableAccessOptionDetail, combosAccessOptionDetail,
} from './ServicesAccessOptionDetail/useVariablesAccessOptionDetail'

export default {
  name: 'Access',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSaveAccess,
    ModalShowAccess,
    ModalSearchAccess,
    TableAccess,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateAccess()
      clearStateAccessOptionDetail()
      clearFiltersAccessOptionDetail()
      clearDataTableAccessOptionDetail()
      resetCombos(combosAccess, ['menu'])
      resetCombos(combosAccessOptionDetail, ['option'])
    }

    onMounted(() => {
      loadCombos(combosAccess, ['role'], `${endPointsCombo.rol}/1`, 'Rol')
      loadCombos(combosAccess, ['module'], `${endPointsCombo.modulo}/1`, 'Módulo')
    })

    return {
      MODAL_ID,
      titleReportAccess,
      urlApiAccess,
      serverQueryAccess,
      columnsAccess,
      columnsFilterAccess,
      clearModal,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
