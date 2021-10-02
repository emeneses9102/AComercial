<template>
  <b-modal
    :id="MODAL_ID"
    centered
    size="lg"
    :title="`${stateUser._id ? 'Modificar' : 'Registrar'} ${titleNotificationUser}`"
    no-close-on-backdrop
  >
    <b-tabs>
      <b-tab>
        <template #title>
          <feather-icon icon="UserIcon" />
          <span class="d-none d-md-inline">General</span>
        </template>
        <validation-observer
          ref="validation-user"
        >
          <header-user />
        </validation-observer>
      </b-tab>
      <b-tab>
        <template #title>
          <feather-icon icon="UserIcon" />
          <span class="d-none d-md-inline">Negocio</span>
        </template>
        <detail-business
          class="mt-1"
          :send-header="sendForm"
        />
        <detail-table-business class="mt-1" />
      </b-tab>
      <b-tab>
        <template #title>
          <feather-icon icon="UserIcon" />
          <span class="d-none d-md-inline">Almacén</span>
        </template>
        <detail-storage
          class="mt-1"
          :send-header="sendForm"
        />
        <detail-table-storage class="mt-1" />
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
          (!stateUser._id && optionsPermissions.includes(GUARDAR))
          || (stateUser._id && optionsPermissions.includes(EDITAR))
        )"
        variant="primary"
        icon-button="SaveIcon"
        :loading="stateUser.loading"
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
import HeaderUser from './HeaderUser.vue'
import DetailBusiness from './DetailBusiness.vue'
import DetailTableBusiness from './DetailTableBusiness.vue'
import DetailStorage from './DetailStorage.vue'
import DetailTableStorage from './DetailTableStorage.vue'
import {
  MODAL_ID, titleNotificationUser, stateUser, routeNameUser,
} from '../ServicesUser/useVariablesUser'
import { loadItemsUser, sendUser } from '../ServicesUser/useServicesUser'
import { serverQueryUserBusinessDetail } from '../ServicesUserBusinessDetail/useVariablesUserBusinessDetail'
import { serverQueryUserStorageDetail } from '../ServicesUserStorageDetail/useVariablesUserStorageDetail'

export default {
  name: 'ModalSaveUser',
  components: {
    BModal,
    BTabs,
    BTab,
    HeaderUser,
    DetailBusiness,
    DetailTableBusiness,
    DetailStorage,
    DetailTableStorage,
    ButtonComponent,
    ValidationObserver,
  },
  setup(props, context) {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNameUser]) {
        return store.state.rolesAndPermissions.options[routeNameUser]
      }
      return []
    })

    const sendForm = async (actionSend = null, loading = true) => {
      if (!validatePermission(optionsPermissions.value, !stateUser.value._id ? GUARDAR : EDITAR, titleNotificationUser)) return false
      const successValidationUser = await context.refs['validation-user'].validate()
      if (!successValidationUser) return false
      if (loading) stateUser.value.loading = true
      const { status, data } = await sendUser(actionSend || (stateUser.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateUser.value.loading = false
      if (!status) return false
      stateUser.value._id = data.id
      serverQueryUserBusinessDetail.value.indice = data.id
      serverQueryUserStorageDetail.value.indice = data.id
      await loadItemsUser()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationUser,
      stateUser,
      sendForm,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
