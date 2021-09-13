<template>
  <field-set-component
    legend="Listado"
    collapse="show"
  >
    <header-search-detail-component
      v-if="stateTribute._id"
      :columns-filter="columnsFilterTributeFactor"
      :column-filter-selected-default="'a._id'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :title-notification="titleNotificationTributeFactor"
      :columns="columnsTributeFactor"
      :server-query="serverQueryTributeFactor"
      :data-table="dataTableTributeFactor"
      :load-items="loadItemsTributeFactor"
      :manage-row="sendTributeFactor"
      :pagination-enabled="!!stateTribute._id"
      :option-show="false"
      @open-modal-for-edit="openModalForEdit"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import { stateTribute } from '../ServicesTribute/useVariablesTribute'
import {
  stateTributeFactor, columnsTributeFactor, serverQueryTributeFactor, dataTableTributeFactor, columnsFilterTributeFactor, titleNotificationTributeFactor,
} from '../ServicesTributeFactor/useVariablesTributeFactor'
import { loadItemsTributeFactor, sendTributeFactor } from '../ServicesTributeFactor/useServicesTributeFactor'

export default {
  name: 'DetailTable',
  components: {
    FieldSetComponent,
    TableGoodComponent,
    HeaderSearchDetailComponent,
  },
  setup() {
    let timer = null
    const timeForLoad = 500

    const openModalForEdit = ({ _id, nombre, ubicacion }) => {
      stateTributeFactor.value._id = _id
      stateTributeFactor.value.nombre = nombre
      stateTributeFactor.value.ubicacion = ubicacion
    }

    const onChangeField = (field, value) => {
      serverQueryTributeFactor.value.campofiltro = field
      serverQueryTributeFactor.value.filtro = value
      loadItemsTributeFactor(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableTributeFactor.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryTributeFactor.value.campofiltro = field
        serverQueryTributeFactor.value.filtro = value
        loadItemsTributeFactor(1)
      }, timeForLoad)
    }

    return {
      stateTribute,
      columnsTributeFactor,
      serverQueryTributeFactor,
      dataTableTributeFactor,
      loadItemsTributeFactor,
      sendTributeFactor,
      openModalForEdit,
      columnsFilterTributeFactor,
      titleNotificationTributeFactor,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
