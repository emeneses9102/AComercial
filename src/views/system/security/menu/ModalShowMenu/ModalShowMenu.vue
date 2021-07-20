<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    size="lg"
    :title="`Ver ${titleNotificationMenu}`"
    no-close-on-backdrop
  >
    <header-menu />
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
import HeaderMenu from './HeaderMenu.vue'
import DetailTable from './DetailTable.vue'
import { MODAL_ID, titleNotificationMenu } from '../ServicesMenu/useVariablesMenu'

export default {
  name: 'ModalShowMenu',
  components: {
    BModal,
    ButtonComponent,
    HeaderMenu,
    DetailTable,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationMenu,
    }
  },
}
</script>
