<template>
  <b-modal
    :id="MODAL_ID"
    centered
    title="Consultar Artículo"
    ok-title="Ok"
    cancel-title="Cerrar"
    cancel-variant="outline-primary"
    no-close-on-backdrop
    size="lg"
    @show="showModal"
  >
    <field-set-component
      legend="Consultar Artículo"
    >
      <header-search-detail-component
        :columns-filter="columnsFilterPurchaseOrderDetail"
        :column-filter-selected-default="'a.nombreTArticulo'"
        @on-change-field="onChangeField"
        @on-search-for-value="onSearchForValue"
      />
      <table-good-component
        :title-notification="titleNotificationPurchaseOrderDetail"
        :columns="columnsPurchaseOrderDetail"
        :server-query="serverQueryPurchaseOrderDetail"
        :data-table="dataTablePurchaseOrderDetail"
        :load-items="loadItemsPurchaseOrderDetail"
        @on-row-click="rowSelected"
      />
    </field-set-component>
  </b-modal>
</template>

<script>
import {
  BModal,
} from 'bootstrap-vue'
import FieldSetComponent from '../FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '../TableComponent/TableGoodComponent.vue'
import HeaderSearchDetailComponent from '../HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import {
  MODAL_ID, statePurchaseOrderDetail, columnsPurchaseOrderDetail, dataTablePurchaseOrderDetail, serverQueryPurchaseOrderDetail, columnsFilterPurchaseOrderDetail, titleNotificationPurchaseOrderDetail, clearDataTablePurchaseOrderDetail,
} from './useVariablesPurchaseOrderDetail'
import { getPurchaseOrderDetailById, loadItemsPurchaseOrderDetail } from './useServicesPurchaseOrderDetail'

export default {
  name: 'ModalQueryTablePurchaseOrderDetail',
  components: {
    BModal,
    FieldSetComponent,
    TableGoodComponent,
    HeaderSearchDetailComponent,
  },
  props: {
    serverQueryOpcional: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(props, context) {
    let timer = null
    const timeForLoad = 500

    const showModal = () => {
      clearDataTablePurchaseOrderDetail()
      serverQueryPurchaseOrderDetail.value.campofiltro = ''
      serverQueryPurchaseOrderDetail.value.filtro = ''
    }

    const rowSelected = async row => {
      statePurchaseOrderDetail.value = { ...statePurchaseOrderDetail.value, ...row }
      dataTablePurchaseOrderDetail.value.loading = true
      await getPurchaseOrderDetailById(row._id)
      dataTablePurchaseOrderDetail.value.loading = false
      context.emit('on-purchase-order-detail-selected', statePurchaseOrderDetail.value)
      context.root.$bvModal.hide(MODAL_ID)
    }

    const onChangeField = (field, value) => {
      serverQueryPurchaseOrderDetail.value.opcional = props.serverQueryOpcional || ''
      serverQueryPurchaseOrderDetail.value.campofiltro = field
      serverQueryPurchaseOrderDetail.value.filtro = value
      if (serverQueryPurchaseOrderDetail.value.filtro === '') {
        clearDataTablePurchaseOrderDetail()
      } else {
        loadItemsPurchaseOrderDetail(1)
      }
    }

    const onSearchForValue = (field, value) => {
      serverQueryPurchaseOrderDetail.value.opcional = props.serverQueryOpcional || ''
      dataTablePurchaseOrderDetail.value.loading = true
      clearTimeout(timer)
      serverQueryPurchaseOrderDetail.value.campofiltro = field
      serverQueryPurchaseOrderDetail.value.filtro = value
      if (serverQueryPurchaseOrderDetail.value.filtro === '') {
        clearDataTablePurchaseOrderDetail()
      } else {
        timer = setTimeout(() => {
          loadItemsPurchaseOrderDetail(1)
        }, timeForLoad)
      }
    }

    return {
      MODAL_ID,
      columnsPurchaseOrderDetail,
      columnsFilterPurchaseOrderDetail,
      dataTablePurchaseOrderDetail,
      serverQueryPurchaseOrderDetail,
      loadItemsPurchaseOrderDetail,
      statePurchaseOrderDetail,
      titleNotificationPurchaseOrderDetail,
      showModal,
      rowSelected,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
#modal-query-purchase-order-detail {
  .modal-dialog {
    @media screen and (min-width: 576px) {
      max-width: 1000px;
      width: 90%;
    }
  }
  .modal-lg {
    @media screen and (min-width: 992px) {
      max-width: 1400px;
      width: 90%;
    }
  }
}
</style>
