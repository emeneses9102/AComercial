<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      id="header-search-tribute-factor"
      :columns-filter="columnsFilterTributeFactor"
      :column-filter-selected-default="'a._id'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :columns="columnsTributeFactorForShow"
      :server-query="serverQueryTributeFactor"
      :data-table="dataTableTributeFactor"
      :load-items="loadItemsTributeFactor"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  columnsTributeFactorForShow, serverQueryTributeFactor, dataTableTributeFactor, columnsFilterTributeFactor,
} from '../ServicesTributeFactor/useVariablesTributeFactor'
import { loadItemsTributeFactor } from '../ServicesTributeFactor/useServicesTributeFactor'

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
      columnsTributeFactorForShow,
      serverQueryTributeFactor,
      dataTableTributeFactor,
      loadItemsTributeFactor,
      columnsFilterTributeFactor,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
