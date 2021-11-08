<template>
  <div>
    <modal-save-t-article-unit-group />
    <modal-search-t-article-unit-group />
    <modal-show-t-article-unit-group />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportTArticleUnitGroup,
          url: urlApiTArticleUnitGroup,
          serverQuery: serverQueryTArticleUnitGroup,
          columns: columnsTArticleUnitGroup,
          optionsColumnsFilter: columnsFilterTArticleUnitGroup,
        }"
      />
      <table-t-article-unit-group />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import { onMounted } from '@vue/composition-api'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import { endPointsCombo, loadCombos, resetCombos } from '@/helpers/combos'
import ModalSaveTArticleUnitGroup from './ModalSaveTArticleUnitGroup/ModalSaveTArticleUnitGroup.vue'
import ModalSearchTArticleUnitGroup from './ModalSearchTArticleUnitGroup/ModalSearchTArticleUnitGroup.vue'
import ModalShowTArticleUnitGroup from './ModalShowTArticleUnitGroup/ModalShowTArticleUnitGroup.vue'
import TableTArticleUnitGroup from './TableTArticleUnitGroup/TableTArticleUnitGroup.vue'
import {
  MODAL_ID, clearStateTArticleUnitGroup, columnsTArticleUnitGroup, urlApiTArticleUnitGroup, serverQueryTArticleUnitGroup, columnsFilterTArticleUnitGroup, titleReportTArticleUnitGroup, combosTArticleUnitGroup,
} from './ServicesTArticleUnitGroup/useVariablesTArticleUnitGroup'

export default {
  name: 'TArticleUnitGroup',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSaveTArticleUnitGroup,
    ModalSearchTArticleUnitGroup,
    ModalShowTArticleUnitGroup,
    TableTArticleUnitGroup,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateTArticleUnitGroup()
      resetCombos(combosTArticleUnitGroup, ['unitMeasure'])
    }

    onMounted(() => {
      loadCombos(combosTArticleUnitGroup, ['unitGroup'], `${endPointsCombo.grupo}/1`, 'Grupo Unidad')
      loadCombos(combosTArticleUnitGroup, ['packing'], `${endPointsCombo.empaque}/1`, 'Empaque')
      loadCombos(combosTArticleUnitGroup, ['presentation'], `${endPointsCombo.presentacion}/1`, 'Presentación')
    })

    return {
      MODAL_ID,
      clearModal,
      columnsTArticleUnitGroup,
      urlApiTArticleUnitGroup,
      serverQueryTArticleUnitGroup,
      columnsFilterTArticleUnitGroup,
      titleReportTArticleUnitGroup,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
