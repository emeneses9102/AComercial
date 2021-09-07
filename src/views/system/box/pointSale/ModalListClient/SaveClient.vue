<template>
  <b-form>
    <b-tabs>
      <!-- Datos Generales -->
      <b-tab>
        <template #title>
          <feather-icon icon="UserIcon" />
          <span class="d-none d-md-inline">General</span>
        </template>
        <field-set-component legend="Nuevo Cliente">
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
                    v-model="stateClient.idDocumento"
                    class="style-chooser"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :reduce="document => document._id"
                    label="nombre"
                    :options="combosClient.document.data"
                    :loading="combosClient.document.loading"
                    :clearable="false"
                    :disabled="combosClient.document.disabled"
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
              v-model="stateClient.numeroDocumento"
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
                label-for="client-paternal"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Ape. Paterno"
                  rules="min:3"
                >
                  <b-form-input
                    id="client-paternal"
                    v-model.trim="stateClient.apellidoPaterno"
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
                    v-model.trim="stateClient.apellidoMaterno"
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
                    v-model.trim="stateClient.nombres"
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
                    v-model.trim="stateClient.correo"
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
                    v-model.trim="stateClient.telefono"
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
              v-model="stateClient.numeroRuc"
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
                      v-model="stateClient.cliente"
                      :value="1"
                      :unchecked-value="0"
                    >
                      Cliente
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
                    v-model.trim="stateClient.razonSocial"
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
                    v-model.trim="stateClient.direccion"
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
              @selected-district="idUbigeo=>stateClient.idUbigeo=idUbigeo"
            />
          </b-row>
        </field-set-component>
      </b-tab>
    </b-tabs>
  </b-form>
</template>

<script>
/* eslint-disable camelcase */
import {
  BForm, BRow, BCol, BFormGroup, BFormInput, BTabs, BTab, BFormCheckbox,
} from 'bootstrap-vue'
import { VueSelect } from 'vue-select'
import { ValidationProvider } from 'vee-validate'
import { provide, ref } from '@vue/composition-api'
import { endPointsCombo, loadCombos } from '@/helpers/combos'
import InputSearchDocNumberComponent from '@/components/InputSearchDocNumberComponent/InputSearchDocNumberComponent.vue'
import UbigeoComponent from '@/components/UbigeoComponent/UbigeoComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import {
  stateClient, combosClient, combosClientUbigeo, stateClientUbigeo,
} from '../ServicesClient/useVariablesClient'

export default {
  name: 'ModalSearch',
  components: {
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
    ValidationProvider,
    FieldSetComponent,
    UbigeoComponent,
  },
  methods: {
    selectField(option) {
      if (option === null) {
        this.$emit('update:serverQuery', { ...this.serverQuery, campofiltro: '' })
      } else {
        this.$emit('update:serverQuery', { ...this.serverQuery, campofiltro: option })
      }
    },
  },
  setup(props, context) {
    const documentSelected = ref('')

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
        stateClient.value.apellidoPaterno = ''
        stateClient.value.apellidoMaterno = ''
        stateClient.value.nombres = nombre_o_razon_social
      } else {
        stateClient.value.apellidoPaterno = apellido_paterno
        stateClient.value.apellidoMaterno = apellido_materno
        stateClient.value.nombres = nombres
      }
      document.getElementById('partner-email').focus()
    }

    const getDataByRuc = async ({
      nombre_o_razon_social, direccion, idDepartamento, idProvincia, idDistrito,
    }) => {
      stateClient.value.razonSocial = nombre_o_razon_social
      if (direccion) stateClient.value.direccion = direccion
      if (idDepartamento && idProvincia && idDistrito) {
        await Promise.all([
          loadCombos(combosClientUbigeo, ['province'], `${endPointsCombo.provincia}/${idDepartamento}`, 'Provincia'),
          loadCombos(combosClientUbigeo, ['district'], `${endPointsCombo.distrito}/${idDepartamento}/${idProvincia}`, 'Distrito'),
        ])
        stateClientUbigeo.value.departament = idDepartamento
        stateClientUbigeo.value.province = idProvincia
        const idUbigeo = combosClientUbigeo.value.district.data.find(district => district.id === idDistrito)?._id || 0
        stateClientUbigeo.value.district = idUbigeo
        stateClient.value.idUbigeo = idUbigeo
      }
    }

    // Funcion para buscar
    const sendSearch = async () => {
      const successValidationSearch = await context.refs['validation-modal-search'].validate()
      if (!successValidationSearch) return
      context.root.$bvModal.hide(`${props.modalId}-search`)
      await props.loadItems(1)
    }

    // Función para limpiar la búsqueda
    const clearSearch = async () => {
      props.clearFilters()
      context.refs['validation-modal-search'].reset()
      context.root.$bvModal.hide(`${props.modalId}-search`)
      if (props.executeLoadItemsWhereClearFilters) {
        await props.loadItems(1)
      }
    }

    provide('ubigeo', stateClientUbigeo)
    provide('combosUbigeo', combosClientUbigeo)

    return {
      stateClient,
      sendSearch,
      documentSelected,
      combosClient,
      selectedDocumentType,
      getDataByNumberDocument,
      getDataByRuc,
      clearSearch,
    }
  },
}
</script>
