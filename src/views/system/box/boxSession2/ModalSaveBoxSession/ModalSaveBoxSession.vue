<template>
  <b-modal
    :id="MODAL_ID"
    centered
    size="lg"
    :title="`${stateBoxSession._id ? 'Modificar' : 'Registrar'} ${titleNotificationBoxSession}`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-box-session"
    >
      <header-box-session />
    </validation-observer>

    <template #modal-footer>
      <button-component
        variant="outline-primary"
        icon-button="PowerIcon"
        text-default="Cerrar"
        :method-function="()=>$bvModal.hide(MODAL_ID)"
      />
      <button-component
        v-if="!stateBoxSession.idApertura"
        variant="primary"
        icon-button="SaveIcon"
        :loading="stateBoxSession.loading"
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
import {
  ACTION_REGISTER,
  ACTION_UPDATE,
} from '@/helpers/actionsApi'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import HeaderBoxSession from './HeaderBoxSession.vue'
import {
  MODAL_ID,
  titleNotificationBoxSession,
  stateBoxSession,
  clearStateBoxSession,
} from '../ServicesBoxSession/useVariablesBoxSession'
import {
  loadItemsBoxSession,
  sendBoxSession,
} from '../ServicesBoxSession/useServicesBoxSession'

export default {
  name: 'ModalSaveBoxSession',
  components: {
    BModal,
    HeaderBoxSession,
    ButtonComponent,
    ValidationObserver,
  },
  setup(props, context) {
    const sendForm = async (actionSend = null, loading = true) => {
      const successValidationBoxSession = await context.refs['validation-box-session'].validate()
      if (!successValidationBoxSession) return false
      if (loading) stateBoxSession.value.loading = true
      const { status } = await sendBoxSession(actionSend || (stateBoxSession.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateBoxSession.value.loading = false
      if (!status) return false
      clearStateBoxSession()
      context.refs['validation-box-session'].reset()
      await loadItemsBoxSession()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationBoxSession,
      stateBoxSession,
      sendForm,
    }
  },
}
</script>
