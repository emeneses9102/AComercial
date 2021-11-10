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
import { computed, onMounted, provide } from '@vue/composition-api'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import store from '@/store'
import { EDITAR, GUARDAR } from '@/options'
import { endPointsCombo, loadCombos } from '@/helpers/combos'
import ModalSaveStorage from './ModalSaveStorage/ModalSaveStorage.vue'
import ModalSearchStorage from './ModalSearchStorage/ModalSearchStorage.vue'
import ModalShowStorage from './ModalShowStorage/ModalShowStorage.vue'
import TableStorage from './TableStorage/TableStorage.vue'
import {
  MODAL_ID, clearStateStorage, columnsStorage, urlApiStorage, titleNotificationStorage, serverQueryStorage, columnsFilterStorage, titleReportStorage, combosStorage, routeNameStorage,
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
    // Propiedad computada para almacenar los permisos por rol
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNameStorage]) {
        return store.state.rolesAndPermissions.options[routeNameStorage]
      }
      return []
    })

    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateStorage()
      clearStateSubStorage()
      clearFiltersSubStorage()
      clearDataTableSubStorage()
    }

    // Función que se ejecutara cuando el componente se monta en el DOM
    onMounted(() => {
      if (optionsPermissions.value.includes(GUARDAR || EDITAR)) {
        loadCombos(combosStorage, ['predio'], `${endPointsCombo.predios}/1`, 'Predio')
        loadCombos(combosStorage, ['storageType'], `${endPointsCombo.tipoAlmacen}/1`, 'Tipo Almacén')
        loadCombos(combosStorage, ['businessUnit'], `${endPointsCombo.negocio}/1`, 'Negocio')
      }
    })

    provide('optionsPermissions', optionsPermissions)

    // Retorno de variables y funciones que se utilizaran en el template
    return {
      MODAL_ID,
      clearModal,
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
