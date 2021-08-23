<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      :columns-filter="columnsFilterClient"
      :column-filter-selected-default="'a.socio'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :columns="columnsClientForShow"
      :server-query="serverQueryClient"
      :data-table="dataTableClient"
      :load-items="loadItemsClient"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  columnsClientForShow, serverQueryClient, dataTableClient, columnsFilterClient,
} from '../ServicesClient/useVariablesClient'
import { loadItemsClient } from '../ServicesClient/useServicesClient'

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

    const onChangeField = (field, value) => {
      serverQueryClient.value.campofiltro = field
      serverQueryClient.value.filtro = value
      loadItemsClient(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableClient.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryClient.value.campofiltro = field
        serverQueryClient.value.filtro = value
        loadItemsClient(1)
      }, timeForLoad)
    }

    return {
      columnsClientForShow,
      serverQueryClient,
      dataTableClient,
      loadItemsClient,
      columnsFilterClient,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
