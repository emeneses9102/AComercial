<template>
  <div>
    <modal-save-storage-type />
    <modal-search-storage-type />
    <modal-show-storage-type />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportStorageType,
          url: urlApiStorageType,
          serverQuery: serverQueryStorageType,
          columns: columnsStorageType,
          optionsColumnsFilter: columnsFilterStorageType,
        }"
      />
      <table-storage-type />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import ModalSaveStorageType from './ModalSaveStorageType/ModalSaveStorageType.vue'
import ModalSearchStorageType from './ModalSearchStorageType/ModalSearchStorageType.vue'
import ModalShowStorageType from './ModalShowStorageType/ModalShowStorageType.vue'
import TableStorageType from './TableStorageType/TableStorageType.vue'
import {
  MODAL_ID, clearStateStorageType, columnsStorageType, urlApiStorageType, serverQueryStorageType, columnsFilterStorageType, titleReportStorageType,
} from './ServicesStorageType/useVariablesStorageType'

export default {
  name: 'StorageType',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSaveStorageType,
    ModalSearchStorageType,
    ModalShowStorageType,
    TableStorageType,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateStorageType()
    }

    return {
      MODAL_ID,
      clearModal,
      columnsStorageType,
      urlApiStorageType,
      serverQueryStorageType,
      columnsFilterStorageType,
      titleReportStorageType,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
