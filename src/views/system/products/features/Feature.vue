<template>
  <div>
    <modal-save-feature />
    <modal-search-feature />
    <modal-show-feature />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportFeature,
          url: urlApiFeature,
          serverQuery: serverQueryFeature,
          columns: columnsFeature,
          optionsColumnsFilter: columnsFilterFeature,
        }"
      />
      <table-feature />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import ModalSaveFeature from './ModalSaveFeature/ModalSaveFeature.vue'
import ModalSearchFeature from './ModalSearchFeature/ModalSearchFeature.vue'
import ModalShowFeature from './ModalShowFeature/ModalShowFeature.vue'
import TableFeature from './TableFeature/TableFeature.vue'
import {
  MODAL_ID, clearStateFeature, columnsFeature, urlApiFeature, titleNotificationFeature, serverQueryFeature, columnsFilterFeature, titleReportFeature,
} from './ServicesFeature/useVariablesFeature'
import {
  clearStateFeatureDetail, clearDataTableFeatureDetail, clearFiltersFeatureDetail,
} from './ServicesFeatureDetail/useVariablesFeatureDetail'

export default {
  name: 'Feature',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSaveFeature,
    ModalSearchFeature,
    ModalShowFeature,
    TableFeature,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateFeature()
      clearStateFeatureDetail()
      clearFiltersFeatureDetail()
      clearDataTableFeatureDetail()
    }

    return {
      MODAL_ID,
      clearModal,
      columnsFeature,
      urlApiFeature,
      titleNotificationFeature,
      serverQueryFeature,
      columnsFilterFeature,
      titleReportFeature,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
