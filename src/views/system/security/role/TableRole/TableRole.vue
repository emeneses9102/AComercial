<template>
  <!-- Tabla de Tipo Producto -->
  <table-good-component
    :title-notification="titleNotificationRole"
    :columns="columnsRole"
    :server-query="serverQueryRole"
    :data-table="dataTableRole"
    :load-items="loadItemsRole"
    :manage-row="sendRole"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
// import store from '@/store'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  CAMBIAR_ESTADO,
  EDITAR,
  ELIMINAR,
  VER_REGISTRO,
} from '@/options'
import {
  MODAL_ID, stateRole, columnsRole, serverQueryRole, dataTableRole, titleNotificationRole,
} from '../ServicesRole/useVariablesRole'
import { getRoleById, loadItemsRole, sendRole } from '../ServicesRole/useServicesRole'

export default {
  name: 'TableRole',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async ({
      ubigeo, almacen, idUbigeo, ...row
    }, actionOpenModal) => {
      dataTableRole.value.loading = true
      stateRole.value = { ...stateRole.value, ...row }
      if (actionOpenModal === 'edit') {
        await getRoleById(row._id)
      }
      dataTableRole.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    // const optionsPermissions = computed(() => {
    //   console.log(context.root.$route.name)
    //   console.log(store.state.rolesAndPermissions.options)
    //   if (store.state.rolesAndPermissions.options[context.root.$route.name]) {
    //     return store.state.rolesAndPermissions.options[context.root.$route.name]
    //   }
    //   return []
    // })

    onMounted(() => {
      loadItemsRole()
    })

    return {
      columnsRole,
      serverQueryRole,
      dataTableRole,
      loadItemsRole,
      titleNotificationRole,
      sendRole,
      openModalFor,
      // optionsPermissions,

      CAMBIAR_ESTADO,
      EDITAR,
      ELIMINAR,
      VER_REGISTRO,
    }
  },
}
</script>
