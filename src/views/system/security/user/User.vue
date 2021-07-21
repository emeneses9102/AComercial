<template>
  <div>
    <modal-save-user />
    <modal-search-user />
    <modal-show-user />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportUser,
          url: urlApiUser,
          serverQuery: serverQueryUser,
          columns: columnsUser,
          optionsColumnsFilter: columnsFilterUser,
        }"
      />
      <table-user />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import { onMounted } from '@vue/composition-api'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import { endPointsCombo, loadCombos } from '@/helpers/combos'
import ModalSaveUser from './ModalSaveUser/ModalSaveUser.vue'
import ModalSearchUser from './ModalSearchUser/ModalSearchUser.vue'
import ModalShowUser from './ModalShowUser/ModalShowUser.vue'
import TableUser from './TableUser/TableUser.vue'
import {
  MODAL_ID, clearStateUser, columnsUser, urlApiUser, titleNotificationUser, serverQueryUser, columnsFilterUser, titleReportUser, combosUser,
} from './ServicesUser/useVariablesUser'
import {
  clearStateUserBusinessDetail, clearDataTableUserBusinessDetail, clearFiltersUserBusinessDetail, combosUserBusinessDetail,
} from './ServicesUserBusinessDetail/useVariablesUserBusinessDetail'
import {
  clearStateUserStorageDetail, clearDataTableUserStorageDetail, clearFiltersUserStorageDetail, combosUserStorageDetail,
} from './ServicesUserStorageDetail/useVariablesUserStorageDetail'

export default {
  name: 'User',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalSaveUser,
    ModalSearchUser,
    ModalShowUser,
    TableUser,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateUser()
      clearStateUserBusinessDetail()
      clearFiltersUserBusinessDetail()
      clearDataTableUserBusinessDetail()
      clearStateUserStorageDetail()
      clearFiltersUserStorageDetail()
      clearDataTableUserStorageDetail()
    }

    onMounted(() => {
      loadCombos(combosUser, ['role'], `${endPointsCombo.rol}/1`, 'Rol')
      loadCombos(combosUser, ['collaborator'], `${endPointsCombo.colaborador}/1`, 'Colaborador')
      loadCombos(combosUserBusinessDetail, ['businessUnit'], `${endPointsCombo.negocio}/1`, 'Negocio')
      loadCombos(combosUserStorageDetail, ['storage'], `${endPointsCombo.almacen}/1`, 'Almacén')
    })

    return {
      MODAL_ID,
      clearModal,
      columnsUser,
      urlApiUser,
      titleNotificationUser,
      serverQueryUser,
      columnsFilterUser,
      titleReportUser,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
