<template>
  <b-modal
    :id="MODAL_ID"
    centered
    size="lg"
    :title="`${stateVoucher._id ? 'Modificar' : 'Registrar'} ${titleNotificationVoucher}`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-Voucher"
    >
      <header-Voucher />
    </validation-observer>
    <detail
      class="mt-1"
      :send-header="sendForm"
    />
    <detail-table class="mt-1" />

    <template #modal-footer>
      <button-component
        variant="outline-primary"
        icon-button="PowerIcon"
        text-default="Cerrar"
        :method-function="()=>$bvModal.hide(MODAL_ID)"
      />
      <button-component
        variant="primary"
        icon-button="SaveIcon"
        :loading="stateVoucher.loading"
        text-default="Guardar"
        :method-function="()=>sendForm()"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal,
} from 'bootstrap-vue'
import { ValidationObserver } from 'vee-validate'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import HeaderVoucher from './HeaderVoucher.vue'
import Detail from './Detail.vue'
import DetailTable from './DetailTable.vue'
import {
  MODAL_ID, titleNotificationVoucher, stateVoucher,
} from '../ServicesVoucher/useVariablesVoucher'
import { loadItemsVoucher, sendVoucher } from '../ServicesVoucher/useServicesVoucher'
import { serverQueryVoucherDetailCorrelative } from '../ServicesVoucherDetailCorrelative/useVariablesVoucherDetailCorrelative'

export default {
  name: 'ModalSaveVoucher',
  components: {
    BModal,
    HeaderVoucher,
    Detail,
    DetailTable,
    ButtonComponent,
    ValidationObserver,
  },
  setup(props, context) {
    const sendForm = async (actionSend = null, loading = true) => {
      const successValidationVoucher = await context.refs['validation-Voucher'].validate()
      if (!successValidationVoucher) return false
      if (loading) stateVoucher.value.loading = true
      const { status, data } = await sendVoucher(actionSend || (stateVoucher.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateVoucher.value.loading = false
      if (!status) return false
      stateVoucher.value._id = data.id
      serverQueryVoucherDetailCorrelative.value.indice = data.id
      await loadItemsVoucher()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationVoucher,
      stateVoucher,
      sendForm,
    }
  },
}
</script>
