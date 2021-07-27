<template>
  <fragment>
    <b-col
      cols="12"
    >
      <!-- Validación -->
      <validation-provider
        #default="{ errors }"
        name="Segmento"
        rules="requiredComboVueSelect:m"
      >
        <b-form-group
          label-for="segment-code-sunat"
          label="Segmento *"
          :state="errors.length > 0 ? false:null"
        >
          <!-- Combo Segmento -->
          <v-select
            id="segment-code-sunat"
            v-model="stateCodesSunat.segmentSunat"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :reduce="segmentSunat => segmentSunat._id"
            label="nombre"
            :options="combosCodesSunat.segmentSunat.data"
            :loading="combosCodesSunat.segmentSunat.loading"
            :disabled="combosCodesSunat.segmentSunat.disabled"
            :clearable="false"
            @option:selected="selectedSegmentSunat"
          >
            <template v-slot:no-options>
              No se encontraron resultados.
            </template>
          </v-select>
          <small class="text-danger">{{ errors[0] }}</small>
        </b-form-group>
      </validation-provider>
    </b-col>
    <b-col
      cols="12"
    >
      <!-- Validacion -->
      <validation-provider
        #default="{ errors }"
        name="Familia"
        rules="requiredComboVueSelect"
      >
        <b-form-group
          label-for="family-code-sunat"
          label="Familia *"
          :state="errors.length > 0 ? false:null"
        >
          <!-- Combo Familia -->
          <v-select
            id="family-code-sunat"
            v-model="stateCodesSunat.familySunat"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :reduce="familySunat => familySunat._id"
            label="nombre"
            :options="combosCodesSunat.familySunat.data"
            :loading="combosCodesSunat.familySunat.loading"
            :disabled="combosCodesSunat.familySunat.disabled"
            :clearable="false"
            @option:selected="selectedFamilySunat"
          >
            <template v-slot:no-options>
              No se encontraron resultados.
            </template>
          </v-select>
          <small class="text-danger">{{ errors[0] }}</small>
        </b-form-group>
      </validation-provider>
    </b-col>
    <b-col
      cols="12"
    >
      <!-- Validacion -->
      <validation-provider
        #default="{ errors }"
        name="Clase"
        rules="requiredComboVueSelect"
      >
        <b-form-group
          label-for="class-code-sunat"
          label="Clase *"
          :state="errors.length > 0 ? false:null"
        >
          <!-- Combo Clase -->
          <v-select
            id="class-code-sunat"
            v-model="stateCodesSunat.classSunat"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :reduce="classSunat => classSunat._id"
            label="nombre"
            :options="combosCodesSunat.classSunat.data"
            :loading="combosCodesSunat.classSunat.loading"
            :disabled="combosCodesSunat.classSunat.disabled"
            :clearable="false"
            @option:selected="selectedClassSunat"
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
import {
  BCol, BFormGroup,
} from 'bootstrap-vue'
import { Fragment } from 'vue-fragment'
import VSelect from 'vue-select'
import { ValidationProvider } from 'vee-validate'
import { inject } from '@vue/composition-api'
import { endPointsCombo, loadCombos, resetCombos } from '@/helpers/combos'

export default {
  name: 'UniqueCodeComponent',
  components: {
    BCol,
    BFormGroup,
    Fragment,
    VSelect,
    ValidationProvider,
  },
  setup(props, context) {
    const stateCodesSunat = inject('stateCodesSunat')
    const combosCodesSunat = inject('combosCodesSunat')

    const selectedSegmentSunat = ({ _id }) => {
      stateCodesSunat.value.familySunat = 0
      stateCodesSunat.value.classSunat = 0
      resetCombos(combosCodesSunat, ['familySunat', 'classSunat'])
      loadCombos(combosCodesSunat, ['familySunat'], `${endPointsCombo.familiaSunat}/1/${_id}`, 'Familia Sunat')
    }

    const selectedFamilySunat = ({ _id }) => {
      stateCodesSunat.value.classSunat = 0
      resetCombos(combosCodesSunat, ['classSunat'])
      loadCombos(combosCodesSunat, ['classSunat'], `${endPointsCombo.claseSunat}/1/${_id}`, 'Clase Sunat')
    }

    const selectedClassSunat = () => {
      const opcional = `c.idsegmento=${stateCodesSunat.value.segmentSunat} and b.idfamilia=${stateCodesSunat.value.familySunat} and a.idclase=${stateCodesSunat.value.classSunat}`
      context.emit('selected-unique-code-sunat', opcional)
    }

    return {
      combosCodesSunat,
      selectedSegmentSunat,
      selectedFamilySunat,
      selectedClassSunat,
      stateCodesSunat,
    }
  },
}
</script>

<style>

</style>
