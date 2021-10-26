<template>
  <b-modal
    :id="MODAL_ID"
    centered
    size="lg"
    :title="`${stateArticleChildrenFeatureDetail._id ? 'Modificar' : 'Registrar'} ${titleNotificationArticleChildrenFeatureDetail}`"
    no-close-on-backdrop
    @show="clearViewModalArticleChildrenFeature"
  >
    <detail-children-feature
      class="mt-1"
    />
    <detail-children-feature-table class="mt-1" />

    <template #modal-footer>
      <button-component
        variant="outline-primary"
        icon-button="PowerIcon"
        text-default="Cerrar"
        :method-function="()=>$bvModal.hide(MODAL_ID)"
      />
      <button-component
        variant="primary"
        icon-button="CheckIcon"
        :loading="stateArticleChildrenFeatureDetail.loading"
        text-default="Ok"
        :method-function="()=>$bvModal.hide(MODAL_ID)"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal,
} from 'bootstrap-vue'
import { computed } from '@vue/composition-api'
import store from '@/store'
import {
  EDITAR,
  GUARDAR,
} from '@/options'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import DetailChildrenFeature from './DetailChildrenFeature.vue'
import DetailChildrenFeatureTable from './DetailChildrenFeatureTable.vue'
import {
  // MODAL_ID,
  // titleNotificationArticle,
  // stateArticle,
  routeNameArticle,
} from '../ServicesArticle/useVariablesArticle'
import {
  MODAL_ID,
  clearDataTableArticleChildrenFeatureDetail,
  clearStateArticleChildrenFeatureDetail,
  stateArticleChildrenFeatureDetail,
  titleNotificationArticleChildrenFeatureDetail,
} from '../ServicesArticleChildrenFeatureDetail/useVariablesArticleChildrenFeatureDetail'

export default {
  name: 'ModalSaveArticle',
  components: {
    BModal,
    DetailChildrenFeature,
    DetailChildrenFeatureTable,
    ButtonComponent,
  },
  setup() {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNameArticle]) {
        return store.state.rolesAndPermissions.options[routeNameArticle]
      }
      return []
    })

    const clearViewModalArticleChildrenFeature = () => {
      clearStateArticleChildrenFeatureDetail()
      clearDataTableArticleChildrenFeatureDetail()
    }

    return {
      MODAL_ID,
      titleNotificationArticleChildrenFeatureDetail,
      stateArticleChildrenFeatureDetail,
      clearViewModalArticleChildrenFeature,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>

<style lang="scss">
#modal-article-children-detail {
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
