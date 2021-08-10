<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    size="lg"
    :title="`Ver ${titleNotificationBoxSession}`"
    no-close-on-backdrop
  >
    <header-box-session />
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
import HeaderBoxSession from './HeaderBoxSession.vue'
import DetailTable from './DetailTable.vue'
import { MODAL_ID, titleNotificationBoxSession } from '../ServicesBoxSession/useVariablesBoxSession'

export default {
  name: 'ModalShowBoxSession',
  components: {
    BModal,
    ButtonComponent,
    HeaderBoxSession,
    DetailTable,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationBoxSession,
    }
  },
}
</script>
