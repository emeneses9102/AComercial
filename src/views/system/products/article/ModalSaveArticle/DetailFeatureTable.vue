<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      v-if="stateArticle._id"
      id="header-search-feature"
      :columns-filter="columnsFilterArticleFeatureDetail"
      :column-filter-selected-default="'a.nombrecaracteristica'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :title-notification="titleNotificationArticleFeatureDetail"
      :columns="columnsArticleFeatureDetail"
      :server-query="serverQueryArticleFeatureDetail"
      :data-table="dataTableArticleFeatureDetail"
      :load-items="loadItemsArticleFeatureDetail"
      :manage-row="sendArticleFeatureDetail"
      :pagination-enabled="!!stateArticle._id"
      :option-edit="false"
      :option-show="false"
    />
  </field-set-component>
</template>

<script>
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import { stateArticle } from '../ServicesArticle/useVariablesArticle'
import {
  columnsArticleFeatureDetail, serverQueryArticleFeatureDetail, dataTableArticleFeatureDetail, columnsFilterArticleFeatureDetail, titleNotificationArticleFeatureDetail,
} from '../ServicesArticleFeatureDetail/useVariablesArticleFeatureDetail'
import { loadItemsArticleFeatureDetail, sendArticleFeatureDetail } from '../ServicesArticleFeatureDetail/useServicesArticleFeatureDetail'

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

    const onChangeField = (field, value) => {
      serverQueryArticleFeatureDetail.value.campofiltro = field
      serverQueryArticleFeatureDetail.value.filtro = value
      loadItemsArticleFeatureDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableArticleFeatureDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryArticleFeatureDetail.value.campofiltro = field
        serverQueryArticleFeatureDetail.value.filtro = value
        loadItemsArticleFeatureDetail(1)
      }, timeForLoad)
    }

    return {
      stateArticle,
      columnsArticleFeatureDetail,
      serverQueryArticleFeatureDetail,
      dataTableArticleFeatureDetail,
      loadItemsArticleFeatureDetail,
      sendArticleFeatureDetail,
      columnsFilterArticleFeatureDetail,
      titleNotificationArticleFeatureDetail,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
