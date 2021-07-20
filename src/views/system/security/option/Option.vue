<template>
  <div>
    <modal-save-option />
    <modal-search-option />
    <modal-show-option />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportOption,
          url: urlApiOption,
          serverQuery: serverQueryOption,
          columns: columnsOption,
          optionsColumnsFilter: columnsFilterOption,
        }"
      />
      <table-option />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import ModalSaveOption from './ModalSaveOption/ModalSaveOption.vue'
import ModalSearchOption from './ModalSearchOption/ModalSearchOption.vue'
import ModalShowOption from './ModalShowOption/ModalShowOption.vue'
import TableOption from './TableOption/TableOption.vue'
import {
  MODAL_ID, clearStateOption, columnsOption, urlApiOption, serverQueryOption, columnsFilterOption, titleReportOption,
} from './ServicesOption/useVariablesOption'

export default {
  name: 'Option',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSaveOption,
    ModalSearchOption,
    ModalShowOption,
    TableOption,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateOption()
    }

    return {
      MODAL_ID,
      clearModal,
      columnsOption,
      urlApiOption,
      serverQueryOption,
      columnsFilterOption,
      titleReportOption,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
