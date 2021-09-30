<template>
  <b-modal
    :id="MODAL_ID"
    centered
    title="Consultar Operación"
    ok-title="Ok"
    cancel-title="Cerrar"
    cancel-variant="outline-primary"
    no-close-on-backdrop
    size="lg"
    @show="showModal"
  >
    <field-set-component
      legend="Consultar Operación"
    >
      <header-search-detail-component
        :columns-filter="columnsFilterPointSale"
        :column-filter-selected-default="'a._id'"
        @on-change-field="onChangeField"
        @on-search-for-value="onSearchForValue"
      />
      <table-good-component
        :title-notification="titleNotificationPointSale"
        :columns="columnsPointSale"
        :server-query="serverQueryPointSale"
        :data-table="dataTablePointSale"
        :load-items="loadItemsPointSale"
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
  MODAL_ID, statePointSale, columnsPointSale, dataTablePointSale, serverQueryPointSale, columnsFilterPointSale, titleNotificationPointSale, clearDataTablePointSale,
} from './useVariablesPointSale'
import { listPointSaleDetail, serverQueryPointSaleDetail } from './useVariablesPointSaleDetail'
import { loadItemsPointSaleDetail } from './useServicesPointSaleDetail'
import { getPointSaleById, loadItemsPointSale } from './useServicesPointSale'

export default {
  name: 'ModalQueryPointSale',
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
    serverQueryFiltroFecha: {
      type: String,
      required: false,
      default: '',
    },
    serverQueryFinicio: {
      type: String,
      required: false,
      default: '',
    },
    serverQueryFfin: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(props, context) {
    let timer = null
    const timeForLoad = 500

    const showModal = () => {
      clearDataTablePointSale()
      serverQueryPointSale.value.campofiltro = ''
      serverQueryPointSale.value.filtro = ''
    }

    const rowSelected = async row => {
      statePointSale.value = { ...statePointSale.value, ...row }
      dataTablePointSale.value.loading = true
      await getPointSaleById(row._id)
      serverQueryPointSaleDetail.value.indice = row._id
      await loadItemsPointSaleDetail()
      dataTablePointSale.value.loading = false
      context.emit('on-point-sale-selected', {
        pointSale: statePointSale.value,
        listPointSaleDetail: listPointSaleDetail.value.rows,
      })
      context.root.$bvModal.hide(MODAL_ID)
    }

    const onChangeField = (field, value) => {
      serverQueryPointSale.value.opcional = props.serverQueryOpcional || ''
      serverQueryPointSale.value.campofiltro = field
      serverQueryPointSale.value.filtro = value
      serverQueryPointSale.value.filtrofecha = props.serverQueryFiltroFecha
      serverQueryPointSale.value.finicio = props.serverQueryFinicio
      serverQueryPointSale.value.ffin = props.serverQueryFfin
      if (serverQueryPointSale.value.filtro === '') {
        clearDataTablePointSale()
      } else {
        loadItemsPointSale(1)
      }
    }

    const onSearchForValue = (field, value) => {
      serverQueryPointSale.value.opcional = props.serverQueryOpcional || ''
      dataTablePointSale.value.loading = true
      clearTimeout(timer)
      serverQueryPointSale.value.campofiltro = field
      serverQueryPointSale.value.filtro = value
      serverQueryPointSale.value.filtrofecha = props.serverQueryFiltroFecha
      serverQueryPointSale.value.finicio = props.serverQueryFinicio
      serverQueryPointSale.value.ffin = props.serverQueryFfin
      if (serverQueryPointSale.value.filtro === '') {
        clearDataTablePointSale()
      } else {
        timer = setTimeout(() => {
          loadItemsPointSale(1)
        }, timeForLoad)
      }
    }

    return {
      MODAL_ID,
      columnsPointSale,
      columnsFilterPointSale,
      dataTablePointSale,
      serverQueryPointSale,
      loadItemsPointSale,
      statePointSale,
      titleNotificationPointSale,
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
#modal-query-point-sale {
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
