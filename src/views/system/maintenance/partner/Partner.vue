<template>
  <div>
    <modal-save-partner />
    <modal-search-partner />
    <modal-show-partner />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportPartner,
          url: urlApiPartner,
          serverQuery: serverQueryPartner,
          columns: columnsPartner,
          optionsColumnsFilter: columnsFilterPartner,
        }"
      />
      <table-partner />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import ModalSavePartner from './ModalSavePartner/ModalSavePartner.vue'
import ModalSearchPartner from './ModalSearchPartner/ModalSearchPartner.vue'
import ModalShowPartner from './ModalShowPartner/ModalShowPartner.vue'
import TablePartner from './TablePartner/TablePartner.vue'
import {
  MODAL_ID, clearStatePartner, columnsPartner, urlApiPartner, serverQueryPartner, columnsFilterPartner, titleReportPartner, clearCombosPartnerUbigeo, clearStatePartnerUbigeo,
} from './ServicesPartner/useVariablesPartner'

export default {
  name: 'Partner',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSavePartner,
    ModalSearchPartner,
    ModalShowPartner,
    TablePartner,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStatePartnerUbigeo()
      clearCombosPartnerUbigeo()
      clearStatePartner()
    }

    return {
      MODAL_ID,
      clearModal,
      columnsPartner,
      urlApiPartner,
      serverQueryPartner,
      columnsFilterPartner,
      titleReportPartner,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
