<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    size="lg"
    :title="`Ver ${titleNotificationFeature}`"
    no-close-on-backdrop
  >
    <header-feature />
    <detail-table class="mt-1" />

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
  BModal,
} from 'bootstrap-vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import HeaderFeature from './HeaderFeature.vue'
import DetailTable from './DetailTable.vue'
import { MODAL_ID, titleNotificationFeature } from '../ServicesFeature/useVariablesFeature'

export default {
  name: 'ModalShowFeature',
  components: {
    BModal,
    ButtonComponent,
    HeaderFeature,
    DetailTable,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationFeature,
    }
  },
}
</script>
