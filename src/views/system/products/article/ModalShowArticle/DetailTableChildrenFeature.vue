<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    size="lg"
    :title="`Ver ${titleNotificationArticleChildrenFeatureDetail}`"
    no-close-on-backdrop
    @show="modalShow"
  >
    <field-set-component legend="Listado">
      <header-search-detail-component
        id="header-search-children-feature"
        :columns-filter="columnsFilterArticleChildrenFeatureDetail"
        :column-filter-selected-default="'_id'"
        @on-change-field="onChangeField"
        @on-search-for-value="onSearchForValue"
      />
      <table-good-component
        :columns="columnsArticleChildrenFeatureDetailForShow"
        :server-query="serverQueryArticleChildrenFeatureDetail"
        :data-table="dataTableArticleChildrenFeatureDetail"
        :load-items="loadItemsArticleChildrenFeatureDetail"
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
  titleNotificationArticleChildrenFeatureDetail,
  columnsArticleChildrenFeatureDetailForShow,
  serverQueryArticleChildrenFeatureDetail,
  dataTableArticleChildrenFeatureDetail,
  columnsFilterArticleChildrenFeatureDetail,
  clearDataTableArticleChildrenFeatureDetail,
} from '../ServicesArticleChildrenFeatureDetail/useVariablesArticleChildrenFeatureDetail'
import { loadItemsArticleChildrenFeatureDetail } from '../ServicesArticleChildrenFeatureDetail/useServicesArticleChildrenFeatureDetail'

export default {
  name: 'ModalShowArticleChildrenFeatureDetail',
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
      clearDataTableArticleChildrenFeatureDetail()
      loadItemsArticleChildrenFeatureDetail(1)
    }

    const onChangeField = (field, value) => {
      serverQueryArticleChildrenFeatureDetail.value.campofiltro = field
      serverQueryArticleChildrenFeatureDetail.value.filtro = value
      if (value) {
        loadItemsArticleChildrenFeatureDetail(1)
      }
    }

    const onSearchForValue = (field, value) => {
      dataTableArticleChildrenFeatureDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryArticleChildrenFeatureDetail.value.campofiltro = field
        serverQueryArticleChildrenFeatureDetail.value.filtro = value
        loadItemsArticleChildrenFeatureDetail(1)
      }, timeForLoad)
    }

    return {
      MODAL_ID,
      titleNotificationArticleChildrenFeatureDetail,
      columnsArticleChildrenFeatureDetailForShow,
      serverQueryArticleChildrenFeatureDetail,
      dataTableArticleChildrenFeatureDetail,
      loadItemsArticleChildrenFeatureDetail,
      columnsFilterArticleChildrenFeatureDetail,
      onChangeField,
      onSearchForValue,
      modalShow,
    }
  },
}
</script>

<style lang="scss">
#modal-article-children-detail-show {
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
