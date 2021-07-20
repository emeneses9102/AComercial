<template>
  <div>
    <modal-save-unit-group />
    <modal-search-unit-group />
    <modal-show-unit-group />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportUnitGroup,
          url: urlApiUnitGroup,
          serverQuery: serverQueryUnitGroup,
          columns: columnsUnitGroup,
          optionsColumnsFilter: columnsFilterUnitGroup,
        }"
      />
      <table-unit-group />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import { onMounted } from '@vue/composition-api'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import { endPointsCombo, loadCombos } from '@/helpers/combos'
import ModalSaveUnitGroup from './ModalSaveUnitGroup/ModalSaveUnitGroup.vue'
import ModalSearchUnitGroup from './ModalSearchUnitGroup/ModalSearchUnitGroup.vue'
import ModalShowUnitGroup from './ModalShowUnitGroup/ModalShowUnitGroup.vue'
import TableUnitGroup from './TableUnitGroup/TableUnitGroup.vue'
import {
  MODAL_ID, clearStateUnitGroup, columnsUnitGroup, urlApiUnitGroup, titleNotificationUnitGroup, serverQueryUnitGroup, columnsFilterUnitGroup, titleReportUnitGroup,
} from './ServicesUnitGroup/useVariablesUnitGroup'
import {
  clearStateUnitGroupDetail, clearDataTableUnitGroupDetail, clearFiltersUnitGroupDetail, combosUnitGroupDetail,
} from './ServicesUnitGroupDetail/useVariablesUnitGroupDetail'

export default {
  name: 'UnitGroup',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSaveUnitGroup,
    ModalSearchUnitGroup,
    ModalShowUnitGroup,
    TableUnitGroup,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateUnitGroup()
      clearStateUnitGroupDetail()
      clearFiltersUnitGroupDetail()
      clearDataTableUnitGroupDetail()
    }

    onMounted(() => {
      loadCombos(combosUnitGroupDetail, ['unitMeasure'], `${endPointsCombo.unidadmedida}/1`, 'Unidad de Medida')
    })

    return {
      MODAL_ID,
      clearModal,
      columnsUnitGroup,
      urlApiUnitGroup,
      titleNotificationUnitGroup,
      serverQueryUnitGroup,
      columnsFilterUnitGroup,
      titleReportUnitGroup,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
