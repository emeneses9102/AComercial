<template>
  <b-modal
    :id="MODAL_ID"
    centered
    :title="`${statePartner._id ? 'Modificar' : 'Registrar'} ${titleNotificationPartner}`"
    no-close-on-backdrop
    size="lg"
    @show="showModalSavePartner"
  >
    <validation-observer
      ref="validation-partner"
    >
      <b-form @submit.prevent="">

        <b-tabs>
          <!-- Datos Generales -->
          <b-tab>
            <template #title>
              <feather-icon icon="UserIcon" />
              <span class="d-none d-md-inline">General</span>
            </template>
            <field-set-component
              legend="Datos Generales :"
              class="mt-2"
            >
              <b-row>
                <!-- Tipo Documento -->
                <b-col
                  cols="12"
                  lg="6"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Documento"
                    rules="requiredComboVueSelect:m"
                  >
                    <b-form-group
                      label="Documento *"
                      label-for="partner-document"
                      :state="errors.length > 0 ? false:null"
                    >
                      <vue-select
                        id="partner-document"
                        v-model="statePartner.idDocumento"
                        class="style-chooser"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :reduce="document => document._id"
                        label="nombre"
                        :options="combosPartner.document.data"
                        :loading="combosPartner.document.loading"
                        :clearable="false"
                        :disabled="combosPartner.document.disabled"
                        @option:selected="selectedDocumentType"
                      >
                        <template v-slot:no-options>
                          No se encontraron resultados.
                        </template>
                      </vue-select>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </b-form-group>
                  </validation-provider>
                </b-col>

                <!-- Numero de Documento -->
                <input-search-doc-number-component
                  id="partner-number-document"
                  v-model="statePartner.numeroDocumento"
                  cols="12"
                  colsm="12"
                  colmd="12"
                  collg="6"
                  :document-type="documentSelected"
                  :required-validation="true"
                  @data-found="getDataByNumberDocument"
                />

                <!-- Apellido Paterno -->
                <b-col
                  cols="12"
                  md="6"
                >
                  <b-form-group
                    label="Apellido Paterno *"
                    label-for="partner-paternal"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Ape. Paterno"
                      rules="min:3"
                    >
                      <b-form-input
                        id="partner-paternal"
                        v-model.trim="statePartner.apellidoPaterno"
                        type="text"
                        :state="errors.length > 0 ? false:null"
                        @keydown.enter="()=>sendForm()"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <!-- Apellido Materno -->
                <b-col
                  cols="12"
                  md="6"
                >
                  <b-form-group
                    label="Apellido Materno"
                    label-for="partner-maternal"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Ape. Materno"
                      rules="min:3"
                    >
                      <b-form-input
                        id="partner-maternal"
                        v-model.trim="statePartner.apellidoMaterno"
                        type="text"
                        :state="errors.length > 0 ? false:null"
                        @keydown.enter="()=>sendForm()"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <!-- Nombres -->
                <b-col
                  cols="12"
                >
                  <b-form-group
                    label="Nombres *"
                    label-for="partner-name"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Nombres"
                      rules="required|min:3"
                    >
                      <b-form-input
                        id="partner-name"
                        v-model.trim="statePartner.nombres"
                        type="text"
                        :state="errors.length > 0 ? false:null"
                        @keydown.enter="()=>sendForm()"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <!-- Correo -->
                <b-col
                  cols="12"
                  md="7"
                >
                  <b-form-group
                    label="Correo"
                    label-for="partner-email"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Correo"
                      rules="email"
                    >
                      <b-form-input
                        id="partner-email"
                        v-model.trim="statePartner.correo"
                        type="text"
                        :state="errors.length > 0 ? false:null"
                        @keydown.enter="()=>sendForm()"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <!-- Telefono -->
                <b-col
                  cols="12"
                  md="5"
                >
                  <b-form-group
                    label="Teléfono"
                    label-for="partner-phone"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Teléfono"
                      rules=""
                    >
                      <b-form-input
                        id="partner-phone"
                        v-model.trim="statePartner.telefono"
                        type="number"
                        :state="errors.length > 0 ? false:null"
                        @keydown.enter="()=>sendForm()"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>
            </field-set-component>
          </b-tab>

          <!-- Datos Fiscales -->
          <b-tab>
            <template #title>
              <feather-icon icon="FileTextIcon" />
              <span class="d-none d-md-inline">Fiscal</span>
            </template>
            <field-set-component
              legend="Datos Fiscales :"
              class="mt-2"
            >
              <b-row>
                <!-- Ruc -->
                <input-search-doc-number-component
                  id="partner-number-ruc"
                  v-model="statePartner.numeroRuc"
                  cols="12"
                  colsm="12"
                  colmd="12"
                  collg="6"
                  document-type="RUC"
                  :required-validation="true"
                  @data-found="getDataByRuc"
                />
                <b-col
                  cols="12"
                  lg="6"
                >
                  <b-form-group
                    label="Tipo de Socio *"
                    label-for="partner-partner-type"
                  >
                    <div class="d-flex align-items-center flex-wrap">
                      <div
                        class="d-flex align-items-center mr-1"
                        style="height: 2.714rem;"
                      >
                        <b-form-checkbox
                          v-model="statePartner.cliente"
                          :value="1"
                          :unchecked-value="0"
                        >
                          Cliente
                        </b-form-checkbox>
                      </div>
                      <div
                        class="d-flex align-items-center mr-1"
                        style="height: 2.714rem;"
                      >
                        <b-form-checkbox
                          v-model="statePartner.proveedor"
                          :value="1"
                          :unchecked-value="0"
                        >
                          Proveedor
                        </b-form-checkbox>
                      </div>
                      <div
                        class="d-flex align-items-center"
                        style="height: 2.714rem;"
                      >
                        <b-form-checkbox
                          v-model="statePartner.transportista"
                          :value="1"
                          :unchecked-value="0"
                        >
                          Transportista
                        </b-form-checkbox>
                      </div>
                    </div>
                  </b-form-group>
                </b-col>

                <!-- Razon Social -->
                <b-col
                  cols="12"
                >
                  <b-form-group
                    label="Razón Social *"
                    label-for="partner-company-name"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Razón Social"
                      rules="min:3"
                    >
                      <b-form-input
                        id="partner-company-name"
                        v-model.trim="statePartner.razonSocial"
                        type="text"
                        :state="errors.length > 0 ? false:null"
                        @keydown.enter="()=>sendForm()"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>
            </field-set-component>
          </b-tab>

          <!-- Ubicacion -->
          <b-tab>
            <template #title>
              <feather-icon icon="MapPinIcon" />
              <span class="d-none d-md-inline">Ubicación</span>
            </template>
            <field-set-component
              legend="Ubicación"
              class="mt-2"
            >
              <b-row>
                <!-- Dirección -->
                <b-col
                  cols="12"
                >
                  <b-form-group
                    label="Dirección"
                    label-for="partner-address"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Dirección"
                      rules="min:3"
                    >
                      <b-form-input
                        id="partner-address"
                        v-model.trim="statePartner.direccion"
                        type="text"
                        :state="errors.length > 0 ? false:null"
                        @keydown.enter="()=>sendForm()"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <ubigeo-component
                  cols="12"
                  colsm="12"
                  colmd="12"
                  collg="6"
                  @selected-district="idUbigeo=>statePartner.idUbigeo=idUbigeo"
                />
              </b-row>
            </field-set-component>
          </b-tab>

          <!-- Contacto -->
          <b-tab>
            <template #title>
              <feather-icon icon="PhoneIcon" />
              <span class="d-none d-md-inline">Contacto</span>
            </template>
            <field-set-component
              legend="Contacto :"
              class="mt-2"
            >
              <b-row>
                <!-- Nombre Contacto -->
                <b-col
                  cols="12"
                  md="6"
                >
                  <b-form-group
                    label="Nombre Contacto"
                    label-for="partner-contact-name"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Nombre Contacto"
                      rules="min:3"
                    >
                      <b-form-input
                        id="partner-contact-name"
                        v-model.trim="statePartner.nombreContacto"
                        type="text"
                        :state="errors.length > 0 ? false:null"
                        @keydown.enter="()=>sendForm()"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <!-- Teléfono Contacto -->
                <b-col
                  cols="12"
                  md="6"
                >
                  <b-form-group
                    label="Teléfono Contacto"
                    label-for="partner-contact-phone"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Teléfono Contacto"
                      rules=""
                    >
                      <b-form-input
                        id="partner-contact-phone"
                        v-model.trim="statePartner.telefonoContacto"
                        type="number"
                        :state="errors.length > 0 ? false:null"
                        @keydown.enter="()=>sendForm()"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <!-- Observaciones -->
                <b-col
                  cols="12"
                >
                  <b-form-group
                    label="Observaciones"
                    label-for="partner-contact-observations"
                  >
                    <validation-provider
                      #default="{ errors }"
                      name="Observaciones"
                      rules="min:3"
                    >
                      <b-form-input
                        id="partner-contact-observations"
                        v-model.trim="statePartner.observaciones"
                        type="text"
                        :state="errors.length > 0 ? false:null"
                        @keydown.enter="()=>sendForm()"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>
            </field-set-component>
          </b-tab>
        </b-tabs>

      </b-form>
    </validation-observer>

    <template #modal-footer>
      <button-component
        variant="outline-primary"
        icon-button="PowerIcon"
        text-default="Cerrar"
        :method-function="()=>$bvModal.hide(MODAL_ID)"
      />
      <button-component
        variant="primary"
        icon-button="SaveIcon"
        :loading="statePartner.loading"
        text-default="Guardar"
        :method-function="()=>sendForm()"
      />
    </template>
  </b-modal>
</template>

<script>
/* eslint-disable camelcase */
import {
  BModal, BForm, BRow, BCol, BFormGroup, BFormInput, BTabs, BTab, BFormCheckbox,
} from 'bootstrap-vue'
import { VueSelect } from 'vue-select'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { provide, ref, onMounted } from '@vue/composition-api'
import { endPointsCombo, loadCombos, resetCombos } from '@/helpers/combos'
import InputSearchDocNumberComponent from '@/components/InputSearchDocNumberComponent/InputSearchDocNumberComponent.vue'
import UbigeoComponent from '@/components/UbigeoComponent/UbigeoComponent.vue'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import {
  MODAL_ID, titleNotificationPartner, statePartner, clearStatePartner, combosPartner, combosPartnerUbigeo, statePartnerUbigeo, clearCombosPartnerUbigeo, clearStatePartnerUbigeo,
} from '../ServicesPartner/useVariablesPartner'
import { loadItemsPartner, sendPartner } from '../ServicesPartner/useServicesPartner'

export default {
  name: 'ModalSavePartner',
  components: {
    BModal,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BTabs,
    BTab,
    BFormCheckbox,
    VueSelect,
    InputSearchDocNumberComponent,
    ButtonComponent,
    FieldSetComponent,
    ValidationObserver,
    ValidationProvider,
    UbigeoComponent,
  },
  setup(props, context) {
    const documentSelected = ref('')

    const sendForm = async (actionSend = null, loading = true) => {
      const successValidationPartner = await context.refs['validation-partner'].validate()
      if (!successValidationPartner) return false
      if (loading) statePartner.value.loading = true
      const { status, data } = await sendPartner(actionSend || (statePartner.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) statePartner.value.loading = false
      if (!status) return false
      statePartner.value._id = data.id
      clearStatePartnerUbigeo()
      clearCombosPartnerUbigeo()
      clearStatePartner()
      document.getElementById('partner-name').focus()
      context.refs['validation-partner'].reset()
      await loadItemsPartner()
      return true
    }

    const selectedDocumentType = ({ nombre }) => {
      documentSelected.value = nombre
      setTimeout(() => {
        document.getElementById('partner-number-document').focus()
      }, 0)
    }

    const getDataByNumberDocument = ({
      nombre_o_razon_social, apellido_paterno, apellido_materno, nombres,
    }) => {
      if (nombre_o_razon_social) {
        statePartner.value.apellidoPaterno = ''
        statePartner.value.apellidoMaterno = ''
        statePartner.value.nombres = nombre_o_razon_social
      } else {
        statePartner.value.apellidoPaterno = apellido_paterno
        statePartner.value.apellidoMaterno = apellido_materno
        statePartner.value.nombres = nombres
      }
      document.getElementById('partner-email').focus()
    }

    const getDataByRuc = async ({
      nombre_o_razon_social, direccion, idDepartamento, idProvincia, idDistrito,
    }) => {
      statePartner.value.razonSocial = nombre_o_razon_social
      if (direccion) statePartner.value.direccion = direccion
      if (idDepartamento && idProvincia && idDistrito) {
        await Promise.all([
          loadCombos(combosPartnerUbigeo, ['province'], `${endPointsCombo.provincia}/${idDepartamento}`, 'Provincia'),
          loadCombos(combosPartnerUbigeo, ['district'], `${endPointsCombo.distrito}/${idDepartamento}/${idProvincia}`, 'Distrito'),
        ])
        statePartnerUbigeo.value.departament = idDepartamento
        statePartnerUbigeo.value.province = idProvincia
        const idUbigeo = combosPartnerUbigeo.value.district.data.find(district => district.id === idDistrito)?._id || 0
        statePartnerUbigeo.value.district = idUbigeo
        statePartner.value.idUbigeo = idUbigeo
      }
    }

    const showModalSavePartner = () => {
      if (!statePartner.value._id) {
        clearStatePartner()
        clearStatePartnerUbigeo()
        resetCombos(combosPartnerUbigeo, ['province', 'district'])
      }
    }

    onMounted(() => {
      loadCombos(combosPartner, ['document'], `${endPointsCombo.tipoDocumento}/1`, 'Tipo de Documento')
      loadCombos(combosPartnerUbigeo, ['departament'], endPointsCombo.departamento, 'Departamento')
    })

    provide('ubigeo', statePartnerUbigeo)
    provide('combosUbigeo', combosPartnerUbigeo)

    return {
      MODAL_ID,
      titleNotificationPartner,
      statePartner,
      sendForm,
      documentSelected,
      combosPartner,
      selectedDocumentType,
      getDataByNumberDocument,
      getDataByRuc,
      showModalSavePartner,
    }
  },
}
</script>
