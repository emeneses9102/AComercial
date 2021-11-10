<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    size="lg"
    :title="`Ver ${titleNotificationStorage}`"
    no-close-on-backdrop
  >
    <header-storage />
    <detail-table class="mt-1" />

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
  BModal,
} from 'bootstrap-vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import HeaderStorage from './HeaderStorage.vue'
import DetailTable from './DetailTable.vue'
import { MODAL_ID, titleNotificationStorage } from '../ServicesStorage/useVariablesStorage'

export default {
  name: 'ModalShowStorage',
  components: {
    BModal,
    ButtonComponent,
    HeaderStorage,
    DetailTable,
  },
  setup() {
    // Retorno de variables y funciones que se utilizaran en el DOM
    return {
      MODAL_ID,
      titleNotificationStorage,
    }
  },
}
</script>
