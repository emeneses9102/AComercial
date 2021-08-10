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
    <b-row
      v-if="stateBoxSession._id"
    >
      <b-col
        cols="12"
      >
        <header-opening
          v-if="!stateBoxSession.idApertura"
          class="mt-1"
        />
      </b-col>
      <b-col
        cols="12"
      >
        <header-ending
          v-if="stateBoxSession.idApertura"
          class="mt-1"
        />
      </b-col>
    </b-row>
    <detail
      v-if="!stateBoxSession.idApertura"
      class="mt-1"
      :send-header="sendForm"
    />
    <detail-table class="mt-1" />

    <template #modal-footer>
      <button-component
        v-if="stateBoxSession._id && !stateBoxSession.idApertura"
        class="mr-auto"
        variant="success"
        icon-button="CheckIcon"
        :loading="stateBoxSession.loading"
        text-default="Aperturar Caja"
        :method-function="()=>sendBox()"
      />
      <button-component
        v-if="stateBoxSession.idApertura"
        class="mr-auto"
        variant="danger"
        icon-button="XIcon"
        :loading="stateBoxSession.loading"
        text-default="Cerrar Caja"
        :method-function="()=>sendBox()"
      />
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
  BModal, BRow, BCol,
} from 'bootstrap-vue'
import { ValidationObserver } from 'vee-validate'
import {
  ACTION_CLOSE_BOX, ACTION_OPEN_BOX, ACTION_REGISTER, ACTION_UPDATE,
} from '@/helpers/actionsApi'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import HeaderBoxSession from './HeaderBoxSession.vue'
import HeaderOpening from './HeaderOpening.vue'
import HeaderEnding from './HeaderEnding.vue'
import Detail from './Detail.vue'
import DetailTable from './DetailTable.vue'
import {
  MODAL_ID, titleNotificationBoxSession, stateBoxSession,
} from '../ServicesBoxSession/useVariablesBoxSession'
import { loadItemsBoxSession, sendBoxSession } from '../ServicesBoxSession/useServicesBoxSession'
import { serverQueryBoxSessionDetail } from '../ServicesBoxSessionDetail/useVariablesBoxSessionDetail'

export default {
  name: 'ModalSaveBoxSession',
  components: {
    BModal,
    BRow,
    BCol,
    HeaderBoxSession,
    HeaderOpening,
    HeaderEnding,
    Detail,
    DetailTable,
    ButtonComponent,
    ValidationObserver,
  },
  setup(props, context) {
    const sendForm = async (actionSend = null, loading = true) => {
      const successValidationBoxSession = await context.refs['validation-box-session'].validate()
      if (!successValidationBoxSession) return false
      if (loading) stateBoxSession.value.loading = true
      const { status, data } = await sendBoxSession(actionSend || (stateBoxSession.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateBoxSession.value.loading = false
      if (!status) return false
      stateBoxSession.value._id = data.id
      serverQueryBoxSessionDetail.value.indice = data.id
      await loadItemsBoxSession()
      return true
    }

    const sendBox = async (actionSend = null, loading = true) => {
      const successValidationBoxSession = await context.refs['validation-box-session'].validate()
      if (!successValidationBoxSession) return false
      if (loading) stateBoxSession.value.loading = true
      const { status, data } = await sendBoxSession(actionSend || (stateBoxSession.value.idApertura ? ACTION_CLOSE_BOX : ACTION_OPEN_BOX))
      if (loading) stateBoxSession.value.loading = false
      if (!status) return false
      stateBoxSession.value._id = data.id
      serverQueryBoxSessionDetail.value.indice = data.id
      await loadItemsBoxSession()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationBoxSession,
      stateBoxSession,
      sendForm,
      sendBox,
    }
  },
}
</script>
