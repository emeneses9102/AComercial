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

    <detail-voucher
      v-if="stateBoxSession._id"
      class="mt-1"
    />

    <detail-table-voucher
      v-if="stateBoxSession._id"
      class="mt-1"
    />

    <template #modal-footer>
      <button-component
        variant="outline-primary"
        icon-button="PowerIcon"
        text-default="Cerrar"
        :method-function="()=>$bvModal.hide(MODAL_ID)"
      />
      <button-component
        v-if="(
          (!stateBoxSession._id && optionsPermissions.includes(GUARDAR))
          || (stateBoxSession._id && !stateBoxSession.idApertura && optionsPermissions.includes(EDITAR))
        )"
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
import { computed } from '@vue/composition-api'
import store from '@/store'
import {
  EDITAR,
  GUARDAR,
} from '@/options'
import {
  ACTION_REGISTER,
  ACTION_UPDATE,
} from '@/helpers/actionsApi'
import { validatePermission } from '@/helpers/validateActions'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import HeaderBoxSession from './HeaderBoxSession.vue'
import DetailVoucher from './DetailVoucher.vue'
import DetailTableVoucher from './DetailTableVoucher.vue'
import {
  MODAL_ID,
  titleNotificationBoxSession,
  stateBoxSession,
  routeNameBoxSession,
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
    DetailVoucher,
    DetailTableVoucher,
    ButtonComponent,
    ValidationObserver,
  },
  setup(props, context) {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNameBoxSession]) {
        return store.state.rolesAndPermissions.options[routeNameBoxSession]
      }
      return []
    })

    const sendForm = async (actionSend = null, loading = true) => {
      if (!validatePermission(optionsPermissions.value, !stateBoxSession.value._id ? GUARDAR : EDITAR, titleNotificationBoxSession)) return false
      const successValidationBoxSession = await context.refs['validation-box-session'].validate()
      if (!successValidationBoxSession) return false
      if (loading) stateBoxSession.value.loading = true
      const { status, data } = await sendBoxSession(actionSend || (stateBoxSession.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateBoxSession.value.loading = false
      if (!status || !data) return false
      stateBoxSession.value._id = data.id
      await loadItemsBoxSession()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationBoxSession,
      stateBoxSession,
      sendForm,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>

<style lang="scss">
#modal-box-session {
  .modal-dialog {
    @media screen and (min-width: 576px) {
      max-width: 700px;
      width: 90%;
    }
  }
  .modal-lg {
    @media screen and (min-width: 992px) {
      max-width: 1000px;
      width: 90%;
    }
  }
}
</style>
