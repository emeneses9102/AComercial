<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      :columns-filter="columnsFilterSubStorage"
      :column-filter-selected-default="'a.nombre'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :columns="columnsSubStorageForShow"
      :server-query="serverQuerySubStorage"
      :data-table="dataTableSubStorage"
      :load-items="loadItemsSubStorage"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  columnsSubStorageForShow, serverQuerySubStorage, dataTableSubStorage, columnsFilterSubStorage,
} from '../ServicesSubStorage/useVariablesSubStorage'
import { loadItemsSubStorage } from '../ServicesSubStorage/useServicesSubStorage'

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

    // Función que se ejecutara cuando cambia el campo de busqueda
    const onChangeField = (field, value) => {
      serverQuerySubStorage.value.campofiltro = field
      serverQuerySubStorage.value.filtro = value
      if (value.trim().length) loadItemsSubStorage(1)
    }

    // Función que se ejecutara cuando ingresa caracteres al buscador
    const onSearchForValue = (field, value) => {
      dataTableSubStorage.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQuerySubStorage.value.campofiltro = field
        serverQuerySubStorage.value.filtro = value
        loadItemsSubStorage(1)
      }, timeForLoad)
    }

    // Retorno de variables y funciones que se utilizaran en el template
    return {
      columnsSubStorageForShow,
      serverQuerySubStorage,
      dataTableSubStorage,
      loadItemsSubStorage,
      columnsFilterSubStorage,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
