<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    size="lg"
    :title="`Ver ${titleNotificationArticle}`"
    no-close-on-backdrop
  >
    <b-tabs>
      <b-tab>
        <template #title>
          <feather-icon icon="UserIcon" />
          <span class="d-none d-md-inline">General</span>
        </template>
        <header-article />
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon icon="UserIcon" />
          <span class="d-none d-md-inline">Característica</span>
        </template>
        <detail-table-feature class="mt-1" />
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon icon="UserIcon" />
          <span class="d-none d-md-inline">Receta</span>
        </template>
        <detail-table-recipe class="mt-1" />
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon icon="UserIcon" />
          <span class="d-none d-md-inline">Tributo</span>
        </template>
        <detail-table-tribute class="mt-1" />
      </b-tab>
    </b-tabs>

    <template #modal-footer>
      <button-component
        variant="primary"
        icon-button="PowerIcon"
        text-default="Cerrar"
        :method-function="()=>$bvModal.hide(`${MODAL_ID}-show`)"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal, BTabs, BTab,
} from 'bootstrap-vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import HeaderArticle from './HeaderArticle.vue'
import DetailTableFeature from './DetailTableFeature.vue'
import DetailTableRecipe from './DetailTableRecipe.vue'
import DetailTableTribute from './DetailTableTribute.vue'
import { MODAL_ID, titleNotificationArticle } from '../ServicesArticle/useVariablesArticle'

export default {
  name: 'ModalShowArticle',
  components: {
    BModal,
    BTabs,
    BTab,
    ButtonComponent,
    HeaderArticle,
    DetailTableFeature,
    DetailTableRecipe,
    DetailTableTribute,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationArticle,
    }
  },
}
</script>

<style lang="scss">
#modal-article-show {
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
