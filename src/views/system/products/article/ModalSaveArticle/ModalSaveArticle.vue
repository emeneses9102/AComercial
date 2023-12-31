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
          <feather-icon icon="FileTextIcon" />
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
          <feather-icon icon="AlertCircleIcon" />
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
          <feather-icon icon="BookIcon" />
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
          <feather-icon icon="DollarSignIcon" />
          <span class="d-none d-md-inline">Tributo</span>
        </template>
        <detail-tribute
          class="mt-1"
          :send-header="sendForm"
        />
        <detail-tribute-table class="mt-1" />
      </b-tab>
      <b-tab>
        <template #title>
          <feather-icon icon="ServerIcon" />
          <span class="d-none d-md-inline">Negocio</span>
        </template>
        <detail-business
          class="mt-1"
          :send-header="sendForm"
        />
        <detail-business-table class="mt-1" />
      </b-tab>
      <b-tab>
        <template #title>
          <feather-icon icon="ArchiveIcon" />
          <span class="d-none d-md-inline">Dar de alta</span>
        </template>
        <detail-children
          class="mt-1"
          :send-header="sendForm"
        />
        <detail-children-table class="mt-1" />
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
        v-if="(
          (!stateArticle._id && optionsPermissions.includes(GUARDAR))
          || (stateArticle._id && optionsPermissions.includes(EDITAR))
        )"
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
import { computed } from '@vue/composition-api'
import store from '@/store'
import {
  EDITAR,
  GUARDAR,
} from '@/options'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { validatePermission } from '@/helpers/validateActions'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import HeaderArticle from './HeaderArticle.vue'
import DetailFeature from './DetailFeature.vue'
import DetailFeatureTable from './DetailFeatureTable.vue'
import DetailRecipe from './DetailRecipe.vue'
import DetailRecipeTable from './DetailRecipeTable.vue'
import DetailTribute from './DetailTribute.vue'
import DetailTributeTable from './DetailTributeTable.vue'
import DetailBusiness from './DetailBusiness.vue'
import DetailBusinessTable from './DetailBusinessTable.vue'
import DetailChildren from './DetailChildren.vue'
import DetailChildrenTable from './DetailChildrenTable.vue'
import {
  MODAL_ID, titleNotificationArticle, stateArticle, selectedArticleType, routeNameArticle,
} from '../ServicesArticle/useVariablesArticle'
import { loadItemsArticle, sendArticle } from '../ServicesArticle/useServicesArticle'
import { serverQueryArticleFeatureDetail } from '../ServicesArticleFeatureDetail/useVariablesArticleFeatureDetail'
import { serverQueryArticleRecipeDetail } from '../ServicesArticleRecipeDetail/useVariablesArticleRecipeDetail'
import { serverQueryArticleTributeDetail } from '../ServicesArticleTributeDetail/useVariablesArticleTributeDetail'
import { serverQueryArticleBusinessDetail } from '../ServicesArticleBusinessDetail/useVariablesArticleBusinessDetail'
import { serverQueryArticleChildrenDetail } from '../ServicesArticleChildrenDetail/useVariablesArticleChildrenDetail'

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
    DetailBusiness,
    DetailBusinessTable,
    DetailChildren,
    DetailChildrenTable,
    ButtonComponent,
    ValidationObserver,
  },
  setup(props, context) {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNameArticle]) {
        return store.state.rolesAndPermissions.options[routeNameArticle]
      }
      return []
    })

    const sendForm = async (actionSend = null, loading = true) => {
      if (!validatePermission(optionsPermissions.value, !stateArticle.value._id ? GUARDAR : EDITAR, titleNotificationArticle)) return false
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
      serverQueryArticleTributeDetail.value.indice = data.id
      serverQueryArticleBusinessDetail.value.indice = data.id
      serverQueryArticleChildrenDetail.value.indice = data.id
      await loadItemsArticle()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationArticle,
      stateArticle,
      sendForm,

      optionsPermissions,
      EDITAR,
      GUARDAR,
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
