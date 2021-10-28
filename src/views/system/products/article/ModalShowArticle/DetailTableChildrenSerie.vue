<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    size="lg"
    :title="`Ver ${titleNotificationArticleChildrenSerieDetail}`"
    no-close-on-backdrop
    @show="modalShow"
  >
    <field-set-component legend="Listado">
      <header-search-detail-component
        id="header-search-children-serie-detail"
        :columns-filter="columnsFilterArticleChildrenSerieDetail"
        :column-filter-selected-default="'a.serie'"
        @on-change-field="onChangeField"
        @on-search-for-value="onSearchForValue"
      />
      <table-good-component
        :columns="columnsArticleChildrenSerieDetailForShow"
        :server-query="serverQueryArticleChildrenSerieDetail"
        :data-table="dataTableArticleChildrenSerieDetail"
        :load-items="loadItemsArticleChildrenSerieDetail"
        :option-status="false"
        :option-edit="false"
        :option-delete="false"
      />
    </field-set-component>
    <template #modal-footer>
      <button-component
        variant="primary"
        icon-button="PowerIcon"
        text-default="Cerrar"
        :method-function="()=>$bvModal.hide(`${MODAL_ID}-show`)"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal,
} from 'bootstrap-vue'
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import {
  MODAL_ID,
  titleNotificationArticleChildrenSerieDetail,
  columnsArticleChildrenSerieDetailForShow,
  serverQueryArticleChildrenSerieDetail,
  dataTableArticleChildrenSerieDetail,
  columnsFilterArticleChildrenSerieDetail,
  clearDataTableArticleChildrenSerieDetail,
} from '../ServicesArticleChildrenSerieDetail/useVariablesArticleChildrenSerieDetail'
import { loadItemsArticleChildrenSerieDetail } from '../ServicesArticleChildrenSerieDetail/useServicesArticleChildrenSerieDetail'

export default {
  name: 'ModalShowArticleChildrenSerieDetail',
  components: {
    BModal,
    ButtonComponent,
    FieldSetComponent,
    TableGoodComponent,
    HeaderSearchDetailComponent,
  },
  setup() {
    let timer = null
    const timeForLoad = 500

    const modalShow = () => {
      clearDataTableArticleChildrenSerieDetail()
      loadItemsArticleChildrenSerieDetail(1)
    }

    const onChangeField = (field, value) => {
      serverQueryArticleChildrenSerieDetail.value.campofiltro = field
      serverQueryArticleChildrenSerieDetail.value.filtro = value
      if (value) {
        loadItemsArticleChildrenSerieDetail(1)
      }
    }

    const onSearchForValue = (field, value) => {
      dataTableArticleChildrenSerieDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryArticleChildrenSerieDetail.value.campofiltro = field
        serverQueryArticleChildrenSerieDetail.value.filtro = value
        loadItemsArticleChildrenSerieDetail(1)
      }, timeForLoad)
    }

    return {
      MODAL_ID,
      titleNotificationArticleChildrenSerieDetail,
      columnsArticleChildrenSerieDetailForShow,
      serverQueryArticleChildrenSerieDetail,
      dataTableArticleChildrenSerieDetail,
      loadItemsArticleChildrenSerieDetail,
      columnsFilterArticleChildrenSerieDetail,
      onChangeField,
      onSearchForValue,
      modalShow,
    }
  },
}
</script>

<style lang="scss">
#modal-article-children-serie-detail-show {
    .modal-dialog {
      @media screen and (min-width: 576px) {
        max-width: 700px;
        width: 90%;
      }
    }
    .modal-lg {
      @media screen and (min-width: 992px) {
        max-width: 1000px;
        width: 90%;
      }
    }
  }
</style>
