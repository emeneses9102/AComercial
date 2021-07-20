<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      :columns-filter="columnsFilterFeatureDetail"
      :column-filter-selected-default="'a.nombre'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :columns="columnsFeatureDetailForShow"
      :server-query="serverQueryFeatureDetail"
      :data-table="dataTableFeatureDetail"
      :load-items="loadItemsFeatureDetail"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  columnsFeatureDetailForShow, serverQueryFeatureDetail, dataTableFeatureDetail, columnsFilterFeatureDetail,
} from '../ServicesFeatureDetail/useVariablesFeatureDetail'
import { loadItemsFeatureDetail } from '../ServicesFeatureDetail/useServicesFeatureDetail'

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
      serverQueryFeatureDetail.value.campofiltro = field
      serverQueryFeatureDetail.value.filtro = value
      loadItemsFeatureDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableFeatureDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryFeatureDetail.value.campofiltro = field
        serverQueryFeatureDetail.value.filtro = value
        loadItemsFeatureDetail(1)
      }, timeForLoad)
    }

    return {
      columnsFeatureDetailForShow,
      serverQueryFeatureDetail,
      dataTableFeatureDetail,
      loadItemsFeatureDetail,
      columnsFilterFeatureDetail,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
