<template>
  <b-modal
    :id="MODAL_ID"
    centered
    size="lg"
    :title="`${stateArticle._id ? 'Modificar' : 'Registrar'} ${titleNotificationArticle}`"
    no-close-on-backdrop
  >
    <b-tabs>
      <b-tab>
        <template #title>
          <feather-icon icon="UserIcon" />
          <span class="d-none d-md-inline">General</span>
        </template>
        <validation-observer
          ref="validation-article"
        >
          <header-article />
        </validation-observer>
      </b-tab>
      <b-tab>
        <template #title>
          <feather-icon icon="UserIcon" />
          <span class="d-none d-md-inline">Característica</span>
        </template>
        <detail-feature
          class="mt-1"
          :send-header="sendForm"
        />
        <detail-feature-table class="mt-1" />
      </b-tab>
      <b-tab>
        <template #title>
          <feather-icon icon="UserIcon" />
          <span class="d-none d-md-inline">Receta</span>
        </template>
        <detail-recipe
          class="mt-1"
          :send-header="sendForm"
        />
        <detail-recipe-table class="mt-1" />
      </b-tab>
      <b-tab>
        <template #title>
          <feather-icon icon="UserIcon" />
          <span class="d-none d-md-inline">Tributo</span>
        </template>
        <detail-tribute
          class="mt-1"
          :send-header="sendForm"
        />
        <detail-tribute-table class="mt-1" />
      </b-tab>
    </b-tabs>

    <template #modal-footer>
      <button-component
        variant="outline-primary"
        icon-button="PowerIcon"
        text-default="Cerrar"
        :method-function="()=>$bvModal.hide(MODAL_ID)"
      />
      <button-component
        v-if="stateArticle._id"
        variant="outline-primary"
        icon-button="HashIcon"
        text-default="Código de Barras"
        :method-function="()=>$bvModal.show(`${MODAL_ID}-bar-code`)"
      />
      <button-component
        variant="primary"
        icon-button="SaveIcon"
        :loading="stateArticle.loading"
        text-default="Guardar"
        :method-function="()=>sendForm()"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal, BTabs, BTab,
} from 'bootstrap-vue'
import { ValidationObserver } from 'vee-validate'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import HeaderArticle from './HeaderArticle.vue'
import DetailFeature from './DetailFeature.vue'
import DetailFeatureTable from './DetailFeatureTable.vue'
import DetailRecipe from './DetailRecipe.vue'
import DetailRecipeTable from './DetailRecipeTable.vue'
import DetailTribute from './DetailTribute.vue'
import DetailTributeTable from './DetailTributeTable.vue'
import {
  MODAL_ID, titleNotificationArticle, stateArticle, selectedArticleType,
} from '../ServicesArticle/useVariablesArticle'
import { loadItemsArticle, sendArticle } from '../ServicesArticle/useServicesArticle'
import { serverQueryArticleFeatureDetail } from '../ServicesArticleFeatureDetail/useVariablesArticleFeatureDetail'
import { serverQueryArticleRecipeDetail } from '../ServicesArticleRecipeDetail/useVariablesArticleRecipeDetail'

export default {
  name: 'ModalSaveArticle',
  components: {
    BModal,
    BTabs,
    BTab,
    HeaderArticle,
    DetailFeature,
    DetailFeatureTable,
    DetailRecipe,
    DetailRecipeTable,
    DetailTribute,
    DetailTributeTable,
    ButtonComponent,
    ValidationObserver,
  },
  setup(props, context) {
    const sendForm = async (actionSend = null, loading = true) => {
      if (selectedArticleType.value === 'stock') stateArticle.value.idTipoServicio = 0
      const successValidationArticle = await context.refs['validation-article'].validate()
      if (!successValidationArticle) return false
      if (loading) stateArticle.value.loading = true
      const { status, data } = await sendArticle(actionSend || (stateArticle.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateArticle.value.loading = false
      if (!status) return false
      stateArticle.value._id = data.id
      serverQueryArticleFeatureDetail.value.indice = data.id
      serverQueryArticleRecipeDetail.value.indice = data.id
      await loadItemsArticle()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationArticle,
      stateArticle,
      sendForm,
    }
  },
}
</script>

<style lang="scss">
#modal-article {
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
