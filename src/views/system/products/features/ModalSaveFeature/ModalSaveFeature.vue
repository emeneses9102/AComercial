<template>
  <b-modal
    :id="MODAL_ID"
    centered
    size="lg"
    :title="`${stateFeature._id ? 'Modificar' : 'Registrar'} ${titleNotificationFeature}`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-feature"
    >
      <header-feature />
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
        v-if="(
          (!stateFeature._id && optionsPermissions.includes(GUARDAR))
          || (stateFeature._id && optionsPermissions.includes(EDITAR))
        )"
        variant="primary"
        icon-button="SaveIcon"
        :loading="stateFeature.loading"
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
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { validatePermission } from '@/helpers/validateActions'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import HeaderFeature from './HeaderFeature.vue'
import Detail from './Detail.vue'
import DetailTable from './DetailTable.vue'
import {
  MODAL_ID, titleNotificationFeature, stateFeature, routeNameFeature,
} from '../ServicesFeature/useVariablesFeature'
import { loadItemsFeature, sendFeature } from '../ServicesFeature/useServicesFeature'
import { serverQueryFeatureDetail } from '../ServicesFeatureDetail/useVariablesFeatureDetail'

export default {
  name: 'ModalSaveFeature',
  components: {
    BModal,
    HeaderFeature,
    Detail,
    DetailTable,
    ButtonComponent,
    ValidationObserver,
  },
  setup(props, context) {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNameFeature]) {
        return store.state.rolesAndPermissions.options[routeNameFeature]
      }
      return []
    })

    const sendForm = async (actionSend = null, loading = true) => {
      if (!validatePermission(optionsPermissions.value, !stateFeature.value._id ? GUARDAR : EDITAR, titleNotificationFeature)) return false
      const successValidationFeature = await context.refs['validation-feature'].validate()
      if (!successValidationFeature) return false
      if (loading) stateFeature.value.loading = true
      const { status, data } = await sendFeature(actionSend || (stateFeature.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateFeature.value.loading = false
      if (!status) return false
      stateFeature.value._id = data.id
      serverQueryFeatureDetail.value.indice = data.id
      await loadItemsFeature()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationFeature,
      stateFeature,
      sendForm,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
