<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      :columns-filter="columnsFilterUnitGroupDetail"
      :column-filter-selected-default="'a.nombre'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :columns="columnsUnitGroupDetailForShow"
      :server-query="serverQueryUnitGroupDetail"
      :data-table="dataTableUnitGroupDetail"
      :load-items="loadItemsUnitGroupDetail"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  columnsUnitGroupDetailForShow, serverQueryUnitGroupDetail, dataTableUnitGroupDetail, columnsFilterUnitGroupDetail,
} from '../ServicesUnitGroupDetail/useVariablesUnitGroupDetail'
import { loadItemsUnitGroupDetail } from '../ServicesUnitGroupDetail/useServicesUnitGroupDetail'

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
      serverQueryUnitGroupDetail.value.campofiltro = field
      serverQueryUnitGroupDetail.value.filtro = value
      loadItemsUnitGroupDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableUnitGroupDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryUnitGroupDetail.value.campofiltro = field
        serverQueryUnitGroupDetail.value.filtro = value
        loadItemsUnitGroupDetail(1)
      }, timeForLoad)
    }

    return {
      columnsUnitGroupDetailForShow,
      serverQueryUnitGroupDetail,
      dataTableUnitGroupDetail,
      loadItemsUnitGroupDetail,
      columnsFilterUnitGroupDetail,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
