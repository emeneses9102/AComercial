<template>
  <b-form>
    <field-set-component legend="Datos Generales">
      <b-row>
        <!-- Módulo -->
        <b-col
          cols="12"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Módulo"
            rules="requiredComboVueSelect:m"
          >
            <b-form-group
              label="Módulo *"
              label-for="menu-module"
              :state="errors.length > 0 ? false:null"
            >
              <vue-select
                id="menu-module"
                v-model="stateMenu.idModulo"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :reduce="module => module._id"
                label="nombre"
                :options="combosMenu.module.data"
                :loading="combosMenu.module.loading"
                :clearable="false"
                :disabled="combosMenu.module.disabled"
              >
                <template v-slot:no-options>
                  No se encontraron resultados.
                </template>
              </vue-select>
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </b-col>

        <!-- Menú -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Menú *"
            label-for="menu-name"
          >
            <validation-provider
              #default="{ errors }"
              name="Menú"
              rules="required|min:3"
            >
              <b-form-input
                id="menu-name"
                v-model.trim="stateMenu.nombre"
                type="text"
                :state="errors.length > 0 ? false:null"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Orden -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Orden *"
            label-for="menu-order"
          >
            <validation-provider
              #default="{ errors }"
              name="Orden"
              rules="required"
            >
              <b-form-input
                id="menu-order"
                v-model.number="stateMenu.orden"
                type="number"
                :state="errors.length > 0 ? false:null"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Nombre Ruta -->
        <b-col
          cols="12"
          lg="6"
        >
          <b-form-group
            label="Nombre de Ruta *"
            label-for="menu-name-route"
          >
            <validation-provider
              #default="{ errors }"
              name="Nombre de Ruta"
              rules="required"
            >
              <b-form-input
                id="menu-name-route"
                v-model.trim="stateMenu.ruta"
                type="text"
                :state="errors.length > 0 ? false:null"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
      </b-row>
    </field-set-component>
  </b-form>
</template>

<script>
import {
  BForm, BRow, BCol, BFormGroup, BFormInput,
} from 'bootstrap-vue'
import { ValidationProvider } from 'vee-validate'
import { VueSelect } from 'vue-select'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import { stateMenu, combosMenu } from '../ServicesMenu/useVariablesMenu'

export default {
  name: 'HeaderMenu',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    VueSelect,
    ValidationProvider,
    FieldSetComponent,
  },
  setup() {
    return {
      stateMenu,
      combosMenu,
    }
  },
}
</script>
