<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      id="header-search-storage"
      :columns-filter="columnsFilterUserStorageDetail"
      :column-filter-selected-default="'a.nombrealmacen'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :columns="columnsUserStorageDetailForShow"
      :server-query="serverQueryUserStorageDetail"
      :data-table="dataTableUserStorageDetail"
      :load-items="loadItemsUserStorageDetail"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  columnsUserStorageDetailForShow, serverQueryUserStorageDetail, dataTableUserStorageDetail, columnsFilterUserStorageDetail,
} from '../ServicesUserStorageDetail/useVariablesUserStorageDetail'
import { loadItemsUserStorageDetail } from '../ServicesUserStorageDetail/useServicesUserStorageDetail'

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
      serverQueryUserStorageDetail.value.campofiltro = field
      serverQueryUserStorageDetail.value.filtro = value
      loadItemsUserStorageDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableUserStorageDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryUserStorageDetail.value.campofiltro = field
        serverQueryUserStorageDetail.value.filtro = value
        loadItemsUserStorageDetail(1)
      }, timeForLoad)
    }

    return {
      columnsUserStorageDetailForShow,
      serverQueryUserStorageDetail,
      dataTableUserStorageDetail,
      loadItemsUserStorageDetail,
      columnsFilterUserStorageDetail,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
