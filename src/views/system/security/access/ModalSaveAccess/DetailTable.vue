<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      v-if="stateAccess._id"
      :columns-filter="columnsFilterAccessOptionDetail"
      :column-filter-selected-default="'a.nombreopcion'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :title-notification="titleNotificationAccessOptionDetail"
      :columns="columnsAccessOptionDetail"
      :server-query="serverQueryAccessOptionDetail"
      :data-table="dataTableAccessOptionDetail"
      :load-items="loadItemsAccessOptionDetail"
      :manage-row="sendAccessOptionDetail"
      :pagination-enabled="!!stateAccess._id"
      :option-edit="false"
      :option-show="false"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import { stateAccess } from '../ServicesAccess/useVariablesAccess'
import {
  columnsAccessOptionDetail, serverQueryAccessOptionDetail, dataTableAccessOptionDetail, columnsFilterAccessOptionDetail, titleNotificationAccessOptionDetail,
} from '../ServicesAccessOptionDetail/useVariablesAccessOptionDetail'
import { loadItemsAccessOptionDetail, sendAccessOptionDetail } from '../ServicesAccessOptionDetail/useServicesAccessOptionDetail'

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
      serverQueryAccessOptionDetail.value.campofiltro = field
      serverQueryAccessOptionDetail.value.filtro = value
      loadItemsAccessOptionDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableAccessOptionDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryAccessOptionDetail.value.campofiltro = field
        serverQueryAccessOptionDetail.value.filtro = value
        loadItemsAccessOptionDetail(1)
      }, timeForLoad)
    }

    return {
      stateAccess,
      columnsAccessOptionDetail,
      serverQueryAccessOptionDetail,
      dataTableAccessOptionDetail,
      loadItemsAccessOptionDetail,
      sendAccessOptionDetail,
      columnsFilterAccessOptionDetail,
      titleNotificationAccessOptionDetail,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
