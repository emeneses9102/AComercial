<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    :title="`Ver ${titleNotificationRole}`"
    no-close-on-backdrop
  >

    <b-form>
      <field-set-component legend="Datos Generales">
        <b-row>
          <!-- Nombre -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Nombre"
              label-for="role-name"
            >
              <b-form-input
                id="role-name"
                v-model.trim="stateRole.nombre"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Predio -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Predio"
              label-for="role-predio"
            >
              <b-form-input
                id="role-predio"
                v-model.trim="stateRole.direccion"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Almacén -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Almacén"
              label-for="role-storage"
            >
              <b-form-input
                id="role-storage"
                v-model.trim="stateRole.nombreAlmacen"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
        </b-row>
      </field-set-component>
    </b-form>

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
  BModal, BForm, BRow, BCol, BFormGroup, BFormInput,
} from 'bootstrap-vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { MODAL_ID, titleNotificationRole, stateRole } from '../ServicesRole/useVariablesRole'

export default {
  name: 'ModalShowRole',
  components: {
    BModal,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    FieldSetComponent,
    ButtonComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationRole,
      stateRole,
    }
  },
}
</script>
