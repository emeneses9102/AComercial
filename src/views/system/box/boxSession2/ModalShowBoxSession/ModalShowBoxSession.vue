<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    size="lg"
    :title="`Ver ${titleNotificationBoxSession}`"
    no-close-on-backdrop
  >
    <header-box-session />
    <header-open-box class="mt-1" />
    <header-close-box class="mt-1" />
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
import HeaderOpenBox from './HeaderOpenBox.vue'
import HeaderCloseBox from './HeaderCloseBox.vue'
import DetailTable from './DetailTable.vue'
import {
  MODAL_ID,
  titleNotificationBoxSession,
} from '../ServicesBoxSession/useVariablesBoxSession'

export default {
  name: 'ModalShowBoxSession',
  components: {
    BModal,
    ButtonComponent,
    HeaderBoxSession,
    HeaderOpenBox,
    HeaderCloseBox,
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
