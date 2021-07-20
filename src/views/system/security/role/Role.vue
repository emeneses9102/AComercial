<template>
  <div>
    <modal-save-role />
    <modal-search-role />
    <modal-show-role />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportRole,
          url: urlApiRole,
          serverQuery: serverQueryRole,
          columns: columnsRole,
          optionsColumnsFilter: columnsFilterRole,
        }"
      />
      <table-role />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import { onMounted } from '@vue/composition-api'
import { endPointsCombo, loadCombos } from '@/helpers/combos'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import ModalSaveRole from './ModalSaveRole/ModalSaveRole.vue'
import ModalSearchRole from './ModalSearchRole/ModalSearchRole.vue'
import ModalShowRole from './ModalShowRole/ModalShowRole.vue'
import TableRole from './TableRole/TableRole.vue'
import {
  MODAL_ID, clearStateRole, columnsRole, urlApiRole, serverQueryRole, columnsFilterRole, titleReportRole, combosRole,
} from './ServicesRole/useVariablesRole'

export default {
  name: 'Role',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSaveRole,
    ModalSearchRole,
    ModalShowRole,
    TableRole,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateRole()
    }

    onMounted(() => {
      loadCombos(combosRole, ['predio'], `${endPointsCombo.predios}/1`, 'Predio')
      loadCombos(combosRole, ['storage'], `${endPointsCombo.almacen}/1`, 'Almacén')
    })

    return {
      MODAL_ID,
      clearModal,
      columnsRole,
      urlApiRole,
      serverQueryRole,
      columnsFilterRole,
      titleReportRole,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
