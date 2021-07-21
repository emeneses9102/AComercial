<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      v-if="stateVoucher._id"
      :columns-filter="columnsFilterVoucherDetailCorrelative"
      :column-filter-selected-default="'a.serie'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :title-notification="titleNotificationVoucherDetailCorrelative"
      :columns="columnsVoucherDetailCorrelative"
      :server-query="serverQueryVoucherDetailCorrelative"
      :data-table="dataTableVoucherDetailCorrelative"
      :load-items="loadItemsVoucherDetailCorrelative"
      :manage-row="sendVoucherDetailCorrelative"
      :pagination-enabled="!!stateVoucher._id"
      :option-show="false"
      @open-modal-for-edit="openModalForEdit"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import { stateVoucher } from '../ServicesVoucher/useVariablesVoucher'
import {
  stateVoucherDetailCorrelative, columnsVoucherDetailCorrelative, serverQueryVoucherDetailCorrelative, dataTableVoucherDetailCorrelative, columnsFilterVoucherDetailCorrelative, titleNotificationVoucherDetailCorrelative,
} from '../ServicesVoucherDetailCorrelative/useVariablesVoucherDetailCorrelative'
import { loadItemsVoucherDetailCorrelative, sendVoucherDetailCorrelative } from '../ServicesVoucherDetailCorrelative/useServicesVoucherDetailCorrelative'

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

    const openModalForEdit = ({ nombreComprobante, nombrePredio, ...row }) => {
      stateVoucherDetailCorrelative.value = { ...stateVoucherDetailCorrelative.value, ...row }
    }

    const onChangeField = (field, value) => {
      serverQueryVoucherDetailCorrelative.value.campofiltro = field
      serverQueryVoucherDetailCorrelative.value.filtro = value
      loadItemsVoucherDetailCorrelative(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableVoucherDetailCorrelative.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryVoucherDetailCorrelative.value.campofiltro = field
        serverQueryVoucherDetailCorrelative.value.filtro = value
        loadItemsVoucherDetailCorrelative(1)
      }, timeForLoad)
    }

    return {
      stateVoucher,
      columnsVoucherDetailCorrelative,
      serverQueryVoucherDetailCorrelative,
      dataTableVoucherDetailCorrelative,
      loadItemsVoucherDetailCorrelative,
      sendVoucherDetailCorrelative,
      openModalForEdit,
      columnsFilterVoucherDetailCorrelative,
      titleNotificationVoucherDetailCorrelative,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
