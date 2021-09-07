<template>
  <b-row>
    <b-col>
      <search-product-component
        :column-filter-selected-default="'a._id'"
        :title-notification="titleNotificationArticle"
        :server-query.sync="serverQueryArticle"
        :columns-filter="columnsFilterArticle"
        :clear-filters="clearFiltersArticle"
        :load-items="loadItemArticle"
        @search-product="searchProduct"
      />
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import SearchProductComponent from './SearchProductComponent.vue'
import {
  MODAL_ID, stateArticle, clearFiltersArticle, columnsArticle, dataTableArticle, serverQueryArticle, columnsFilterArticle, titleNotificationArticle,
} from './useVariablesArticle'
import { getArticleById, loadItemsArticle, loadItemArticle } from './useServicesArticle'

export default {
  components: {
    SearchProductComponent,
    BRow,
    BCol,
  },
  setup(props, context) {
    let timer = null
    const timeForLoad = 500
    const rowSelected = async row => {
      console.log('mensaje')
      stateArticle.value = { ...stateArticle.value, ...row }
      dataTableArticle.value.loading = true
      await getArticleById(row._id)
      dataTableArticle.value.loading = false
      stateArticle.value.nombre = row.nombre
      context.emit('on-article-selected', stateArticle.value)
    }

    const searchProduct = () => {
      stateArticle.value = { ...stateArticle.value }
      console.log(stateArticle.value[0])
      context.emit('on-article-selected', stateArticle.value[0])
    }

    const onChangeField = (field, value) => {
      serverQueryArticle.value.opcional = props.serverQueryOpcional || ''
      serverQueryArticle.value.campofiltro = field
      serverQueryArticle.value.filtro = value
      loadItemArticle(1)
    }
    const onSearchForValue = (field, value) => {
      serverQueryArticle.value.opcional = props.serverQueryOpcional || ''
      dataTableArticle.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryArticle.value.campofiltro = field
        serverQueryArticle.value.filtro = value
        loadItemArticle(1)
      }, timeForLoad)
    }
    return {
      MODAL_ID,
      columnsArticle,
      columnsFilterArticle,
      dataTableArticle,
      serverQueryArticle,
      stateArticle,
      titleNotificationArticle,
      onChangeField,
      loadItemsArticle,
      loadItemArticle,
      onSearchForValue,
      rowSelected,
      searchProduct,
      clearFiltersArticle,
    }
  },
}
</script>

<style>

</style>
