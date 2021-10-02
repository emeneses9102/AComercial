<template>
  <!-- Tabla de Características -->
  <table-good-component
    :title-notification="titleNotificationUser"
    :columns="columnsUser"
    :server-query="serverQueryUser"
    :data-table="dataTableUser"
    :load-items="loadItemsUser"
    :manage-row="sendUser"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  >
    <!-- @open-modal-for-change-password="row=>openModalFor(row, 'change-password')" -->
    <template
      #options-pluss="{ props }"
    >
      <template
        v-if="optionsPermissions.includes(CAMBIAR_CLAVE)"
      >
        <b-dropdown-item @click="openModalFor(props.row, 'change-password')">
          <div class="d-flex align-items-center">
            <feather-icon
              icon="LockIcon"
              class="mr-50"
            />
            <span class="d-inline-block">Cambiar Clave</span>
          </div>
        </b-dropdown-item>
      </template>
    </template>
  </table-good-component>
</template>

<script>
import {
  BDropdownItem,
} from 'bootstrap-vue'
import { computed, onMounted } from '@vue/composition-api'
import { useRouter } from '@/@core/utils/utils'
import store from '@/store'
import { CAMBIAR_CLAVE } from '@/options'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  MODAL_ID, stateUser, columnsUser, serverQueryUser, dataTableUser, titleNotificationUser,
} from '../ServicesUser/useVariablesUser'
import { getUserById, loadItemsUser, sendUser } from '../ServicesUser/useServicesUser'
import { serverQueryUserBusinessDetail, clearStateUserBusinessDetail, clearFiltersUserBusinessDetail } from '../ServicesUserBusinessDetail/useVariablesUserBusinessDetail'
import { loadItemsUserBusinessDetail } from '../ServicesUserBusinessDetail/useServicesUserBusinessDetail'
import { serverQueryUserStorageDetail, clearStateUserStorageDetail, clearFiltersUserStorageDetail } from '../ServicesUserStorageDetail/useVariablesUserStorageDetail'
import { loadItemsUserStorageDetail } from '../ServicesUserStorageDetail/useServicesUserStorageDetail'

export default {
  name: 'TableUser',
  components: {
    TableGoodComponent,
    BDropdownItem,
  },
  setup(props, context) {
    // Usar variable reactiva route
    const { route } = useRouter()

    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async ({ nombres, ...row }, actionOpenModal) => {
      if (actionOpenModal === 'change-password') {
        stateUser.value._id = row._id
        stateUser.value.usuario = row.usuario
        context.root.$bvModal.show(`${MODAL_ID}-change-password`)
        return
      }
      dataTableUser.value.loading = true
      if (actionOpenModal === 'show') {
        stateUser.value = { ...stateUser.value, ...row }
      } else if (actionOpenModal === 'edit') {
        await getUserById(row._id)
      }
      clearStateUserBusinessDetail()
      clearFiltersUserBusinessDetail()
      clearStateUserStorageDetail()
      clearFiltersUserStorageDetail()
      serverQueryUserBusinessDetail.value.indice = row._id
      serverQueryUserStorageDetail.value.indice = row._id
      await Promise.all([
        loadItemsUserBusinessDetail(1),
        loadItemsUserStorageDetail(1),
      ])
      dataTableUser.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[route.value.name]) {
        return store.state.rolesAndPermissions.options[route.value.name]
      }
      return []
    })

    onMounted(() => {
      loadItemsUser()
    })

    return {
      columnsUser,
      serverQueryUser,
      dataTableUser,
      loadItemsUser,
      titleNotificationUser,
      sendUser,
      openModalFor,
      optionsPermissions,

      CAMBIAR_CLAVE,
    }
  },
}
</script>
