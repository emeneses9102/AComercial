<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    size="lg"
    :title="`Ver ${titleNotificationUser}`"
    no-close-on-backdrop
  >
    <b-tabs>
      <b-tab>
        <template #title>
          <feather-icon icon="UserIcon" />
          <span class="d-none d-md-inline">General</span>
        </template>
        <header-user />
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon icon="UserIcon" />
          <span class="d-none d-md-inline">Negocio</span>
        </template>
        <detail-table-business class="mt-1" />
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon icon="UserIcon" />
          <span class="d-none d-md-inline">Almacén</span>
        </template>
        <detail-table-storage class="mt-1" />
      </b-tab>
    </b-tabs>

    <template #modal-footer>
      <button-component
        variant="primary"
        icon-button="PowerIcon"
        text-default="Cerrar"
        :method-function="()=>$bvModal.hide(`${MODAL_ID}-show`)"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal, BTabs, BTab,
} from 'bootstrap-vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import HeaderUser from './HeaderUser.vue'
import DetailTableBusiness from './DetailTableBusiness.vue'
import DetailTableStorage from './DetailTableStorage.vue'
import { MODAL_ID, titleNotificationUser } from '../ServicesUser/useVariablesUser'

export default {
  name: 'ModalShowUser',
  components: {
    BModal,
    BTabs,
    BTab,
    ButtonComponent,
    HeaderUser,
    DetailTableBusiness,
    DetailTableStorage,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationUser,
    }
  },
}
</script>
