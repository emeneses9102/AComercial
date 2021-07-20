<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      v-if="stateStorage._id"
      :columns-filter="columnsFilterSubStorage"
      :column-filter-selected-default="'a.nombre'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :title-notification="titleNotificationSubStorage"
      :columns="columnsSubStorage"
      :server-query="serverQuerySubStorage"
      :data-table="dataTableSubStorage"
      :load-items="loadItemsSubStorage"
      :manage-row="sendSubStorage"
      :pagination-enabled="!!stateStorage._id"
      :option-show="false"
      @open-modal-for-edit="openModalForEdit"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import { stateStorage } from '../ServicesStorage/useVariablesStorage'
import {
  stateSubStorage, columnsSubStorage, serverQuerySubStorage, dataTableSubStorage, columnsFilterSubStorage, titleNotificationSubStorage,
} from '../ServicesSubStorage/useVariablesSubStorage'
import { loadItemsSubStorage, sendSubStorage } from '../ServicesSubStorage/useServicesSubStorage'

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
      stateSubStorage.value._id = _id
      stateSubStorage.value.nombre = nombre
      stateSubStorage.value.ubicacion = ubicacion
    }

    const onChangeField = (field, value) => {
      serverQuerySubStorage.value.campofiltro = field
      serverQuerySubStorage.value.filtro = value
      loadItemsSubStorage(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableSubStorage.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQuerySubStorage.value.campofiltro = field
        serverQuerySubStorage.value.filtro = value
        loadItemsSubStorage(1)
      }, timeForLoad)
    }

    return {
      stateStorage,
      columnsSubStorage,
      serverQuerySubStorage,
      dataTableSubStorage,
      loadItemsSubStorage,
      sendSubStorage,
      openModalForEdit,
      columnsFilterSubStorage,
      titleNotificationSubStorage,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
