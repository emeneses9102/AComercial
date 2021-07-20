<template>
  <div>
    <modal-save-menu />
    <modal-search-menu />
    <modal-show-menu />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportMenu,
          url: urlApiMenu,
          serverQuery: serverQueryMenu,
          columns: columnsMenu,
          optionsColumnsFilter: columnsFilterMenu,
        }"
      />
      <table-menu />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import { onMounted } from '@vue/composition-api'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import { endPointsCombo, loadCombos } from '@/helpers/combos'
import ModalSaveMenu from './ModalSaveMenu/ModalSaveMenu.vue'
import ModalSearchMenu from './ModalSearchMenu/ModalSearchMenu.vue'
import ModalShowMenu from './ModalShowMenu/ModalShowMenu.vue'
import TableMenu from './TableMenu/TableMenu.vue'
import {
  MODAL_ID, clearStateMenu, columnsMenu, urlApiMenu, titleNotificationMenu, serverQueryMenu, columnsFilterMenu, titleReportMenu, combosMenu,
} from './ServicesMenu/useVariablesMenu'
import {
  clearStateMenuOptionDetail, clearDataTableMenuOptionDetail, clearFiltersMenuOptionDetail, combosMenuOptionDetail,
} from './ServicesMenuOptionDetail/useVariablesMenuOptionDetail'

export default {
  name: 'Menu',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSaveMenu,
    ModalSearchMenu,
    ModalShowMenu,
    TableMenu,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateMenu()
      clearStateMenuOptionDetail()
      clearFiltersMenuOptionDetail()
      clearDataTableMenuOptionDetail()
    }

    onMounted(() => {
      loadCombos(combosMenu, ['module'], `${endPointsCombo.modulo}/1`, 'Módulo')
      loadCombos(combosMenuOptionDetail, ['option'], `${endPointsCombo.opcion}/1`, 'Opción')
    })

    return {
      MODAL_ID,
      clearModal,
      columnsMenu,
      urlApiMenu,
      titleNotificationMenu,
      serverQueryMenu,
      columnsFilterMenu,
      titleReportMenu,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
