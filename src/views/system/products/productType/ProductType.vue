<template>
  <div>
    <modal-save-product-type />
    <modal-search-product-type />
    <modal-show-product-type />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportProductType,
          url: urlApiProductType,
          serverQuery: serverQueryProductType,
          columns: columnsProductType,
          optionsColumnsFilter: columnsFilterProductType,
        }"
      />
      <table-product-type />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import ModalSaveProductType from './ModalSaveProductType/ModalSaveProductType.vue'
import ModalSearchProductType from './ModalSearchProductType/ModalSearchProductType.vue'
import ModalShowProductType from './ModalShowProductType/ModalShowProductType.vue'
import TableProductType from './TableProductType/TableProductType.vue'
import {
  MODAL_ID, clearStateProductType, columnsProductType, urlApiProductType, serverQueryProductType, columnsFilterProductType, titleReportProductType,
} from './ServicesProductType/useVariablesProductType'

export default {
  name: 'ProductType',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSaveProductType,
    ModalSearchProductType,
    ModalShowProductType,
    TableProductType,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateProductType()
    }

    return {
      MODAL_ID,
      clearModal,
      columnsProductType,
      urlApiProductType,
      serverQueryProductType,
      columnsFilterProductType,
      titleReportProductType,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
