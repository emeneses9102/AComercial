<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    size="lg"
    :title="`Ver ${titleNotificationUnitGroup}`"
    no-close-on-backdrop
  >
    <header-unit-group />
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
import HeaderUnitGroup from './HeaderUnitGroup.vue'
import DetailTable from './DetailTable.vue'
import { MODAL_ID, titleNotificationUnitGroup } from '../ServicesUnitGroup/useVariablesUnitGroup'

export default {
  name: 'ModalShowUnitGroup',
  components: {
    BModal,
    ButtonComponent,
    HeaderUnitGroup,
    DetailTable,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationUnitGroup,
    }
  },
}
</script>
