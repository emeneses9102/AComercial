<template>
  <!-- Tabla de Articulos -->
  <table-good-component
    :title-notification="titleNotificationArticle"
    :columns="columnsArticle"
    :server-query="serverQueryArticle"
    :data-table="dataTableArticle"
    :load-items="loadItemsArticle"
    :manage-row="sendArticle"
    @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    @open-modal-for-show="row=>openModalFor(row, 'show')"
  />
</template>

<script>
import { onMounted } from '@vue/composition-api'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import { endPointsCombo, loadCombos } from '@/helpers/combos'
import {
  MODAL_ID, stateArticle, columnsArticle, serverQueryArticle, dataTableArticle, titleNotificationArticle, clearStateArticle, combosArticle,
} from '../ServicesArticle/useVariablesArticle'
import { getArticleById, loadItemsArticle, sendArticle } from '../ServicesArticle/useServicesArticle'
import {
  serverQueryArticleFeatureDetail, clearStateArticleFeatureDetail, clearFiltersArticleFeatureDetail, clearDataTableArticleFeatureDetail,
} from '../ServicesArticleFeatureDetail/useVariablesArticleFeatureDetail'
import { loadItemsArticleFeatureDetail } from '../ServicesArticleFeatureDetail/useServicesArticleFeatureDetail'
import {
  serverQueryArticleRecipeDetail, clearStateArticleRecipeDetail, clearFiltersArticleRecipeDetail, clearDataTableArticleRecipeDetail,
} from '../ServicesArticleRecipeDetail/useVariablesArticleRecipeDetail'
import { loadItemsArticleRecipeDetail } from '../ServicesArticleRecipeDetail/useServicesArticleRecipeDetail'
import {
  clearDataTableArticleTributeDetail, clearFiltersArticleTributeDetail, clearStateArticleTributeDetail, serverQueryArticleTributeDetail,
} from '../ServicesArticleTributeDetail/useVariablesArticleTributeDetail'
import { loadItemsArticleTributeDetail } from '../ServicesArticleTributeDetail/useServicesArticleTributeDetail'
import { clearStateArticleBusinessDetail, serverQueryArticleBusinessDetail } from '../ServicesArticleBusinessDetail/useVariablesArticleBusinessDetail'
import { loadItemsArticleBusinessDetail } from '../ServicesArticleBusinessDetail/useServicesArticleBusinessDetail'
import {
  clearDataTableArticleChildrenDetail,
  clearFiltersArticleChildrenDetail, clearStateArticleChildrenDetail, equalizeStateArticleChildrenDetail, serverQueryArticleChildrenDetail,
} from '../ServicesArticleChildrenDetail/useVariablesArticleChildrenDetail'
import { loadItemsArticleChildrenDetail } from '../ServicesArticleChildrenDetail/useServicesArticleChildrenDetail'
import { clearDataTableArticleChildrenFeatureDetail, clearFiltersArticleChildrenFeatureDetail } from '../ServicesArticleChildrenFeatureDetail/useVariablesArticleChildrenFeatureDetail'

export default {
  name: 'TableArticle',
  components: {
    TableGoodComponent,
  },
  setup(props, context) {
    // Función que se ejecutará cuando el usuario haga click en el botón editar o ver
    const openModalFor = async ({ ...row }, actionOpenModal) => {
      dataTableArticle.value.loading = true
      clearStateArticle()
      clearStateArticleFeatureDetail()
      clearFiltersArticleFeatureDetail()
      clearDataTableArticleFeatureDetail()
      clearStateArticleRecipeDetail()
      clearFiltersArticleRecipeDetail()
      clearDataTableArticleRecipeDetail()
      clearStateArticleTributeDetail()
      clearFiltersArticleTributeDetail()
      clearDataTableArticleTributeDetail()
      clearStateArticleBusinessDetail()
      clearFiltersArticleChildrenDetail()
      clearDataTableArticleChildrenDetail()
      clearStateArticleChildrenDetail()
      clearFiltersArticleChildrenFeatureDetail()
      clearDataTableArticleChildrenFeatureDetail()
      serverQueryArticleFeatureDetail.value.indice = row._id
      serverQueryArticleRecipeDetail.value.indice = row._id
      serverQueryArticleTributeDetail.value.indice = row._id
      serverQueryArticleBusinessDetail.value.indice = row._id
      serverQueryArticleChildrenDetail.value.indice = row._id

      if (actionOpenModal === 'show') {
        stateArticle.value = { ...stateArticle.value, ...row }
        await Promise.all([
          loadItemsArticleFeatureDetail(1),
          loadItemsArticleRecipeDetail(1),
          loadItemsArticleTributeDetail(1),
          loadItemsArticleBusinessDetail(1),
          loadItemsArticleChildrenDetail(1),
        ])
      } else if (actionOpenModal === 'edit') {
        stateArticle.value = { ...stateArticle.value, ...row }
        await Promise.all([
          getArticleById(row._id),
          loadCombos(combosArticle, ['unitMeasure'], `${endPointsCombo.grupoUnidad}/${stateArticle.value.idGrupoUnidad}`, 'Unidad de Medida'),
          loadItemsArticleFeatureDetail(1),
          loadItemsArticleRecipeDetail(1),
          loadItemsArticleTributeDetail(1),
          loadItemsArticleBusinessDetail(1),
          loadItemsArticleChildrenDetail(1),
        ])
        equalizeStateArticleChildrenDetail()
      }
      if (!stateArticle.value.imagen) stateArticle.value.imagen = ''
      dataTableArticle.value.loading = false
      context.root.$bvModal.show(actionOpenModal === 'edit' ? MODAL_ID : `${MODAL_ID}-show`)
    }

    onMounted(() => {
      loadItemsArticle()
    })

    return {
      columnsArticle,
      serverQueryArticle,
      dataTableArticle,
      loadItemsArticle,
      titleNotificationArticle,
      sendArticle,
      openModalFor,
    }
  },
}
</script>
