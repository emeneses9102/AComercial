<template>
  <b-form>
    <field-set-component legend="Datos Generales">
      <b-row>
        <!-- Nombre -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Nombre *"
            label-for="storage-name"
          >
            <b-form-input
              id="storage-name"
              v-model.trim="stateStorage.nombre"
              type="text"
            />
          </b-form-group>
        </b-col>

        <!-- Predio -->
        <b-col
          cols="12"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Predio"
            rules="requiredComboVueSelect:m"
          >
            <b-form-group
              label="Predio *"
              label-for="storage-predio"
              :state="errors.length > 0 ? false:null"
            >
              <vue-select
                id="storage-predio"
                v-model="stateStorage.idPredio"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :reduce="predio => predio._id"
                label="nombre"
                :options="combosStorage.predio.data"
                :loading="combosStorage.predio.loading"
                :clearable="false"
                :disabled="combosStorage.predio.disabled"
              >
                <template v-slot:no-options>
                  No se encontraron resultados.
                </template>
              </vue-select>
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </b-col>

        <!-- Tipo Almacen -->
        <b-col
          cols="12"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Tipo Almacén"
            rules="requiredComboVueSelect:m"
          >
            <b-form-group
              label="Tipo Almacén *"
              label-for="storage-storage-type"
              :state="errors.length > 0 ? false:null"
            >
              <vue-select
                id="storage-storage-type"
                v-model="stateStorage.idTipoAlmacen"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :reduce="storageType => storageType._id"
                label="nombre"
                :options="combosStorage.storageType.data"
                :loading="combosStorage.storageType.loading"
                :clearable="false"
                :disabled="combosStorage.storageType.disabled"
              >
                <template v-slot:no-options>
                  No se encontraron resultados.
                </template>
              </vue-select>
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </b-col>

        <!-- Unidad Negocio -->
        <b-col
          cols="12"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Unidad Negocio"
            rules="requiredComboVueSelect:m"
          >
            <b-form-group
              label="Unidad Negocio *"
              label-for="storage-busines-unit"
              :state="errors.length > 0 ? false:null"
            >
              <vue-select
                id="storage-busines-unit"
                v-model="stateStorage.idNegocio"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :reduce="businessUnit => businessUnit._id"
                label="nombre"
                :options="combosStorage.businessUnit.data"
                :loading="combosStorage.businessUnit.loading"
                :clearable="false"
                :disabled="combosStorage.businessUnit.disabled"
              >
                <template v-slot:no-options>
                  No se encontraron resultados.
                </template>
              </vue-select>
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </b-col>

        <!-- Observación -->
        <b-col
          cols="12"
        >
          <b-form-group
            label="Observación"
            label-for="storage-observation"
          >
            <b-form-textarea
              id="storage-observation"
              v-model="stateStorage.observacion"
              rows="2"
              no-resize
            />
          </b-form-group>
        </b-col>
      </b-row>
    </field-set-component>
  </b-form>
</template>

<script>
import {
  BForm, BRow, BCol, BFormGroup, BFormInput, BFormTextarea,
} from 'bootstrap-vue'
import { ValidationProvider } from 'vee-validate'
import { VueSelect } from 'vue-select'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import { stateStorage, combosStorage } from '../ServicesStorage/useVariablesStorage'

export default {
  name: 'HeaderStorage',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    VueSelect,
    ValidationProvider,
    FieldSetComponent,
  },
  setup() {
    return {
      stateStorage,
      combosStorage,
    }
  },
}
</script>
