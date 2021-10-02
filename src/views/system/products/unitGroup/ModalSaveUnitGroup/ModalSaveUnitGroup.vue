<template>
  <b-modal
    :id="MODAL_ID"
    centered
    size="lg"
    :title="`${stateUnitGroup._id ? 'Modificar' : 'Registrar'} ${titleNotificationUnitGroup}`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-unit-group"
    >
      <header-unit-group />
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
          (!stateUnitGroup._id && optionsPermissions.includes(GUARDAR))
          || (stateUnitGroup._id && optionsPermissions.includes(EDITAR))
        )"
        variant="primary"
        icon-button="SaveIcon"
        :loading="stateUnitGroup.loading"
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
import HeaderUnitGroup from './HeaderUnitGroup.vue'
import Detail from './Detail.vue'
import DetailTable from './DetailTable.vue'
import {
  MODAL_ID, titleNotificationUnitGroup, stateUnitGroup, routeNameUnitGroup,
} from '../ServicesUnitGroup/useVariablesUnitGroup'
import { loadItemsUnitGroup, sendUnitGroup } from '../ServicesUnitGroup/useServicesUnitGroup'
import { serverQueryUnitGroupDetail } from '../ServicesUnitGroupDetail/useVariablesUnitGroupDetail'

export default {
  name: 'ModalSaveUnitGroup',
  components: {
    BModal,
    HeaderUnitGroup,
    Detail,
    DetailTable,
    ButtonComponent,
    ValidationObserver,
  },
  setup(props, context) {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNameUnitGroup]) {
        return store.state.rolesAndPermissions.options[routeNameUnitGroup]
      }
      return []
    })

    const sendForm = async (actionSend = null, loading = true) => {
      if (!validatePermission(optionsPermissions.value, !stateUnitGroup.value._id ? GUARDAR : EDITAR, titleNotificationUnitGroup)) return false
      const successValidationUnitGroup = await context.refs['validation-unit-group'].validate()
      if (!successValidationUnitGroup) return false
      if (loading) stateUnitGroup.value.loading = true
      const { status, data } = await sendUnitGroup(actionSend || (stateUnitGroup.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateUnitGroup.value.loading = false
      if (!status) return false
      stateUnitGroup.value._id = data.id
      serverQueryUnitGroupDetail.value.indice = data.id
      await loadItemsUnitGroup()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationUnitGroup,
      stateUnitGroup,
      sendForm,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
