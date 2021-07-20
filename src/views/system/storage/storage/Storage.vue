<template>
  <div>
    <modal-save-storage />
    <modal-search-storage />
    <modal-show-storage />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportStorage,
          url: urlApiStorage,
          serverQuery: serverQueryStorage,
          columns: columnsStorage,
          optionsColumnsFilter: columnsFilterStorage,
        }"
      />
      <table-storage />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import { onMounted } from '@vue/composition-api'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import { endPointsCombo, loadCombos } from '@/helpers/combos'
import ModalSaveStorage from './ModalSaveStorage/ModalSaveStorage.vue'
import ModalSearchStorage from './ModalSearchStorage/ModalSearchStorage.vue'
import ModalShowStorage from './ModalShowStorage/ModalShowStorage.vue'
import TableStorage from './TableStorage/TableStorage.vue'
import {
  MODAL_ID, clearStateStorage, columnsStorage, urlApiStorage, titleNotificationStorage, serverQueryStorage, columnsFilterStorage, titleReportStorage, combosStorage,
} from './ServicesStorage/useVariablesStorage'
import {
  clearStateSubStorage, clearDataTableSubStorage, clearFiltersSubStorage,
} from './ServicesSubStorage/useVariablesSubStorage'

export default {
  name: 'Storage',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSaveStorage,
    ModalSearchStorage,
    ModalShowStorage,
    TableStorage,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateStorage()
      clearStateSubStorage()
      clearFiltersSubStorage()
      clearDataTableSubStorage()
    }

    onMounted(() => {
      loadCombos(combosStorage, ['predio'], `${endPointsCombo.predios}/1`, 'Predio')
      loadCombos(combosStorage, ['storageType'], `${endPointsCombo.tipoAlmacen}/1`, 'Tipo Almacén')
      loadCombos(combosStorage, ['businessUnit'], `${endPointsCombo.negocio}/1`, 'Negocio')
    })

    return {
      MODAL_ID,
      clearModal,
      // openModal,
      columnsStorage,
      urlApiStorage,
      titleNotificationStorage,
      serverQueryStorage,
      columnsFilterStorage,
      titleReportStorage,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
