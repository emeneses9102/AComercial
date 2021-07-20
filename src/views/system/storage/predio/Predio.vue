<template>
  <div>
    <modal-save-predio />
    <modal-search-predio />
    <modal-show-predio />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportPredio,
          url: urlApiPredio,
          serverQuery: serverQueryPredio,
          columns: columnsPredio,
          optionsColumnsFilter: columnsFilterPredio,
        }"
      />
      <table-predio />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import { onMounted, provide } from '@vue/composition-api'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import { endPointsCombo, loadCombos, resetCombos } from '@/helpers/combos'
import ModalSavePredio from './ModalSavePredio/ModalSavePredio.vue'
import ModalSearchPredio from './ModalSearchPredio/ModalSearchPredio.vue'
import ModalShowPredio from './ModalShowPredio/ModalShowPredio.vue'
import TablePredio from './TablePredio/TablePredio.vue'
import {
  MODAL_ID, clearStatePredio, columnsPredio, urlApiPredio, serverQueryPredio, columnsFilterPredio, titleReportPredio, combosPredio, statePredioUbigeo, clearStatePredioUbigeo,
} from './ServicesPredio/useVariablesPredio'

export default {
  name: 'Predio',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSavePredio,
    ModalSearchPredio,
    ModalShowPredio,
    TablePredio,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStatePredioUbigeo()
      resetCombos(combosPredio, ['province', 'district'])
      clearStatePredio()
    }

    // Proveer variable reactiva al componente <component-ubigeo />
    provide('combosUbigeo', combosPredio)
    provide('ubigeo', statePredioUbigeo)

    onMounted(() => {
      loadCombos(combosPredio, ['departament'], endPointsCombo.departamento, 'Departamento')
    })

    return {
      MODAL_ID,
      clearModal,
      columnsPredio,
      urlApiPredio,
      serverQueryPredio,
      columnsFilterPredio,
      titleReportPredio,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
