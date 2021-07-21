<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    size="lg"
    :title="`Ver ${titleNotificationVoucher}`"
    no-close-on-backdrop
  >
    <header-voucher />
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
import HeaderVoucher from './HeaderVoucher.vue'
import DetailTable from './DetailTable.vue'
import { MODAL_ID, titleNotificationVoucher } from '../ServicesVoucher/useVariablesVoucher'

export default {
  name: 'ModalShowVoucher',
  components: {
    BModal,
    ButtonComponent,
    HeaderVoucher,
    DetailTable,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationVoucher,
    }
  },
}
</script>
