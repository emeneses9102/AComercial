<template>
  <b-modal
    :id="`${MODAL_ID}-open`"
    centered
    size="lg"
    :title="`Aperturar Caja`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-box-session"
    >
      <header-open-box />
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
        :method-function="()=>$bvModal.hide(`${MODAL_ID}-open`)"
      />
      <button-component
        v-if="!stateBoxSession.idApertura"
        variant="success"
        icon-button="LogInIcon"
        :loading="stateBoxSession.loading"
        text-default="Aperturar"
        :method-function="()=>$bvModal.show(`${MODAL_ID}-description`)"
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
  ACTION_REGISTER, ACTION_UPDATE,
} from '@/helpers/actionsApi'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import HeaderOpenBox from './HeaderOpenBox.vue'
import Detail from './Detail.vue'
import DetailTable from './DetailTable.vue'
import {
  MODAL_ID,
  titleNotificationBoxSession,
  stateBoxSession,
} from '../ServicesBoxSession/useVariablesBoxSession'
import {
  getDataBoxSessionById,
  loadItemsBoxSession,
  sendBoxSession,
} from '../ServicesBoxSession/useServicesBoxSession'
import {
  serverQueryBoxSessionDetail,
} from '../ServicesBoxSessionDetail/useVariablesBoxSessionDetail'

export default {
  name: 'ModalOpenBox',
  components: {
    BModal,
    HeaderOpenBox,
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
      stateBoxSession.value._id = data.id
      serverQueryBoxSessionDetail.value.indice = data.id
      await loadItemsBoxSession()
      await getDataBoxSessionById(data.id)
      if (!status) return false
      context.root.$bvModal.show(`${MODAL_ID}-open`)
      context.root.$bvModal.hide(MODAL_ID)
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

<style lang="scss">
#modal-box-session-open {
  .modal-dialog {
    @media screen and (min-width: 576px) {
      max-width: 700px;
      width: 90%;
    }
  }
  .modal-lg {
    @media screen and (min-width: 992px) {
      max-width: 900px;
      width: 90%;
    }
  }
}
</style>
