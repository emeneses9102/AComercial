<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      v-if="stateArticle._id"
      id="header-search-feature"
      :columns-filter="columnsFilterArticleBusinessDetail"
      :column-filter-selected-default="'_id'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :title-notification="titleNotificationArticleBusinessDetail"
      :columns="columnsArticleBusinessDetail"
      :server-query="serverQueryArticleBusinessDetail"
      :data-table="dataTableArticleBusinessDetail"
      :load-items="loadItemsArticleBusinessDetail"
      :manage-row="sendArticleBusinessDetail"
      :pagination-enabled="!!stateArticle._id"
      :option-show="false"
      @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import { stateArticle } from '../ServicesArticle/useVariablesArticle'
import {
  columnsArticleBusinessDetail, serverQueryArticleBusinessDetail, dataTableArticleBusinessDetail, columnsFilterArticleBusinessDetail, titleNotificationArticleBusinessDetail, stateArticleBusinessDetail,
} from '../ServicesArticleBusinessDetail/useVariablesArticleBusinessDetail'
import { getArticleBusinessDetailById, loadItemsArticleBusinessDetail, sendArticleBusinessDetail } from '../ServicesArticleBusinessDetail/useServicesArticleBusinessDetail'

export default {
  name: 'DetailTableFeature',
  components: {
    FieldSetComponent,
    TableGoodComponent,
    HeaderSearchDetailComponent,
  },
  setup() {
    let timer = null
    const timeForLoad = 500

    const openModalFor = async ({ _id }) => {
      dataTableArticleBusinessDetail.value.loading = true
      const { status, data } = await getArticleBusinessDetailById(_id)
      if (!status) {
        dataTableArticleBusinessDetail.value.loading = false
        return false
      }
      stateArticleBusinessDetail.value._id = data._id
      stateArticleBusinessDetail.value.idArticulo = data.idArticulo
      stateArticleBusinessDetail.value.idNegocio = data.idNegocio
      dataTableArticleBusinessDetail.value.loading = false
      return true
    }

    const onChangeField = (field, value) => {
      serverQueryArticleBusinessDetail.value.campofiltro = field
      serverQueryArticleBusinessDetail.value.filtro = value
      loadItemsArticleBusinessDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableArticleBusinessDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryArticleBusinessDetail.value.campofiltro = field
        serverQueryArticleBusinessDetail.value.filtro = value
        loadItemsArticleBusinessDetail(1)
      }, timeForLoad)
    }

    return {
      stateArticle,
      columnsArticleBusinessDetail,
      serverQueryArticleBusinessDetail,
      dataTableArticleBusinessDetail,
      loadItemsArticleBusinessDetail,
      sendArticleBusinessDetail,
      columnsFilterArticleBusinessDetail,
      titleNotificationArticleBusinessDetail,
      openModalFor,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
