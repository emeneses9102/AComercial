<template>
  <field-set-component
    legend="Listado de Comprobantes"
    collapse="show"
  >
    <!-- <header-search-detail-component
      v-if="stateBoxSession._id"
      :columns-filter="columnsFilterBoxSessionVoucherDetail"
      :column-filter-selected-default="'a.nombreMoneda'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    /> -->
    <table-good-component
      :title-notification="titleNotificationBoxSessionVoucherDetail"
      :columns="columnsBoxSessionVoucherDetail"
      :server-query="serverQueryBoxSessionVoucherDetail"
      :data-table="dataTableBoxSessionVoucherDetail"
      :load-items="loadItemsBoxSessionVoucherDetail"
      :manage-row="sendBoxSessionVoucherDetail"
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
  stateBoxSessionVoucherDetail,
  columnsBoxSessionVoucherDetail,
  serverQueryBoxSessionVoucherDetail,
  dataTableBoxSessionVoucherDetail,
  columnsFilterBoxSessionVoucherDetail,
  titleNotificationBoxSessionVoucherDetail,
} from '../ServicesBoxSessionVoucherDetail/useVariablesBoxSessionVoucherDetail'
import {
  loadItemsBoxSessionVoucherDetail,
  sendBoxSessionVoucherDetail,
} from '../ServicesBoxSessionVoucherDetail/useServicesBoxSessionVoucherDetail'

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
      stateBoxSessionVoucherDetail.value = { ...stateBoxSessionVoucherDetail.value, ...row }
    }

    const onChangeField = (field, value) => {
      serverQueryBoxSessionVoucherDetail.value.campofiltro = field
      serverQueryBoxSessionVoucherDetail.value.filtro = value
      loadItemsBoxSessionVoucherDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableBoxSessionVoucherDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryBoxSessionVoucherDetail.value.campofiltro = field
        serverQueryBoxSessionVoucherDetail.value.filtro = value
        loadItemsBoxSessionVoucherDetail(1)
      }, timeForLoad)
    }

    return {
      stateBoxSession,
      columnsBoxSessionVoucherDetail,
      serverQueryBoxSessionVoucherDetail,
      dataTableBoxSessionVoucherDetail,
      loadItemsBoxSessionVoucherDetail,
      sendBoxSessionVoucherDetail,
      openModalForEdit,
      columnsFilterBoxSessionVoucherDetail,
      titleNotificationBoxSessionVoucherDetail,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
