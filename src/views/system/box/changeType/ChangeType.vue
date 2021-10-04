<template>
  <div>
    <modal-save-change-type />
    <modal-search-change-type />
    <modal-show-change-type />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportChangeType,
          url: urlApiChangeType,
          serverQuery: serverQueryChangeType,
          columns: columnsChangeType,
          optionsColumnsFilter: columnsFilterChangeType,
        }"
      />
      <table-change-type />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import { onMounted } from '@vue/composition-api'
import { endPointsCombo, loadCombos } from '@/helpers/combos'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import ModalSaveChangeType from './ModalSaveChangeType/ModalSaveChangeType.vue'
import ModalSearchChangeType from './ModalSearchChangeType/ModalSearchChangeType.vue'
import ModalShowChangeType from './ModalShowChangeType/ModalShowChangeType.vue'
import TableChangeType from './TableChangeType/TableChangeType.vue'
import {
  MODAL_ID, clearStateChangeType, columnsChangeType, urlApiChangeType, serverQueryChangeType, columnsFilterChangeType, titleReportChangeType, combosChangeType,
} from './ServicesChangeType/useVariablesChangeType'

export default {
  name: 'ChangeType',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSaveChangeType,
    ModalSearchChangeType,
    ModalShowChangeType,
    TableChangeType,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateChangeType()
    }

    onMounted(() => {
      loadCombos(combosChangeType, ['currency'], `${endPointsCombo.moneda}/1`, 'Moneda')
    })

    return {
      MODAL_ID,
      clearModal,
      columnsChangeType,
      urlApiChangeType,
      serverQueryChangeType,
      columnsFilterChangeType,
      titleReportChangeType,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
