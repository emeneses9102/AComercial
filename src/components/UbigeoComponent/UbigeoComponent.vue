<template>
  <fragment>

    <!-- Departamento -->
    <b-col
      :cols="cols"
      :sm="colsm"
      :md="colmd"
      :lg="collg"
    >
      <!-- Validación -->
      <validation-provider
        #default="{ errors }"
        name="Departamento"
        rules="requiredComboVueSelect:m"
      >
        <b-form-group
          label-for="department"
          label="Departamento *"
          :state="errors.length > 0 ? false:null"
        >
          <!-- Combo Departamento -->
          <v-select
            id="department"
            v-model="ubigeo.departament"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :reduce="departament => departament.id"
            label="nombre"
            :options="combosUbigeo.departament.data"
            :loading="combosUbigeo.departament.loading"
            :disabled="combosUbigeo.departament.disabled"
            :clearable="false"
            @option:selected="selectedDepartament"
          >
            <template v-slot:no-options>
              No se encontraron resultados.
            </template>
          </v-select>
          <small class="text-danger">{{ errors[0] }}</small>
        </b-form-group>
      </validation-provider>
    </b-col>

    <!-- Provincia -->
    <b-col
      :cols="cols"
      :sm="colsm"
      :md="colmd"
      :lg="collg"
    >
      <!-- Validacion -->
      <validation-provider
        #default="{ errors }"
        name="Provincia"
        rules="requiredComboVueSelect"
      >
        <b-form-group
          label-for="province"
          label="Provincia *"
          :state="errors.length > 0 ? false:null"
        >
          <!-- Combo Provincia -->
          <v-select
            id="province"
            v-model="ubigeo.province"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :reduce="province => province.id"
            label="nombre"
            :options="combosUbigeo.province.data"
            :loading="combosUbigeo.province.loading"
            :disabled="combosUbigeo.province.disabled"
            :clearable="false"
            @option:selected="selectedProvince"
          >
            <template v-slot:no-options>
              No se encontraron resultados.
            </template>
          </v-select>
          <small class="text-danger">{{ errors[0] }}</small>
        </b-form-group>
      </validation-provider>
    </b-col>

    <!-- Distrito -->
    <b-col
      :cols="cols"
      :sm="colsm"
      :md="colmd"
      :lg="collg"
    >
      <!-- Validacion -->
      <validation-provider
        #default="{ errors }"
        name="Distrito"
        rules="requiredComboVueSelect:m"
      >
        <b-form-group
          label-for="district"
          label="Distrito *"
          :state="errors.length > 0 ? false:null"
        >
          <!-- Combo Distrito -->
          <v-select
            id="district"
            v-model="ubigeo.district"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :reduce="district => district._id"
            label="nombre"
            :options="combosUbigeo.district.data"
            :loading="combosUbigeo.district.loading"
            :disabled="combosUbigeo.district.disabled"
            :clearable="false"
            @option:selected="selectedDistrict"
          >
            <template v-slot:no-options>
              No se encontraron resultados.
            </template>
          </v-select>
          <small class="text-danger">{{ errors[0] }}</small>
        </b-form-group>
      </validation-provider>
    </b-col>
  </fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import { BCol, BFormGroup } from 'bootstrap-vue'
import { ValidationProvider } from 'vee-validate'
import vSelect from 'vue-select'
import { inject } from '@vue/composition-api'
import { endPointsCombo, loadCombos, resetCombos } from '@/helpers/combos'
import { idUbigeo } from './useVariablesUbigeo'

export default {
  name: 'UbigeoComponent',
  components: {
    Fragment,
    BCol,
    BFormGroup,
    ValidationProvider,
    vSelect,
  },
  props: {
    // Propiedades permitidas para la distribución de columnas del Departamento, Provincia, Distrito en un componente b-row
    cols: {
      type: String,
      default: '12',
    },
    colsm: {
      type: String,
      default: '12',
    },
    colmd: {
      type: String,
      default: '12',
    },
    collg: {
      type: String,
      default: '12',
    },
  },
  setup(props, context) {
    const combosUbigeo = inject('combosUbigeo')
    const ubigeo = inject('ubigeo')

    // Función que se ejecutará cuando se selecciona un Departamento
    const selectedDepartament = async ({ id }) => {
      ubigeo.value.departament = id
      ubigeo.value.province = 0
      ubigeo.value.district = 0
      idUbigeo.value = 0
      resetCombos(combosUbigeo, ['province', 'district'])
      loadCombos(combosUbigeo, ['province'], `${endPointsCombo.provincia}/${ubigeo.value.departament}`, 'Provincia')
      context.emit('selected-district', idUbigeo.value)
    }

    // Función que se ejecutará cuando se selecciona una Provincia
    const selectedProvince = async ({ id }) => {
      ubigeo.value.province = id
      ubigeo.value.district = 0
      idUbigeo.value = 0
      resetCombos(combosUbigeo, ['district'])
      loadCombos(combosUbigeo, ['district'], `${endPointsCombo.distrito}/${ubigeo.value.departament}/${ubigeo.value.province}`, 'Distrito')
      context.emit('selected-district', idUbigeo.value)
    }

    // Función que se ejecutará cuando se selecciona un Distrito
    const selectedDistrict = async ({ _id }) => {
      ubigeo.value.district = _id
      idUbigeo.value = _id
      context.emit('selected-district', idUbigeo.value)
    }

    return {
      combosUbigeo,
      ubigeo,
      selectedDepartament,
      selectedProvince,
      selectedDistrict,
    }
  },
}
</script>

<style>

</style>
