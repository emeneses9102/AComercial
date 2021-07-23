<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    size="lg"
    :title="`Ver ${titleNotificationAccess}`"
    no-close-on-backdrop
  >
    <header-access />
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
import HeaderAccess from './HeaderAccess.vue'
import DetailTable from './DetailTable.vue'
import { MODAL_ID, titleNotificationAccess } from '../ServicesAccess/useVariablesAccess'

export default {
  name: 'ModalShowAccess',
  components: {
    BModal,
    ButtonComponent,
    HeaderAccess,
    DetailTable,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationAccess,
    }
  },
}
</script>
