<template>
  <b-modal
    :id="MODAL_ID"
    centered
    size="lg"
    :title="`${stateMenu._id ? 'Modificar' : 'Registrar'} ${titleNotificationMenu}`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-menu"
    >
      <header-menu />
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
        :loading="stateMenu.loading"
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
import HeaderMenu from './HeaderMenu.vue'
import Detail from './Detail.vue'
import DetailTable from './DetailTable.vue'
import {
  MODAL_ID, titleNotificationMenu, stateMenu,
} from '../ServicesMenu/useVariablesMenu'
import { loadItemsMenu, sendMenu } from '../ServicesMenu/useServicesMenu'
import { serverQueryMenuOptionDetail } from '../ServicesMenuOptionDetail/useVariablesMenuOptionDetail'

export default {
  name: 'ModalSaveMenu',
  components: {
    BModal,
    HeaderMenu,
    Detail,
    DetailTable,
    ButtonComponent,
    ValidationObserver,
  },
  setup(props, context) {
    const sendForm = async (actionSend = null, loading = true) => {
      const successValidationMenu = await context.refs['validation-menu'].validate()
      if (!successValidationMenu) return false
      if (loading) stateMenu.value.loading = true
      const { status, data } = await sendMenu(actionSend || (stateMenu.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateMenu.value.loading = false
      if (!status) return false
      stateMenu.value._id = data.id
      serverQueryMenuOptionDetail.value.indice = data.id
      await loadItemsMenu()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationMenu,
      stateMenu,
      sendForm,
    }
  },
}
</script>
