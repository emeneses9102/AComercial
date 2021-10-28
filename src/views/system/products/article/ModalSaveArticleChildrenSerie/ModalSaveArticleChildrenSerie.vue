<template>
  <b-modal
    :id="MODAL_ID"
    centered
    size="lg"
    :title="`${stateArticleChildrenSerieDetail._id ? 'Modificar' : 'Registrar'} ${titleNotificationArticleChildrenSerieDetail}`"
    no-close-on-backdrop
    @show="clearViewModalArticleChildrenSerie"
  >
    <detail-children-serie
      class="mt-1"
    />
    <detail-children-serie-table class="mt-1" />

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
import DetailChildrenSerie from './DetailChildrenSerie.vue'
import DetailChildrenSerieTable from './DetailChildrenSerieTable.vue'
import {
  routeNameArticle,
} from '../ServicesArticle/useVariablesArticle'
import {
  MODAL_ID,
  clearDataTableArticleChildrenSerieDetail,
  stateArticleChildrenSerieDetail,
  titleNotificationArticleChildrenSerieDetail,
  clearStateArticleChildrenSerieDetail,
} from '../ServicesArticleChildrenSerieDetail/useVariablesArticleChildrenSerieDetail'
import { loadItemsArticleChildrenSerieDetail } from '../ServicesArticleChildrenSerieDetail/useServicesArticleChildrenSerieDetail'

export default {
  name: 'ModalSaveArticleChildrenSerie',
  components: {
    BModal,
    DetailChildrenSerie,
    DetailChildrenSerieTable,
    ButtonComponent,
  },
  setup() {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNameArticle]) {
        return store.state.rolesAndPermissions.options[routeNameArticle]
      }
      return []
    })

    const clearViewModalArticleChildrenSerie = () => {
      clearStateArticleChildrenSerieDetail()
      clearDataTableArticleChildrenSerieDetail()
      loadItemsArticleChildrenSerieDetail(1)
    }

    return {
      MODAL_ID,
      titleNotificationArticleChildrenSerieDetail,
      stateArticleChildrenSerieDetail,
      clearViewModalArticleChildrenSerie,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>

<style lang="scss">
#modal-article-children-serie-detail {
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
