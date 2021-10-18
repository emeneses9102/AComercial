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
import { serverQueryArticleFeatureDetail, clearStateArticleFeatureDetail, clearFiltersArticleFeatureDetail } from '../ServicesArticleFeatureDetail/useVariablesArticleFeatureDetail'
import { loadItemsArticleFeatureDetail } from '../ServicesArticleFeatureDetail/useServicesArticleFeatureDetail'
import { serverQueryArticleRecipeDetail, clearStateArticleRecipeDetail, clearFiltersArticleRecipeDetail } from '../ServicesArticleRecipeDetail/useVariablesArticleRecipeDetail'
import { loadItemsArticleRecipeDetail } from '../ServicesArticleRecipeDetail/useServicesArticleRecipeDetail'
import { clearFiltersArticleTributeDetail, clearStateArticleTributeDetail, serverQueryArticleTributeDetail } from '../ServicesArticleTributeDetail/useVariablesArticleTributeDetail'
import { loadItemsArticleTributeDetail } from '../ServicesArticleTributeDetail/useServicesArticleTributeDetail'
import { clearStateArticleBusinessDetail, serverQueryArticleBusinessDetail } from '../ServicesArticleBusinessDetail/useVariablesArticleBusinessDetail'
import { loadItemsArticleBusinessDetail } from '../ServicesArticleBusinessDetail/useServicesArticleBusinessDetail'

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
      if (actionOpenModal === 'show') {
        stateArticle.value = { ...stateArticle.value, ...row }
      } else if (actionOpenModal === 'edit') {
        stateArticle.value = { ...stateArticle.value, ...row }
        await getArticleById(row._id)
        await loadCombos(combosArticle, ['unitMeasure'], `${endPointsCombo.grupoUnidad}/${stateArticle.value.idGrupoUnidad}`, 'Unidad de Medida')
      }
      if (!stateArticle.value.imagen) stateArticle.value.imagen = ''
      clearStateArticleFeatureDetail()
      clearFiltersArticleFeatureDetail()
      clearStateArticleRecipeDetail()
      clearFiltersArticleRecipeDetail()
      clearStateArticleTributeDetail()
      clearFiltersArticleTributeDetail()
      clearStateArticleBusinessDetail()
      serverQueryArticleFeatureDetail.value.indice = row._id
      serverQueryArticleRecipeDetail.value.indice = row._id
      serverQueryArticleTributeDetail.value.indice = row._id
      serverQueryArticleBusinessDetail.value.indice = row._id
      await Promise.all([
        loadItemsArticleFeatureDetail(1),
        loadItemsArticleRecipeDetail(1),
        loadItemsArticleTributeDetail(1),
        loadItemsArticleBusinessDetail(1),
      ])
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
