<template>
  <b-modal
    :id="MODAL_ID"
    centered
    size="lg"
    :title="`${stateTribute._id ? 'Modificar' : 'Registrar'} ${titleNotificationTribute}`"
    no-close-on-backdrop
  >
    <b-tabs>
      <b-tab>
        <template #title>
          <feather-icon icon="UserIcon" />
          <span class="d-none d-md-inline">General</span>
        </template>
        <validation-observer
          ref="validation-tribute"
        >
          <header-tribute />
        </validation-observer>
      </b-tab>
      <b-tab>
        <template #title>
          <feather-icon icon="UserIcon" />
          <span class="d-none d-md-inline">Factor</span>
        </template>
        <detail
          class="mt-1"
          :send-header="sendForm"
        />
        <detail-table class="mt-1" />
      </b-tab>
    </b-tabs>

    <template #modal-footer>
      <button-component
        variant="outline-primary"
        icon-button="PowerIcon"
        text-default="Cerrar"
        :method-function="()=>$bvModal.hide(MODAL_ID)"
      />
      <button-component
        v-if="(
          (!stateTribute._id && optionsPermissions.includes(GUARDAR))
          || (stateTribute._id && optionsPermissions.includes(EDITAR))
        )"
        variant="primary"
        icon-button="SaveIcon"
        :loading="stateTribute.loading"
        text-default="Guardar"
        :method-function="()=>sendForm()"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal, BTabs, BTab,
} from 'bootstrap-vue'
import { ValidationObserver } from 'vee-validate'
import { computed } from '@vue/composition-api'
import store from '@/store'
import {
  EDITAR,
  GUARDAR,
} from '@/options'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { validatePermission } from '@/helpers/validateActions'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import HeaderTribute from './HeaderTribute.vue'
import Detail from './Detail.vue'
import DetailTable from './DetailTable.vue'
import {
  MODAL_ID, titleNotificationTribute, stateTribute, routeNameTribute,
} from '../ServicesTribute/useVariablesTribute'
import { loadItemsTribute, sendTribute } from '../ServicesTribute/useServicesTribute'
import { serverQueryTributeFactor } from '../ServicesTributeFactor/useVariablesTributeFactor'

export default {
  name: 'ModalSaveTribute',
  components: {
    BModal,
    BTabs,
    BTab,
    HeaderTribute,
    Detail,
    DetailTable,
    ButtonComponent,
    ValidationObserver,
  },
  setup(props, context) {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNameTribute]) {
        return store.state.rolesAndPermissions.options[routeNameTribute]
      }
      return []
    })

    const sendForm = async (actionSend = null, loading = true) => {
      if (!validatePermission(optionsPermissions.value, !stateTribute.value._id ? GUARDAR : EDITAR, titleNotificationTribute)) return false
      const successValidationTribute = await context.refs['validation-tribute'].validate()
      if (!successValidationTribute) return false
      if (loading) stateTribute.value.loading = true
      const { status, data } = await sendTribute(actionSend || (stateTribute.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateTribute.value.loading = false
      if (!status) return false
      stateTribute.value._id = data.id
      serverQueryTributeFactor.value._id = data.id
      await loadItemsTribute()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationTribute,
      stateTribute,
      sendForm,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>

<style lang="scss">
#modal-tribute {
  .modal-dialog {
    @media screen and (min-width: 576px) {
      max-width: 700px;
      width: 90%;
    }
  }
  .modal-lg {
    @media screen and (min-width: 992px) {
      max-width: 960px;
      width: 90%;
    }
  }
}
</style>
