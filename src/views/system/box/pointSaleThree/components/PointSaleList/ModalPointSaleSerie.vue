<template>
  <b-modal
    :id="MODAL_ID"
    centered
    size="lg"
    :title="`Ingresar ${titleNotificationPointSaleSerie}`"
    no-close-on-backdrop
    @show="showModal"
  >
    <b-tabs
      v-if="!statePointSale.cancelado && !statePointSale.cerrado && !statePointSale.anulado && !statePointSale.facturado"
    >
      <b-tab>
        <template #title>
          <feather-icon icon="SearchIcon" />
          <span class="d-none d-md-inline">Consulta</span>
        </template>
        <field-set-component legend="Consulta de Series">
          <header-search-detail-component
            id="header-search-article-serie"
            :columns-filter="columnsFilterArticleChildrenSerieDetail"
            :column-filter-selected-default="'a.serie'"
            @on-change-field="onChangeFieldArticleSerie"
            @on-search-for-value="onSearchForValueArticleSerie"
          />
          <table-good-component
            :columns="columnsArticleChildrenSerieDetailForShow"
            :server-query="serverQueryArticleChildrenSerieDetail"
            :data-table="dataTableArticleChildrenSerieDetail"
            :load-items="loadItemsArticleChildrenSerieDetail"
            @on-row-click="articleSerieSelected"
          />
        </field-set-component>
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon icon="FileTextIcon" />
          <span class="d-none d-md-inline">Listado de Serie</span>
        </template>
        <field-set-component
          legend="Consulta de Series Ingresadas"
          class="mt-1"
        >
          <header-search-detail-component
            id="header-search-point-sale-article-serie"
            :columns-filter="columnsFilterPointSaleSerie"
            :column-filter-selected-default="'a.serie'"
            @on-change-field="onChangeFieldPointSaleSerie"
            @on-search-for-value="onSearchForValuePointSaleSerie"
          />
          <table-good-component
            :title-notification="titleNotificationPointSaleSerie"
            :columns="columnsPointSaleSerie"
            :server-query="serverQueryPointSaleSerie"
            :data-table="dataTablePointSaleSerie"
            :load-items="loadItemsPointSaleSerie"
            :manage-row="sendPointSaleSerie"
            :option-status="false"
            :option-edit="false"
            :option-show="false"
            :validate-options-by-route="false"
            @delete-row="deleteRowPointSaleSerie"
          />
        </field-set-component>
      </b-tab>
    </b-tabs>

    <field-set-component
      v-else
      legend="Consulta de Series Ingresadas"
      class="mt-1"
    >
      <header-search-detail-component
        id="header-search-point-sale-show-article-serie"
        :columns-filter="columnsFilterPointSaleSerie"
        :column-filter-selected-default="'a.serie'"
        @on-change-field="onChangeFieldPointSaleSerie"
        @on-search-for-value="onSearchForValuePointSaleSerie"
      />
      <table-good-component
        :title-notification="titleNotificationPointSaleSerie"
        :columns="columnsPointSaleSerieForShow"
        :server-query="serverQueryPointSaleSerie"
        :data-table="dataTablePointSaleSerie"
        :load-items="loadItemsPointSaleSerie"
        :manage-row="sendPointSaleSerie"
        :option-status="false"
        :option-edit="false"
        :option-show="false"
        :validate-options-by-route="false"
        @delete-row="deleteRowPointSaleSerie"
      />
    </field-set-component>

    <template #modal-footer>
      <button-component
        variant="outline-primary"
        icon-button="PowerIcon"
        text-default="Cerrar"
        :method-function="()=>$bvModal.hide(MODAL_ID)"
      />
      <button-component
        variant="primary"
        icon-button="CheckIcon"
        text-default="Ok"
        :method-function="()=>$bvModal.hide(MODAL_ID)"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal,
  BTabs,
  BTab,
} from 'bootstrap-vue'
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { ACTION_REGISTER } from '@/helpers/actionsApi'
import { messageToast } from '@/helpers/messageExtensions'
import {
  statePointSale,
} from '../../ServicesPointSale/useVariablesPointSale'
import {
  columnsPointSaleSerie, serverQueryPointSaleSerie, dataTablePointSaleSerie, columnsFilterPointSaleSerie, columnsPointSaleSerieForShow, clearDataTablePointSaleSerie, clearFiltersPointSaleSerie,
  MODAL_ID, titleNotificationPointSaleSerie, statePointSaleSerie, countPointSaleDetailSelected,
} from '../../ServicesPointSaleSerieDetail/useVariablesPointSaleSerieDetail'
import { loadItemsPointSaleSerie, sendPointSaleSerie } from '../../ServicesPointSaleSerieDetail/useServicesPointSaleSerieDetail'
import {
  columnsArticleChildrenSerieDetailForShow, serverQueryArticleChildrenSerieDetail, dataTableArticleChildrenSerieDetail, columnsFilterArticleChildrenSerieDetail, clearDataTableArticleChildrenSerieDetail, clearFiltersArticleChildrenSerieDetail,
} from '../../ServicesArticleSerieDetail/useVariablesArticleSerieDetail'
import { loadItemsArticleChildrenSerieDetail } from '../../ServicesArticleSerieDetail/useServicesArticleSerieDetail'
import { listPointSaleDetail } from '../../ServicesPointSaleDetail/useVariablesPointSaleDetail'

export default {
  name: 'ModalPointSaleSerie',
  components: {
    BModal,
    BTabs,
    BTab,
    FieldSetComponent,
    TableGoodComponent,
    ButtonComponent,
    HeaderSearchDetailComponent,
  },
  setup() {
    let timerArticleSerie = null
    let timerPointSaleSerie = null
    const timeForLoad = 500

    const showModal = () => {
      clearFiltersArticleChildrenSerieDetail()
      clearDataTableArticleChildrenSerieDetail()
      clearFiltersPointSaleSerie()
      clearDataTablePointSaleSerie()
      if (!statePointSale.value.cancelado && !statePointSale.value.cerrado && !statePointSale.value.anulado && !statePointSale.value.facturado) loadItemsArticleChildrenSerieDetail(1)
      loadItemsPointSaleSerie(1)
    }

    const articleSerieSelected = async ({ _id, idTArticulo }) => {
      if (countPointSaleDetailSelected.value === dataTablePointSaleSerie.value.totalRows) {
        messageToast('warning', 'Cantidad Exacta', 'Ya ingreso la cantidad de series solicitadas')
        return false
      }
      statePointSaleSerie.value.idDArticulo = _id
      dataTableArticleChildrenSerieDetail.value.loading = true
      const { status, data } = await sendPointSaleSerie(ACTION_REGISTER)
      dataTableArticleChildrenSerieDetail.value.loading = false
      if (!status || !data) return false
      loadItemsPointSaleSerie(1)
      listPointSaleDetail.value.rows.forEach((item, index) => {
        if (item.idTArticulo === idTArticulo) {
          listPointSaleDetail.value.rows[index].scantidad += 1
        }
      })
      return true
    }

    const deleteRowPointSaleSerie = ({ idTArticulo }) => {
      listPointSaleDetail.value.rows.forEach((item, index) => {
        if (item.idTArticulo === idTArticulo) {
          listPointSaleDetail.value.rows[index].scantidad -= 1
        }
      })
    }

    const onChangeFieldArticleSerie = (field, value) => {
      serverQueryArticleChildrenSerieDetail.value.campofiltro = field
      serverQueryArticleChildrenSerieDetail.value.filtro = value
      if (value) {
        loadItemsArticleChildrenSerieDetail(1)
      }
    }

    const onSearchForValueArticleSerie = (field, value) => {
      dataTableArticleChildrenSerieDetail.value.loading = true
      clearTimeout(timerArticleSerie)
      timerArticleSerie = setTimeout(() => {
        serverQueryArticleChildrenSerieDetail.value.campofiltro = field
        serverQueryArticleChildrenSerieDetail.value.filtro = value
        loadItemsArticleChildrenSerieDetail(1)
      }, timeForLoad)
    }

    const onChangeFieldPointSaleSerie = (field, value) => {
      serverQueryPointSaleSerie.value.campofiltro = field
      serverQueryPointSaleSerie.value.filtro = value
      if (value) {
        loadItemsPointSaleSerie(1)
      }
    }

    const onSearchForValuePointSaleSerie = (field, value) => {
      dataTablePointSaleSerie.value.loading = true
      clearTimeout(timerPointSaleSerie)
      timerPointSaleSerie = setTimeout(() => {
        serverQueryPointSaleSerie.value.campofiltro = field
        serverQueryPointSaleSerie.value.filtro = value
        loadItemsPointSaleSerie(1)
      }, timeForLoad)
    }

    return {
      columnsArticleChildrenSerieDetailForShow,
      serverQueryArticleChildrenSerieDetail,
      dataTableArticleChildrenSerieDetail,
      loadItemsArticleChildrenSerieDetail,
      columnsFilterArticleChildrenSerieDetail,
      onChangeFieldArticleSerie,
      onSearchForValueArticleSerie,

      columnsPointSaleSerie,
      serverQueryPointSaleSerie,
      dataTablePointSaleSerie,
      loadItemsPointSaleSerie,
      columnsFilterPointSaleSerie,
      onChangeFieldPointSaleSerie,
      onSearchForValuePointSaleSerie,

      MODAL_ID,
      titleNotificationPointSaleSerie,
      showModal,
      sendPointSaleSerie,
      articleSerieSelected,
      deleteRowPointSaleSerie,
      columnsPointSaleSerieForShow,

      statePointSale,
    }
  },
}
</script>
