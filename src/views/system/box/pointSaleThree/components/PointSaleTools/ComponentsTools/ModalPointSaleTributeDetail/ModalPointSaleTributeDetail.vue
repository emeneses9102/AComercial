<template>
  <b-modal
    :id="MODAL_ID"
    centered
    title="Consultar Tributos"
    ok-title="Ok"
    cancel-title="Cerrar"
    cancel-variant="outline-primary"
    no-close-on-backdrop
    size="lg"
    @show="showModal"
  >
    <field-set-component
      legend="Consultar Tributos"
    >
      <header-search-detail-component
        :columns-filter="columnsFilterPointSaleTributeDetail"
        :column-filter-selected-default="'a.nombreArticulo'"
        @on-change-field="onChangeField"
        @on-search-for-value="onSearchForValue"
      />
      <table-good-component
        :title-notification="titleNotificationPointSaleTributeDetail"
        :columns="columnsPointSaleTributeDetail"
        :server-query="serverQueryPointSaleTributeDetail"
        :data-table="dataTablePointSaleTributeDetail"
        :load-items="loadItemsPointSaleTributeDetail"
      />
    </field-set-component>
  </b-modal>
</template>

<script>
import {
  BModal,
} from 'bootstrap-vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import {
  MODAL_ID, columnsPointSaleTributeDetail, dataTablePointSaleTributeDetail, serverQueryPointSaleTributeDetail, columnsFilterPointSaleTributeDetail, titleNotificationPointSaleTributeDetail, clearDataTablePointSaleTributeDetail,
} from '../../../../ServicesPointSaleTributeDetail/useVariablesPointSaleTributeDetail'
import {
  loadItemsPointSaleTributeDetail,
} from '../../../../ServicesPointSaleTributeDetail/useServicesPointSaleTributeDetail'

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
  setup(props) {
    let timer = null
    const timeForLoad = 500

    const showModal = () => {
      clearDataTablePointSaleTributeDetail()
      serverQueryPointSaleTributeDetail.value.campofiltro = ''
      serverQueryPointSaleTributeDetail.value.filtro = ''
      loadItemsPointSaleTributeDetail()
    }

    const onChangeField = (field, value) => {
      serverQueryPointSaleTributeDetail.value.opcional = props.serverQueryOpcional || ''
      serverQueryPointSaleTributeDetail.value.campofiltro = field
      serverQueryPointSaleTributeDetail.value.filtro = value
      serverQueryPointSaleTributeDetail.value.filtrofecha = props.serverQueryFiltroFecha
      serverQueryPointSaleTributeDetail.value.finicio = props.serverQueryFinicio
      serverQueryPointSaleTributeDetail.value.ffin = props.serverQueryFfin
      loadItemsPointSaleTributeDetail(1)
    }

    const onSearchForValue = (field, value) => {
      serverQueryPointSaleTributeDetail.value.opcional = props.serverQueryOpcional || ''
      dataTablePointSaleTributeDetail.value.loading = true
      clearTimeout(timer)
      serverQueryPointSaleTributeDetail.value.campofiltro = field
      serverQueryPointSaleTributeDetail.value.filtro = value
      serverQueryPointSaleTributeDetail.value.filtrofecha = props.serverQueryFiltroFecha
      serverQueryPointSaleTributeDetail.value.finicio = props.serverQueryFinicio
      serverQueryPointSaleTributeDetail.value.ffin = props.serverQueryFfin
      timer = setTimeout(() => {
        loadItemsPointSaleTributeDetail(1)
      }, timeForLoad)
    }

    return {
      MODAL_ID,
      columnsPointSaleTributeDetail,
      columnsFilterPointSaleTributeDetail,
      dataTablePointSaleTributeDetail,
      serverQueryPointSaleTributeDetail,
      loadItemsPointSaleTributeDetail,
      titleNotificationPointSaleTributeDetail,
      showModal,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
#modal-point-sale-tribute-detail {
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
