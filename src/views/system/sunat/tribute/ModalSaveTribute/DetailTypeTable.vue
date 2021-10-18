<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      v-if="stateTribute._id"
      id="header-search-type-tribute"
      :columns-filter="columnsFilterTributeTypeDetail"
      :column-filter-selected-default="'_id'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :title-notification="titleNotificationTributeTypeDetail"
      :columns="columnsTributeTypeDetail"
      :server-query="serverQueryTributeTypeDetail"
      :data-table="dataTableTributeTypeDetail"
      :load-items="loadItemsTributeTypeDetail"
      :manage-row="sendTributeTypeDetail"
      :pagination-enabled="!!stateTribute._id"
      :option-show="false"
      @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import { stateTribute } from '../ServicesTribute/useVariablesTribute'
import {
  columnsTributeTypeDetail, serverQueryTributeTypeDetail, dataTableTributeTypeDetail, columnsFilterTributeTypeDetail, titleNotificationTributeTypeDetail, stateTributeTypeDetail,
} from '../ServicesTributeTypeDetail/useVariablesTributeTypeDetail'
import { getTributeTypeDetailById, loadItemsTributeTypeDetail, sendTributeTypeDetail } from '../ServicesTributeTypeDetail/useServicesTributeTypeDetail'

export default {
  name: 'DetailTypeTable',
  components: {
    FieldSetComponent,
    TableGoodComponent,
    HeaderSearchDetailComponent,
  },
  setup() {
    let timer = null
    const timeForLoad = 500

    const openModalFor = async ({ _id }) => {
      dataTableTributeTypeDetail.value.loading = true
      const { status, data } = await getTributeTypeDetailById(_id)
      if (!status) {
        dataTableTributeTypeDetail.value.loading = false
        return false
      }
      stateTributeTypeDetail.value._id = data._id
      stateTributeTypeDetail.value.idArticulo = data.idArticulo
      stateTributeTypeDetail.value.idTipoProducto = data.idTipoProducto
      stateTributeTypeDetail.value.idTipoServicio = data.idTipoServicio
      stateTributeTypeDetail.value.idTributo = data.idTributo
      stateTributeTypeDetail.value.factor = data.factor

      if ((new Date(data.inicial)).getFullYear() <= 1900) {
        stateTributeTypeDetail.value.finicial = null
      } else {
        stateTributeTypeDetail.value.finicial = data.inicial
      }
      if ((new Date(data.final)).getFullYear() <= 1900) {
        stateTributeTypeDetail.value.ffinal = null
      } else {
        stateTributeTypeDetail.value.ffinal = data.final
      }
      dataTableTributeTypeDetail.value.loading = false
      return true
    }

    const onChangeField = (field, value) => {
      serverQueryTributeTypeDetail.value.campofiltro = field
      serverQueryTributeTypeDetail.value.filtro = value
      loadItemsTributeTypeDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableTributeTypeDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryTributeTypeDetail.value.campofiltro = field
        serverQueryTributeTypeDetail.value.filtro = value
        loadItemsTributeTypeDetail(1)
      }, timeForLoad)
    }

    return {
      stateTribute,
      columnsTributeTypeDetail,
      serverQueryTributeTypeDetail,
      dataTableTributeTypeDetail,
      loadItemsTributeTypeDetail,
      sendTributeTypeDetail,
      columnsFilterTributeTypeDetail,
      titleNotificationTributeTypeDetail,
      openModalFor,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
