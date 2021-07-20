<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    :title="`Ver ${titleNotificationPartner}`"
    no-close-on-backdrop
    size="lg"
    modal-class="modal-padding"
  >

    <b-form>
      <field-set-component legend="Datos Generales :">
        <b-row>
          <!-- Documento -->
          <b-col
            cols="12"
            sm="6"
            lg="3"
          >
            <b-form-group
              label="Documento"
              label-for="partner-document-type"
            >
              <b-form-input
                id="partner-document-type"
                v-model.trim="statePartner.nombreDocumento"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- N° Documento -->
          <b-col
            cols="12"
            sm="6"
            lg="3"
          >
            <b-form-group
              label="N° Documento"
              label-for="partner-document-number"
            >
              <b-form-input
                id="partner-document-number"
                v-model.trim="statePartner.numeroDocumento"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Apellido Paterno -->
          <b-col
            cols="12"
            sm="6"
            lg="3"
          >
            <b-form-group
              label="Apellido Paterno"
              label-for="partner-paternal"
            >
              <b-form-input
                id="partner-paternal"
                v-model.trim="statePartner.apellidoPaterno"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Apellido Materno -->
          <b-col
            cols="12"
            sm="6"
            lg="3"
          >
            <b-form-group
              label="Apellido Materno"
              label-for="partner-maternal"
            >
              <b-form-input
                id="partner-maternal"
                v-model.trim="statePartner.apellidoMaterno"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Nombres -->
          <b-col
            cols="12"
            sm="6"
            lg="4"
          >
            <b-form-group
              label="Nombre"
              label-for="product-type-name"
            >
              <b-form-input
                id="product-type-name"
                v-model.trim="statePartner.nombres"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Correo -->
          <b-col
            cols="12"
            sm="6"
            lg="5"
          >
            <b-form-group
              label="Correo"
              label-for="partner-email"
            >
              <b-form-input
                id="partner-email"
                v-model.trim="statePartner.correo"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Teléfono -->
          <b-col
            cols="12"
            lg="3"
          >
            <b-form-group
              label="Teléfono"
              label-for="partner-phone"
            >
              <b-form-input
                id="partner-phone"
                v-model.trim="statePartner.telefono"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

        </b-row>
      </field-set-component>

      <field-set-component
        class="mt-1"
        legend="Datos Fiscales :"
      >
        <b-row>
          <!-- Ruc -->
          <b-col
            cols="12"
            lg="4"
          >
            <b-form-group
              label="RUC"
              label-for="partner-ruc"
            >
              <b-form-input
                id="partner-ruc"
                v-model.trim="statePartner.numeroRuc"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Tipo de Socio -->
          <b-col
            cols="12"
            lg="8"
          >
            <b-form-group
              label="Tipo de Socio"
              label-for="partner-cliente"
            >
              <div class="d-flex align-items-center flex-wrap">
                <div
                  class="d-flex align-items-center mr-1"
                  style="height: 2.714rem;"
                >
                  <b-badge
                    :variant="statePartner.cliente ? 'light-success' : 'light-danger'"
                  >
                    <feather-icon
                      :icon="statePartner.cliente ? 'CheckIcon' : 'SlashIcon'"
                      size="16"
                    />
                  </b-badge>
                  <span class="d-inline-block ml-50">Cliente</span>
                </div>
                <div
                  class="d-flex align-items-center mr-1"
                  style="height: 2.714rem;"
                >
                  <b-badge
                    :variant="statePartner.proveedor ? 'light-success' : 'light-danger'"
                  >
                    <feather-icon
                      :icon="statePartner.proveedor ? 'CheckIcon' : 'SlashIcon'"
                      size="16"
                    />
                  </b-badge>
                  <span class="d-inline-block ml-50">Proveedor</span>
                </div>
                <div
                  class="d-flex align-items-center"
                  style="height: 2.714rem;"
                >
                  <b-badge
                    :variant="statePartner.transportista ? 'light-success' : 'light-danger'"
                  >
                    <feather-icon
                      :icon="statePartner.transportista ? 'CheckIcon' : 'SlashIcon'"
                      size="16"
                    />
                  </b-badge>
                  <span class="d-inline-block ml-50">Transportista</span>
                </div>
              </div>
            </b-form-group>
          </b-col>

          <!-- Razón Social -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Razón Social"
              label-for="partner-company-name"
            >
              <b-form-input
                id="partner-company-name"
                v-model.trim="statePartner.razonSocial"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
        </b-row>
      </field-set-component>

      <field-set-component
        class="mt-1"
        legend="Ubicación :"
      >
        <b-row>
          <!-- Departamento -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Departamento"
              label-for="partner-departament"
            >
              <b-form-input
                id="partner-departament"
                v-model.trim="getNameDepartament"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Provincia -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Provincia"
              label-for="partner-province"
            >
              <b-form-input
                id="partner-province"
                v-model.trim="getNameProvince"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Distrito -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Distrito"
              label-for="partner-district"
            >
              <b-form-input
                id="partner-district"
                v-model.trim="getNameDistrict"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Dirección -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Dirección"
              label-for="partner-address"
            >
              <b-form-input
                id="partner-address"
                v-model.trim="statePartner.direccion"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
        </b-row>
      </field-set-component>

      <field-set-component
        class="mt-1"
        legend="Contacto :"
      >
        <b-row>
          <!-- Nombre Contacto -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Nombre Contacto"
              label-for="partner-contact-name"
            >
              <b-form-input
                id="partner-contact-name"
                v-model.trim="statePartner.nombreContacto"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Teléfono Contacto -->
          <b-col
            cols="12"
            lg="6"
          >
            <b-form-group
              label="Teléfono contacto"
              label-for="partner-contact-phone"
            >
              <b-form-input
                id="partner-contact-phone"
                v-model.trim="statePartner.telefonoContacto"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>

          <!-- Observación -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Observación"
              label-for="partner-contact-observation"
            >
              <b-form-input
                id="partner-contact-observation"
                v-model.trim="statePartner.observaciones"
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
  BModal, BForm, BRow, BCol, BFormGroup, BFormInput, BBadge,
} from 'bootstrap-vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { MODAL_ID, titleNotificationPartner, statePartner } from '../ServicesPartner/useVariablesPartner'

export default {
  name: 'ModalShowPartner',
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
  computed: {
    getNameDepartament() {
      return this.statePartner.nombreUbigeo.split(',')[0]
    },
    getNameProvince() {
      return this.statePartner.nombreUbigeo.split(',')[1]
    },
    getNameDistrict() {
      return this.statePartner.nombreUbigeo.split(',')[2]
    },
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationPartner,
      statePartner,
    }
  },
}
</script>
