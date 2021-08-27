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
        :columns-filter="columnsFilterArticle"
        :column-filter-selected-default="'a.sku'"
        @on-change-field="onChangeField"
        @on-search-for-value="onSearchForValue"
      />
      <table-good-component
        :title-notification="titleNotificationArticle"
        :columns="columnsArticle"
        :server-query="serverQueryArticle"
        :data-table="dataTableArticle"
        :load-items="loadItemsArticle"
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
  MODAL_ID, stateArticle, columnsArticle, dataTableArticle, serverQueryArticle, columnsFilterArticle, titleNotificationArticle, clearDataTableArticle,
} from './useVariablesArticle'
import { getArticleById, loadItemsArticle } from './useServicesArticle'

export default {
  name: 'ModalQueryArticle',
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
      clearDataTableArticle()
      serverQueryArticle.value.campofiltro = ''
      serverQueryArticle.value.filtro = ''
      loadItemsArticle(1)
    }

    const rowSelected = async row => {
      stateArticle.value = { ...stateArticle.value, ...row }
      dataTableArticle.value.loading = true
      await getArticleById(row._id)
      dataTableArticle.value.loading = false
      stateArticle.value.nombre = row.nombre
      context.emit('on-article-selected', stateArticle.value)
      context.root.$bvModal.hide(MODAL_ID)
    }

    const onChangeField = (field, value) => {
      serverQueryArticle.value.opcional = props.serverQueryOpcional || ''
      serverQueryArticle.value.campofiltro = field
      serverQueryArticle.value.filtro = value
      loadItemsArticle(1)
    }

    const onSearchForValue = (field, value) => {
      serverQueryArticle.value.opcional = props.serverQueryOpcional || ''
      dataTableArticle.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryArticle.value.campofiltro = field
        serverQueryArticle.value.filtro = value
        loadItemsArticle(1)
      }, timeForLoad)
    }

    return {
      MODAL_ID,
      columnsArticle,
      columnsFilterArticle,
      dataTableArticle,
      serverQueryArticle,
      loadItemsArticle,
      stateArticle,
      titleNotificationArticle,
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
#modal-query-article {
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
