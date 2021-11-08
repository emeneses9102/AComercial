<template>
  <!-- Tabla de TArticulo Grupo Unidad -->
  <table-good-component
    :title-notification="titleNotificationTArticleUnitGroup"
    :columns="columnsTArticleUnitGroup"
    :server-query="serverQueryTArticleUnitGroup"
    :data-table="dataTableTArticleUnitGroup"
    :load-items="loadItemsTArticleUnitGroup"
    :manage-row="sendTArticleUnitGroup"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import { endPointsCombo, loadCombos } from '@/helpers/combos'
import {
  MODAL_ID, stateTArticleUnitGroup, columnsTArticleUnitGroup, serverQueryTArticleUnitGroup, dataTableTArticleUnitGroup, titleNotificationTArticleUnitGroup, combosTArticleUnitGroup,
} from '../ServicesTArticleUnitGroup/useVariablesTArticleUnitGroup'
import { getTArticleUnitGroupById, loadItemsTArticleUnitGroup, sendTArticleUnitGroup } from '../ServicesTArticleUnitGroup/useServicesTArticleUnitGroup'

export default {
  name: 'TableTArticleUnitGroup',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async (row, actionOpenModal) => {
      dataTableTArticleUnitGroup.value.loading = true
      stateTArticleUnitGroup.value = { ...stateTArticleUnitGroup.value, ...row }
      if (actionOpenModal === 'edit') {
        await getTArticleUnitGroupById(row._id)
        await loadCombos(combosTArticleUnitGroup, ['unitMeasure'], `${endPointsCombo.grupoUnidad}/${stateTArticleUnitGroup.value.idGrupoUnidad}`, 'Grupo Unidad')
      }
      dataTableTArticleUnitGroup.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsTArticleUnitGroup()
    })

    return {
      columnsTArticleUnitGroup,
      serverQueryTArticleUnitGroup,
      dataTableTArticleUnitGroup,
      loadItemsTArticleUnitGroup,
      titleNotificationTArticleUnitGroup,
      sendTArticleUnitGroup,
      openModalFor,
    }
  },
}
</script>
