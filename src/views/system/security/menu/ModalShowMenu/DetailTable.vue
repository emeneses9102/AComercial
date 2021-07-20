<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      :columns-filter="columnsFilterMenuOptionDetail"
      :column-filter-selected-default="'a.nombreopcion'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :columns="columnsMenuOptionDetailForShow"
      :server-query="serverQueryMenuOptionDetail"
      :data-table="dataTableMenuOptionDetail"
      :load-items="loadItemsMenuOptionDetail"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  columnsMenuOptionDetailForShow, serverQueryMenuOptionDetail, dataTableMenuOptionDetail, columnsFilterMenuOptionDetail,
} from '../ServicesMenuOptionDetail/useVariablesMenuOptionDetail'
import { loadItemsMenuOptionDetail } from '../ServicesMenuOptionDetail/useServicesMenuOptionDetail'

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
      serverQueryMenuOptionDetail.value.campofiltro = field
      serverQueryMenuOptionDetail.value.filtro = value
      loadItemsMenuOptionDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableMenuOptionDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryMenuOptionDetail.value.campofiltro = field
        serverQueryMenuOptionDetail.value.filtro = value
        loadItemsMenuOptionDetail(1)
      }, timeForLoad)
    }

    return {
      columnsMenuOptionDetailForShow,
      serverQueryMenuOptionDetail,
      dataTableMenuOptionDetail,
      loadItemsMenuOptionDetail,
      columnsFilterMenuOptionDetail,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
