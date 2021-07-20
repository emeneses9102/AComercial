<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    :title="`Ver ${titleNotificationBusinessUnit}`"
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
              label-for="business-unit-name"
            >
              <b-form-input
                id="business-unit-name"
                v-model.trim="stateBusinessUnit.nombre"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- Razon Social -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Razón Social"
              label-for="business-unit-company-name"
            >
              <b-form-input
                id="business-unit-company-name"
                v-model.trim="stateBusinessUnit.razonSocial"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- Ruc -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Ruc"
              label-for="business-unit-ruc"
            >
              <b-form-input
                id="business-unit-ruc"
                v-model.trim="stateBusinessUnit.ruc"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- Ruta Api -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Ruta API"
              label-for="business-unit-route-api"
            >
              <b-form-input
                id="business-unit-route-api"
                v-model.trim="stateBusinessUnit.rutaApi"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- Token Api -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Token API"
              label-for="business-unit-token-api"
            >
              <b-form-input
                id="business-unit-token-api"
                v-model.trim="stateBusinessUnit.tokenApi"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- Usuario Sunat -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Usuario Sunat"
              label-for="business-unit-user-sunat"
            >
              <b-form-input
                id="business-unit-user-sunat"
                v-model.trim="stateBusinessUnit.usuarioSunat"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- Producción -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Producción"
              label-for="business-unit-production"
            >
              <b-badge
                class="mt-50"
                :variant="stateBusinessUnit.produccion ? 'light-success' : 'light-danger'"
              >
                <feather-icon
                  :icon="stateBusinessUnit.produccion ? 'CheckIcon' : 'SlashIcon'"
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
import { MODAL_ID, titleNotificationBusinessUnit, stateBusinessUnit } from '../ServicesBusinessUnit/useVariablesBusinessUnit'

export default {
  name: 'ModalShowBusinessUnit',
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
      titleNotificationBusinessUnit,
      stateBusinessUnit,
    }
  },
}
</script>
