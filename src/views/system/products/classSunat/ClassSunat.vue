<template>
  <div>
    <modal-search-class-sunat />
    <modal-show-class-sunat />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :option-new="false"
        :export-data="{
          title: titleReportClassSunat,
          url: urlApiClassSunat,
          serverQuery: serverQueryClassSunat,
          columns: columnsClassSunat,
          optionsColumnsFilter: columnsFilterClassSunat,
        }"
      />
      <table-class-sunat />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import ModalSearchClassSunat from './ModalSearchClassSunat/ModalSearchClassSunat.vue'
import ModalShowClassSunat from './ModalShowClassSunat/ModalShowClassSunat.vue'
import TableClassSunat from './TableClassSunat/TableClassSunat.vue'
import {
  MODAL_ID, clearStateClassSunat, columnsClassSunat, urlApiClassSunat, serverQueryClassSunat, columnsFilterClassSunat, titleReportClassSunat,
} from './ServicesClassSunat/useVariablesClassSunat'

export default {
  name: 'ClassSunat',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSearchClassSunat,
    ModalShowClassSunat,
    TableClassSunat,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateClassSunat()
    }

    return {
      MODAL_ID,
      clearModal,
      columnsClassSunat,
      urlApiClassSunat,
      serverQueryClassSunat,
      columnsFilterClassSunat,
      titleReportClassSunat,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
