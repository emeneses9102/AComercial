<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      :columns-filter="columnsFilterVoucherDetailCorrelative"
      :column-filter-selected-default="'a.serie'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :columns="columnsVoucherDetailCorrelativeForShow"
      :server-query="serverQueryVoucherDetailCorrelative"
      :data-table="dataTableVoucherDetailCorrelative"
      :load-items="loadItemsVoucherDetailCorrelative"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  columnsVoucherDetailCorrelativeForShow, serverQueryVoucherDetailCorrelative, dataTableVoucherDetailCorrelative, columnsFilterVoucherDetailCorrelative,
} from '../ServicesVoucherDetailCorrelative/useVariablesVoucherDetailCorrelative'
import { loadItemsVoucherDetailCorrelative } from '../ServicesVoucherDetailCorrelative/useServicesVoucherDetailCorrelative'

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
      serverQueryVoucherDetailCorrelative.value.campofiltro = field
      serverQueryVoucherDetailCorrelative.value.filtro = value
      loadItemsVoucherDetailCorrelative(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableVoucherDetailCorrelative.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryVoucherDetailCorrelative.value.campofiltro = field
        serverQueryVoucherDetailCorrelative.value.filtro = value
        loadItemsVoucherDetailCorrelative(1)
      }, timeForLoad)
    }

    return {
      columnsVoucherDetailCorrelativeForShow,
      serverQueryVoucherDetailCorrelative,
      dataTableVoucherDetailCorrelative,
      loadItemsVoucherDetailCorrelative,
      columnsFilterVoucherDetailCorrelative,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
