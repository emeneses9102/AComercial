<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    :title="`Ver ${titleNotificationTribute}`"
    no-close-on-backdrop
  >

    <b-form>
      <field-set-component legend="Datos Generales">
        <b-row>
          <!-- Codigo SUNAT -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Código SUNAT"
              label-for="tribute-code-sunat"
            >
              <b-form-input
                id="tribute-code-sunat"
                v-model.trim="stateTribute.codigoSunat"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- Nombre -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Nombre"
              label-for="tribute-name"
            >
              <b-form-input
                id="tribute-name"
                v-model.trim="stateTribute.nombre"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- Código Internacional -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Código Internacional"
              label-for="tribute-code-international"
            >
              <b-form-input
                id="tribute-code-international"
                v-model.trim="stateTribute.namecode"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- Tributo -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Tributo"
              label-for="tribute"
            >
              <b-form-input
                id="tribute"
                v-model.trim="stateTribute.tributo"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- Factor -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Factor"
              label-for="tribute-factor"
            >
              <b-badge
                class="mt-50"
                :variant="stateTribute.flgFactor ? 'light-success' : 'light-danger'"
              >
                <feather-icon
                  :icon="stateTribute.flgFactor ? 'CheckIcon' : 'SlashIcon'"
                  size="16"
                />
              </b-badge>
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
  BModal, BForm, BRow, BCol, BFormGroup, BFormInput, BBadge,
} from 'bootstrap-vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { MODAL_ID, titleNotificationTribute, stateTribute } from '../ServicesTribute/useVariablesTribute'

export default {
  name: 'ModalShowTribute',
  components: {
    BModal,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BBadge,
    FieldSetComponent,
    ButtonComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationTribute,
      stateTribute,
    }
  },
}
</script>
