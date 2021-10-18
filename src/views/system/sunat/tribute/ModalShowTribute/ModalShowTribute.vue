<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    size="lg"
    :title="`Ver ${titleNotificationTribute}`"
    no-close-on-backdrop
  >
    <b-tabs>
      <b-tab>
        <template #title>
          <feather-icon icon="UserIcon" />
          <span class="d-none d-md-inline">General</span>
        </template>
        <header-tribute />
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon icon="UserIcon" />
          <span class="d-none d-md-inline">Factor</span>
        </template>
        <detail-table class="mt-1" />
      </b-tab>

      <b-tab>
        <template #title>
          <feather-icon icon="UserIcon" />
          <span class="d-none d-md-inline">Tipo</span>
        </template>
        <detail-table-type class="mt-1" />
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
import HeaderTribute from './HeaderTribute.vue'
import DetailTable from './DetailTable.vue'
import DetailTableType from './DetailTableType.vue'
import { MODAL_ID, titleNotificationTribute } from '../ServicesTribute/useVariablesTribute'

export default {
  name: 'ModalShowTribute',
  components: {
    BModal,
    BTabs,
    BTab,
    ButtonComponent,
    HeaderTribute,
    DetailTable,
    DetailTableType,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationTribute,
    }
  },
}
</script>
