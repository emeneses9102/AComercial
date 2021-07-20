<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      v-if="stateUnitGroup._id"
      :columns-filter="columnsFilterUnitGroupDetail"
      :column-filter-selected-default="'a.nombre'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :title-notification="titleNotificationUnitGroupDetail"
      :columns="columnsUnitGroupDetail"
      :server-query="serverQueryUnitGroupDetail"
      :data-table="dataTableUnitGroupDetail"
      :load-items="loadItemsUnitGroupDetail"
      :manage-row="sendUnitGroupDetail"
      :pagination-enabled="!!stateUnitGroup._id"
      :option-show="false"
      @open-modal-for-edit="openModalForEdit"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import { stateUnitGroup } from '../ServicesUnitGroup/useVariablesUnitGroup'
import {
  columnsUnitGroupDetail, serverQueryUnitGroupDetail, dataTableUnitGroupDetail, columnsFilterUnitGroupDetail, titleNotificationUnitGroupDetail,
} from '../ServicesUnitGroupDetail/useVariablesUnitGroupDetail'
import { getUnitGroupDetailById, loadItemsUnitGroupDetail, sendUnitGroupDetail } from '../ServicesUnitGroupDetail/useServicesUnitGroupDetail'

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

    const openModalForEdit = async ({ _id }) => {
      dataTableUnitGroupDetail.value.loading = true
      await getUnitGroupDetailById(_id)
      dataTableUnitGroupDetail.value.loading = false
    }

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
      stateUnitGroup,
      columnsUnitGroupDetail,
      serverQueryUnitGroupDetail,
      dataTableUnitGroupDetail,
      loadItemsUnitGroupDetail,
      sendUnitGroupDetail,
      openModalForEdit,
      columnsFilterUnitGroupDetail,
      titleNotificationUnitGroupDetail,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
