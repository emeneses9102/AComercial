<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      v-if="stateArticle._id"
      id="header-search-children-feature"
      :columns-filter="columnsFilterArticleChildrenFeatureDetail"
      :column-filter-selected-default="'a.nombrecaracteristica'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :title-notification="titleNotificationArticleChildrenFeatureDetail"
      :columns="columnsArticleChildrenFeatureDetail"
      :server-query="serverQueryArticleChildrenFeatureDetail"
      :data-table="dataTableArticleChildrenFeatureDetail"
      :load-items="loadItemsArticleChildrenFeatureDetail"
      :manage-row="sendArticleChildrenFeatureDetail"
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
import { endPointsCombo, loadCombos } from '@/helpers/combos'
import { stateArticle } from '../ServicesArticle/useVariablesArticle'
import {
  columnsArticleChildrenFeatureDetail, serverQueryArticleChildrenFeatureDetail, dataTableArticleChildrenFeatureDetail, columnsFilterArticleChildrenFeatureDetail, titleNotificationArticleChildrenFeatureDetail, stateArticleChildrenFeatureDetail, combosArticleChildrenFeatureDetail,
} from '../ServicesArticleChildrenFeatureDetail/useVariablesArticleChildrenFeatureDetail'
import { getArticleChildrenFeatureDetailById, loadItemsArticleChildrenFeatureDetail, sendArticleChildrenFeatureDetail } from '../ServicesArticleChildrenFeatureDetail/useServicesArticleChildrenFeatureDetail'

export default {
  name: 'DetailTableChildrenFeature',
  components: {
    FieldSetComponent,
    TableGoodComponent,
    HeaderSearchDetailComponent,
  },
  setup() {
    let timer = null
    const timeForLoad = 500

    const openModalFor = async ({ _id }) => {
      dataTableArticleChildrenFeatureDetail.value.loading = true
      const { status, data } = await getArticleChildrenFeatureDetailById(_id)
      if (!status) {
        dataTableArticleChildrenFeatureDetail.value.loading = false
        return false
      }
      await loadCombos(combosArticleChildrenFeatureDetail, ['featureDetail'], `${endPointsCombo.detalleCaracteristica}/1/${data.idCaracteristica}/0`, 'Valores Característica')
      stateArticleChildrenFeatureDetail.value._id = data._id
      stateArticleChildrenFeatureDetail.value.idTArticulo = data.idArticulo
      stateArticleChildrenFeatureDetail.value.idCaracteristica = data.idCaracteristica
      stateArticleChildrenFeatureDetail.value.idDtlCaracteristica = data.idDtlCaracteristica
      stateArticleChildrenFeatureDetail.value.orden = data.orden
      dataTableArticleChildrenFeatureDetail.value.loading = false
      return true
    }

    const onChangeField = (field, value) => {
      serverQueryArticleChildrenFeatureDetail.value.campofiltro = field
      serverQueryArticleChildrenFeatureDetail.value.filtro = value
      loadItemsArticleChildrenFeatureDetail(1)
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
      stateArticle,
      columnsArticleChildrenFeatureDetail,
      serverQueryArticleChildrenFeatureDetail,
      dataTableArticleChildrenFeatureDetail,
      loadItemsArticleChildrenFeatureDetail,
      sendArticleChildrenFeatureDetail,
      columnsFilterArticleChildrenFeatureDetail,
      titleNotificationArticleChildrenFeatureDetail,
      openModalFor,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
