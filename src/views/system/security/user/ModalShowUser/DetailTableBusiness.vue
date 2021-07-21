<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      id="header-search-business"
      :columns-filter="columnsFilterUserBusinessDetail"
      :column-filter-selected-default="'a.nombrenegocio'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :columns="columnsUserBusinessDetailForShow"
      :server-query="serverQueryUserBusinessDetail"
      :data-table="dataTableUserBusinessDetail"
      :load-items="loadItemsUserBusinessDetail"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  columnsUserBusinessDetailForShow, serverQueryUserBusinessDetail, dataTableUserBusinessDetail, columnsFilterUserBusinessDetail,
} from '../ServicesUserBusinessDetail/useVariablesUserBusinessDetail'
import { loadItemsUserBusinessDetail } from '../ServicesUserBusinessDetail/useServicesUserBusinessDetail'

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
      serverQueryUserBusinessDetail.value.campofiltro = field
      serverQueryUserBusinessDetail.value.filtro = value
      loadItemsUserBusinessDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableUserBusinessDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryUserBusinessDetail.value.campofiltro = field
        serverQueryUserBusinessDetail.value.filtro = value
        loadItemsUserBusinessDetail(1)
      }, timeForLoad)
    }

    return {
      columnsUserBusinessDetailForShow,
      serverQueryUserBusinessDetail,
      dataTableUserBusinessDetail,
      loadItemsUserBusinessDetail,
      columnsFilterUserBusinessDetail,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
