<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      :columns-filter="columnsFilterBoxSessionDetail"
      :column-filter-selected-default="'a.serie'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :columns="columnsBoxSessionDetailForShow"
      :server-query="serverQueryBoxSessionDetail"
      :data-table="dataTableBoxSessionDetail"
      :load-items="loadItemsBoxSessionDetail"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  columnsBoxSessionDetailForShow, serverQueryBoxSessionDetail, dataTableBoxSessionDetail, columnsFilterBoxSessionDetail,
} from '../ServicesBoxSessionDetail/useVariablesBoxSessionDetail'
import { loadItemsBoxSessionDetail } from '../ServicesBoxSessionDetail/useServicesBoxSessionDetail'

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
      serverQueryBoxSessionDetail.value.campofiltro = field
      serverQueryBoxSessionDetail.value.filtro = value
      loadItemsBoxSessionDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableBoxSessionDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryBoxSessionDetail.value.campofiltro = field
        serverQueryBoxSessionDetail.value.filtro = value
        loadItemsBoxSessionDetail(1)
      }, timeForLoad)
    }

    return {
      columnsBoxSessionDetailForShow,
      serverQueryBoxSessionDetail,
      dataTableBoxSessionDetail,
      loadItemsBoxSessionDetail,
      columnsFilterBoxSessionDetail,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
