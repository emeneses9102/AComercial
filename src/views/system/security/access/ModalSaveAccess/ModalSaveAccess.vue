<template>
  <b-modal
    :id="MODAL_ID"
    centered
    size="lg"
    :title="`${stateAccess._id ? 'Modificar' : 'Registrar'} ${titleNotificationAccess}`"
    no-close-on-backdrop
    title-tag="h4"
  >
    <validation-observer
      ref="validation-access"
    >
      <header-Access
        :reset-validation="resetAccessValidation"
        :reset-detail-validation="resetAccessOptionDetailValidation"
      />
    </validation-observer>
    <validation-observer
      ref="validation-access-option-detail"
    >
      <detail
        class="mt-1"
        :send-header="sendForm"
        :validate-detail="validateAccessOptionDetailValidation"
        :reset-detail="resetAccessOptionDetailValidation"
      />
    </validation-observer>
    <detail-table class="mt-1" />

    <template #modal-footer>
      <button-component
        variant="outline-primary"
        icon-button="PowerIcon"
        text-default="Cerrar"
        :method-function="()=>$bvModal.hide(MODAL_ID)"
      />
      <!-- <button-component
        variant="primary"
        icon-button="SaveIcon"
        :loading="stateAccess.loading"
        text-default="Guardar"
        :method-function="()=>sendForm()"
      /> -->
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
import HeaderAccess from './HeaderAccess.vue'
import Detail from './Detail.vue'
import DetailTable from './DetailTable.vue'
import {
  MODAL_ID, titleNotificationAccess, stateAccess,
} from '../ServicesAccess/useVariablesAccess'
import { loadItemsAccess, sendAccess } from '../ServicesAccess/useServicesAccess'
import { serverQueryAccessOptionDetail } from '../ServicesAccessOptionDetail/useVariablesAccessOptionDetail'

export default {
  name: 'ModalSaveAccess',
  components: {
    BModal,
    HeaderAccess,
    Detail,
    DetailTable,
    ButtonComponent,
    ValidationObserver,
  },
  setup(props, context) {
    const validateAccess = async () => {
      const successValidation = await context.refs['validation-access'].validate()
      return successValidation
    }

    const validateAccessOptionDetailValidation = async () => {
      const successValidation = await context.refs['validation-access-option-detail'].validate()
      return successValidation
    }

    const resetAccessValidation = () => {
      context.refs['validation-access'].reset()
    }

    const resetAccessOptionDetailValidation = () => {
      context.refs['validation-access-option-detail'].reset()
    }

    const sendForm = async (actionSend = null, loading = true) => {
      const successValidationAccess = await validateAccess()
      if (!successValidationAccess) return false
      if (loading) stateAccess.value.loading = true
      const { status, data } = await sendAccess(actionSend || (stateAccess.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateAccess.value.loading = false
      if (!status) return false
      stateAccess.value._id = data.id
      serverQueryAccessOptionDetail.value.indice = data.id
      await loadItemsAccess()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationAccess,
      stateAccess,
      validateAccessOptionDetailValidation,
      resetAccessValidation,
      resetAccessOptionDetailValidation,
      sendForm,
    }
  },
}
</script>
