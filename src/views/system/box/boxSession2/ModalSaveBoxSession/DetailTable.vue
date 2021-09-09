<template>
  <field-set-component
    legend="Listado"
    collapse="show"
  >
    <!-- <header-search-detail-component
      v-if="stateBoxSession._id"
      :columns-filter="columnsFilterBoxSessionDetail"
      :column-filter-selected-default="'a.nombreMoneda'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    /> -->
    <table-good-component
      :title-notification="titleNotificationBoxSessionDetail"
      :columns="columnsBoxSessionDetail"
      :server-query="serverQueryBoxSessionDetail"
      :data-table="dataTableBoxSessionDetail"
      :load-items="loadItemsBoxSessionDetail"
      :manage-row="sendBoxSessionDetail"
      :pagination-enabled="!!stateBoxSession._id"
      :option-show="false"
      @open-modal-for-edit="openModalForEdit"
    />
  </field-set-component>
</template>

<script>
// import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import {
  stateBoxSession,
} from '../ServicesBoxSession/useVariablesBoxSession'
import {
  stateBoxSessionDetail,
  columnsBoxSessionDetail,
  serverQueryBoxSessionDetail,
  dataTableBoxSessionDetail,
  columnsFilterBoxSessionDetail,
  titleNotificationBoxSessionDetail,
} from '../ServicesBoxSessionDetail/useVariablesBoxSessionDetail'
import {
  loadItemsBoxSessionDetail,
  sendBoxSessionDetail,
} from '../ServicesBoxSessionDetail/useServicesBoxSessionDetail'

export default {
  name: 'DetailTable',
  components: {
    FieldSetComponent,
    TableGoodComponent,
    // HeaderSearchDetailComponent,
  },
  setup() {
    let timer = null
    const timeForLoad = 500

    const openModalForEdit = ({ nombreComprobante, nombrePredio, ...row }) => {
      stateBoxSessionDetail.value = { ...stateBoxSessionDetail.value, ...row }
      stateBoxSessionDetail.value.monto = stateBoxSessionDetail.value.apertura
    }

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
      stateBoxSession,
      columnsBoxSessionDetail,
      serverQueryBoxSessionDetail,
      dataTableBoxSessionDetail,
      loadItemsBoxSessionDetail,
      sendBoxSessionDetail,
      openModalForEdit,
      columnsFilterBoxSessionDetail,
      titleNotificationBoxSessionDetail,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
