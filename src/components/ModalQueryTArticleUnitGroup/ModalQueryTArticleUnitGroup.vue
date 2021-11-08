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
        :columns-filter="columnsFilterTArticleUnitGroup"
        :column-filter-selected-default="'a.nombreTablaArticulo'"
        @on-change-field="onChangeField"
        @on-search-for-value="onSearchForValue"
      />
      <table-good-component
        :title-notification="titleNotificationTArticleUnitGroup"
        :columns="columnsTArticleUnitGroup"
        :server-query="serverQueryTArticleUnitGroup"
        :data-table="dataTableTArticleUnitGroup"
        :load-items="loadItemsTArticleUnitGroup"
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
  MODAL_ID, stateTArticleUnitGroup, columnsTArticleUnitGroup, dataTableTArticleUnitGroup, serverQueryTArticleUnitGroup, columnsFilterTArticleUnitGroup, titleNotificationTArticleUnitGroup, clearDataTableTArticleUnitGroup,
} from './useVariablesTArticleUnitGroup'
import { getTArticleUnitGroupById, loadItemsTArticleUnitGroup } from './useServicesTArticleUnitGroup'

export default {
  name: 'ModalQueryTableTArticleUnitGroup',
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
      clearDataTableTArticleUnitGroup()
      serverQueryTArticleUnitGroup.value.campofiltro = ''
      serverQueryTArticleUnitGroup.value.filtro = ''
    }

    const rowSelected = async row => {
      stateTArticleUnitGroup.value = { ...stateTArticleUnitGroup.value, ...row }
      dataTableTArticleUnitGroup.value.loading = true
      await getTArticleUnitGroupById(row._id)
      dataTableTArticleUnitGroup.value.loading = false
      stateTArticleUnitGroup.value.nombre = row.nombre
      context.emit('on-tarticle-unit-group-selected', stateTArticleUnitGroup.value)
      context.root.$bvModal.hide(MODAL_ID)
    }

    const onChangeField = (field, value) => {
      serverQueryTArticleUnitGroup.value.opcional = props.serverQueryOpcional || ''
      serverQueryTArticleUnitGroup.value.campofiltro = field
      serverQueryTArticleUnitGroup.value.filtro = value
      if (serverQueryTArticleUnitGroup.value.filtro === '') {
        clearDataTableTArticleUnitGroup()
      } else {
        loadItemsTArticleUnitGroup(1)
      }
    }

    const onSearchForValue = (field, value) => {
      serverQueryTArticleUnitGroup.value.opcional = props.serverQueryOpcional || ''
      dataTableTArticleUnitGroup.value.loading = true
      clearTimeout(timer)
      serverQueryTArticleUnitGroup.value.campofiltro = field
      serverQueryTArticleUnitGroup.value.filtro = value
      if (serverQueryTArticleUnitGroup.value.filtro === '') {
        clearDataTableTArticleUnitGroup()
      } else {
        timer = setTimeout(() => {
          loadItemsTArticleUnitGroup(1)
        }, timeForLoad)
      }
    }

    return {
      MODAL_ID,
      columnsTArticleUnitGroup,
      columnsFilterTArticleUnitGroup,
      dataTableTArticleUnitGroup,
      serverQueryTArticleUnitGroup,
      loadItemsTArticleUnitGroup,
      stateTArticleUnitGroup,
      titleNotificationTArticleUnitGroup,
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
#modal-query-t-TArticleUnitGroup-unit-group {
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
