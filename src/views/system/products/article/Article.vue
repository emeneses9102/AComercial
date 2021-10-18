<template>
  <div>
    <modal-show-bar-code
      :bar-code="stateArticle.codBarra"
    />
    <modal-save-article />
    <modal-search-article />
    <modal-show-article />
    <b-card>
      <header-maintenance-component
        :modal-id="MODAL_ID"
        :clear-modal="clearModal"
        :export-data="{
          title: titleReportArticle,
          url: urlApiArticle,
          serverQuery: serverQueryArticle,
          columns: columnsArticle,
          optionsColumnsFilter: columnsFilterArticle,
        }"
      />
      <table-article />
    </b-card>
  </div>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import { onMounted } from '@vue/composition-api'
import HeaderMaintenanceComponent from '@/components/HeaderMaintenanceComponent/HeaderMaintenanceComponent.vue'
import { endPointsCombo, loadCombos, resetCombos } from '@/helpers/combos'
import ModalShowBarCode from './ModalShowBarCode/ModalShowBarCode.vue'
import ModalSaveArticle from './ModalSaveArticle/ModalSaveArticle.vue'
import ModalSearchArticle from './ModalSearchArticle/ModalSearchArticle.vue'
import ModalShowArticle from './ModalShowArticle/ModalShowArticle.vue'
import TableArticle from './TableArticle/TableArticle.vue'
import {
  MODAL_ID, clearStateArticle, columnsArticle, urlApiArticle, titleNotificationArticle, serverQueryArticle, columnsFilterArticle, titleReportArticle,
  combosArticle,
  resetSelectedArticleType,
  stateArticle,
} from './ServicesArticle/useVariablesArticle'
import {
  clearStateArticleFeatureDetail, clearDataTableArticleFeatureDetail, clearFiltersArticleFeatureDetail, combosArticleFeatureDetail,
} from './ServicesArticleFeatureDetail/useVariablesArticleFeatureDetail'
import {
  clearStateArticleRecipeDetail, clearDataTableArticleRecipeDetail, clearFiltersArticleRecipeDetail, combosArticleRecipeDetail,
} from './ServicesArticleRecipeDetail/useVariablesArticleRecipeDetail'
import {
  clearDataTableArticleTributeDetail,
  combosArticleTributeDetail,
} from './ServicesArticleTributeDetail/useVariablesArticleTributeDetail'
import {
  clearFiltersTributeFactor, clearStateTributeFactor,
} from '../../sunat/tribute/ServicesTributeFactor/useVariablesTributeFactor'
import { combosArticleBusinessDetail } from './ServicesArticleBusinessDetail/useVariablesArticleBusinessDetail'

export default {
  name: 'Article',
  components: {
    BCard,
    HeaderMaintenanceComponent,
    ModalShowBarCode,
    ModalSaveArticle,
    ModalSearchArticle,
    ModalShowArticle,
    TableArticle,
  },
  setup() {
    // Función para limpiar los datos del Modal
    const clearModal = () => {
      clearStateArticle()
      resetSelectedArticleType()
      resetCombos(combosArticle, ['unitMeasure'])
      clearStateArticleFeatureDetail()
      resetCombos(combosArticleFeatureDetail, ['featureDetail'])
      clearFiltersArticleFeatureDetail()
      clearDataTableArticleFeatureDetail()
      clearStateArticleRecipeDetail()
      resetCombos(combosArticleRecipeDetail, ['unitMeasure'])
      clearFiltersArticleRecipeDetail()
      clearDataTableArticleRecipeDetail()
      clearStateTributeFactor()
      clearFiltersTributeFactor()
      clearDataTableArticleTributeDetail()
    }

    onMounted(() => {
      loadCombos(combosArticle, ['productType'], `${endPointsCombo.tipoProducto}/1`, 'Tipo Producto')
      loadCombos(combosArticle, ['serviceType'], `${endPointsCombo.tipoServicio}/1`, 'Tipo Servicio')
      loadCombos(combosArticle, ['unitGroup'], `${endPointsCombo.grupo}/1`, 'Grupo Unidad')
      loadCombos(combosArticleFeatureDetail, ['feature'], `${endPointsCombo.caracteristica}/1`, 'Característica')
      loadCombos(combosArticleTributeDetail, ['tribute'], `${endPointsCombo.tributoSunat}/1`, 'Tributo')
      loadCombos(combosArticleBusinessDetail, ['businessUnit'], `${endPointsCombo.negocio}/1`, 'Negocio')
    })

    return {
      MODAL_ID,
      clearModal,
      columnsArticle,
      urlApiArticle,
      titleNotificationArticle,
      serverQueryArticle,
      columnsFilterArticle,
      titleReportArticle,
      stateArticle,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
