<template>
  <b-modal
    :id="MODAL_ID"
    centered
    size="lg"
    :title="`Ver ${titleNotificationPointSale}`"
    no-close-on-backdrop
  >
    <div class="d-flex">
      <b-button
        v-if="!newClient"
        variant="primary"
        class="ml-auto"
        @click="activeNewClient"
      >
        <feather-icon
          icon="UserPlusIcon"
          class="mr-50"
        />
        <span class="align-middle">Nuevo Usuario</span>
      </b-button>
      <b-button
        v-if="newClient"
        variant="primary"
        class="ml-auto"
        @click="returnList"
      >
        <feather-icon
          icon="ArrowLeftCircleIcon"
          class="mr-50"
        />
        <span class="align-middle">Regresar</span>
      </b-button>
    </div>
    <save-client
      v-if="newClient"
    />
    <detail-table
      v-if="!newClient"
    />

    <template #modal-footer>
      <button-component
        variant="primary"
        icon-button="PowerIcon"
        text-default="Cerrar"
        :method-function="()=>$bvModal.hide(MODAL_ID)"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal, BButton,
} from 'bootstrap-vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'

import DetailTable from './DetailTable.vue'
import { MODAL_ID, titleNotificationPointSale } from '../ServicesPointSale/useVariablesPointSale'
import SaveClient from './SaveClient.vue'

export default {
  name: 'ModalListClient',
  components: {
    BModal,
    BButton,
    ButtonComponent,
    DetailTable,
    SaveClient,
  },
  data() {
    return {
      newClient: false,
    }
  },
  methods: {
    activeNewClient() {
      this.newClient = true
    },
    returnList() {
      this.newClient = false
    },
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationPointSale,
    }
  },
}
</script>
