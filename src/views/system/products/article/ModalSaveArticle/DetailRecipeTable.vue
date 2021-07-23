<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      v-if="stateArticle._id"
      id="header-search-recipe"
      :columns-filter="columnsFilterArticleRecipeDetail"
      :column-filter-selected-default="'a.nombrereceta'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :title-notification="titleNotificationArticleRecipeDetail"
      :columns="columnsArticleRecipeDetail"
      :server-query="serverQueryArticleRecipeDetail"
      :data-table="dataTableArticleRecipeDetail"
      :load-items="loadItemsArticleRecipeDetail"
      :manage-row="sendArticleRecipeDetail"
      :pagination-enabled="!!stateArticle._id"
      :option-show="false"
      @open-modal-for-edit="openModalForEdit"
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
  columnsArticleRecipeDetail, serverQueryArticleRecipeDetail, dataTableArticleRecipeDetail, columnsFilterArticleRecipeDetail, titleNotificationArticleRecipeDetail, stateArticleRecipeDetail, combosArticleRecipeDetail,
} from '../ServicesArticleRecipeDetail/useVariablesArticleRecipeDetail'
import { getArticleRecipeDetailById, loadItemsArticleRecipeDetail, sendArticleRecipeDetail } from '../ServicesArticleRecipeDetail/useServicesArticleRecipeDetail'

export default {
  name: 'DetailTableRecipe',
  components: {
    FieldSetComponent,
    TableGoodComponent,
    HeaderSearchDetailComponent,
  },
  setup() {
    let timer = null
    const timeForLoad = 500

    const openModalForEdit = async ({ _id, nombreArticulo }) => {
      dataTableArticleRecipeDetail.value.loading = true
      const { status, data } = await getArticleRecipeDetailById(_id)
      if (status) {
        stateArticleRecipeDetail.value.idGrupoUnidad = data.idGrupoUnidad
        await loadCombos(combosArticleRecipeDetail, ['unitMeasure'], `${endPointsCombo.grupoUnidad}/${stateArticleRecipeDetail.value.idGrupoUnidad}`, 'Unidad de Medida')
        stateArticleRecipeDetail.value = { ...stateArticleRecipeDetail.value, ...data }
        stateArticleRecipeDetail.value.nombreReceta = nombreArticulo
      }
      dataTableArticleRecipeDetail.value.loading = false
    }

    const onChangeField = (field, value) => {
      serverQueryArticleRecipeDetail.value.campofiltro = field
      serverQueryArticleRecipeDetail.value.filtro = value
      loadItemsArticleRecipeDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableArticleRecipeDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryArticleRecipeDetail.value.campofiltro = field
        serverQueryArticleRecipeDetail.value.filtro = value
        loadItemsArticleRecipeDetail(1)
      }, timeForLoad)
    }

    return {
      stateArticle,
      columnsArticleRecipeDetail,
      serverQueryArticleRecipeDetail,
      dataTableArticleRecipeDetail,
      loadItemsArticleRecipeDetail,
      sendArticleRecipeDetail,
      columnsFilterArticleRecipeDetail,
      titleNotificationArticleRecipeDetail,
      openModalForEdit,
      onChangeField,
      onSearchForValue,
    }
  },
}
</script>
