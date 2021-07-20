<template>
  <div>
    <modal-save-module />
    <modal-search-module />
    <modal-show-module />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportModule,
          url: urlApiModule,
          serverQuery: serverQueryModule,
          columns: columnsModule,
          optionsColumnsFilter: columnsFilterModule,
        }"
      />
      <table-module />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import { onMounted } from '@vue/composition-api'
import { endPointsCombo, loadCombos } from '@/helpers/combos'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import ModalSaveModule from './ModalSaveModule/ModalSaveModule.vue'
import ModalSearchModule from './ModalSearchModule/ModalSearchModule.vue'
import ModalShowModule from './ModalShowModule/ModalShowModule.vue'
import TableModule from './TableModule/TableModule.vue'
import {
  MODAL_ID, clearStateModule, columnsModule, urlApiModule, serverQueryModule, columnsFilterModule, titleReportModule, combosModule,
} from './ServicesModule/useVariablesModule'

export default {
  name: 'Module',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSaveModule,
    ModalSearchModule,
    ModalShowModule,
    TableModule,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateModule()
    }

    onMounted(() => {
      loadCombos(combosModule, ['module'], `${endPointsCombo.modulo}/1`, 'Módulo')
    })

    return {
      MODAL_ID,
      clearModal,
      columnsModule,
      urlApiModule,
      serverQueryModule,
      columnsFilterModule,
      titleReportModule,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
