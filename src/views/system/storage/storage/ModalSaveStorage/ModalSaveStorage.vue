<template>
  <b-modal
    :id="MODAL_ID"
    centered
    size="lg"
    :title="`${stateStorage._id ? 'Modificar' : 'Registrar'} ${titleNotificationStorage}`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-storage"
    >
      <header-storage />
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
        :loading="stateStorage.loading"
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
import HeaderStorage from './HeaderStorage.vue'
import Detail from './Detail.vue'
import DetailTable from './DetailTable.vue'
import {
  MODAL_ID, titleNotificationStorage, stateStorage,
} from '../ServicesStorage/useVariablesStorage'
import { loadItemsStorage, sendStorage } from '../ServicesStorage/useServicesStorage'
import { serverQuerySubStorage } from '../ServicesSubStorage/useVariablesSubStorage'

export default {
  name: 'ModalSaveStorage',
  components: {
    BModal,
    HeaderStorage,
    Detail,
    DetailTable,
    ButtonComponent,
    ValidationObserver,
  },
  setup(props, context) {
    const sendForm = async (actionSend = null, loading = true) => {
      const successValidationStorage = await context.refs['validation-storage'].validate()
      if (!successValidationStorage) return false
      if (loading) stateStorage.value.loading = true
      const { status, data } = await sendStorage(actionSend || (stateStorage.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateStorage.value.loading = false
      if (!status) return false
      stateStorage.value._id = data.id
      serverQuerySubStorage.value.indice = data.id
      await loadItemsStorage()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationStorage,
      stateStorage,
      sendForm,
    }
  },
}
</script>