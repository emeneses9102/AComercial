<template>
  <b-modal
    :id="MODAL_ID"
    centered
    size="lg"
    :title="` ${titleNotificationPointSale}`"
    no-close-on-backdrop
  >
    <!--
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
    -->
    <validation-observer
      ref="validation-Client"
    >
      <save-client />
    </validation-observer>
    <div class="d-flex mt-2">
      <b-button
        v-ripple.400="'rgba(113, 102, 240, 0.15)'"
        v-b-toggle.collapse-1
        variant="outline-primary"
        class="ml-auto p-50"
        @click="visible=!visible"
      >
        <span
          v-if="visible"
          class="align-middle"
        >
          <feather-icon
            icon="MinusIcon"
          />
        </span>
        <span
          v-if="!visible"
          class="align-middle"
        >
          <feather-icon
            icon="PlusIcon"
          />
        </span>
      </b-button>
    </div>
    <b-collapse
      id="collapse-1"
      class="mt-2"
      visible
    >
      <detail-table />
    </b-collapse>

    <template #modal-footer>
      <button-component
        variant="primary"
        icon-button="PowerIcon"
        text-default="Cerrar"
        :method-function="()=>$bvModal.hide(MODAL_ID)"
      />
      <button-component
        v-if="!newClient"
        variant="primary"
        icon-button="SaveIcon"
        text-default="Guardar"
        :method-function="()=>sendForm()"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal, BButton, BCollapse, VBToggle,
} from 'bootstrap-vue'
import { ValidationObserver } from 'vee-validate'
import Ripple from 'vue-ripple-directive'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import DetailTable from './DetailTable.vue'
import { loadItemsClient, sendClient } from '../ServicesClient/useServicesClient'
import { MODAL_ID, titleNotificationPointSale } from '../ServicesPointSale/useVariablesPointSale'
import {
  serverQueryClient, stateClient,
} from '../ServicesClient/useVariablesClient'
import SaveClient from './SaveClient.vue'

export default {
  name: 'ModalListClient',
  components: {
    BModal,
    BButton,
    ButtonComponent,
    BCollapse,
    DetailTable,
    SaveClient,
    ValidationObserver,
  },
  directives: {
    'b-toggle': VBToggle,
    Ripple,
  },
  data() {
    return {
      newClient: false,
      visible: true,
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
  setup(props, context) {
    const sendForm = async (actionSend = null, loading = true) => {
      const successValidationClient = await context.refs['validation-Client'].validate()
      if (!successValidationClient) return false
      if (loading) stateClient.value.loading = true
      const { status, data } = await sendClient(actionSend || (stateClient.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateClient.value.loading = false
      if (!status) return false
      stateClient.value._id = data.id
      serverQueryClient.value.indice = data.id
      await loadItemsClient()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationPointSale,
      stateClient,
      sendForm,
    }
  },
}
</script>
