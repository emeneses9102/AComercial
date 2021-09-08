<template>
  <b-modal
    :id="MODAL_ID"
    centered
    title="Consultar Socio"
    ok-title="Ok"
    cancel-title="Cerrar"
    cancel-variant="outline-primary"
    no-close-on-backdrop
    size="lg"
    @show="showModal"
  >
    <field-set-component
      legend="Consultar Socio"
    >
      <header-search-detail-component
        :columns-filter="columnsFilterPartner"
        :column-filter-selected-default="'a.nombres'"
        @on-change-field="onChangeField"
        @on-search-for-value="onSearchForValue"
      />
      <table-good-component
        :title-notification="titleNotificationPartner"
        :columns="columnsPartner"
        :server-query="serverQueryPartner"
        :data-table="dataTablePartner"
        :load-items="loadItemsPartner"
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
  MODAL_ID, statePartner, columnsPartner, dataTablePartner, serverQueryPartner, columnsFilterPartner, titleNotificationPartner, clearDataTablePartner,
} from './useVariablesPartner'
import { getPartnerById, loadItemsPartner } from './useServicesPartner'

export default {
  name: 'ModalQueryPartner',
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
      clearDataTablePartner()
      serverQueryPartner.value.campofiltro = ''
      serverQueryPartner.value.filtro = ''
    }

    const rowSelected = async row => {
      statePartner.value = { ...statePartner.value, ...row }
      dataTablePartner.value.loading = true
      await getPartnerById(row._id)
      dataTablePartner.value.loading = false
      statePartner.value.nombre = row.nombre
      context.emit('on-partner-selected', statePartner.value)
      context.root.$bvModal.hide(MODAL_ID)
    }

    const onChangeField = (field, value) => {
      serverQueryPartner.value.opcional = props.serverQueryOpcional || ''
      serverQueryPartner.value.campofiltro = field
      serverQueryPartner.value.filtro = value
      if (serverQueryPartner.value.filtro === '') {
        clearDataTablePartner()
      } else {
        loadItemsPartner(1)
      }
    }

    const onSearchForValue = (field, value) => {
      serverQueryPartner.value.opcional = props.serverQueryOpcional || ''
      dataTablePartner.value.loading = true
      clearTimeout(timer)
      serverQueryPartner.value.campofiltro = field
      serverQueryPartner.value.filtro = value
      if (serverQueryPartner.value.filtro === '') {
        clearDataTablePartner()
      } else {
        timer = setTimeout(() => {
          loadItemsPartner(1)
        }, timeForLoad)
      }
    }

    return {
      MODAL_ID,
      columnsPartner,
      columnsFilterPartner,
      dataTablePartner,
      serverQueryPartner,
      loadItemsPartner,
      statePartner,
      titleNotificationPartner,
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
#modal-query-partner {
  .modal-dialog {
    @media screen and (min-width: 576px) {
      max-width: 700px;
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
