<template>
  <!-- DNI -->
  <b-col
    :cols="cols"
    :sm="colsm"
    :md="colmd"
    :lg="collg"
  >
    <validation-provider
      #default="{ errors }"
      :name="documentType"
      :rules="requiredValidation ? `required|${rulesDocumentNumber}` : rulesDocumentNumber"
    >
      <b-form-group
        label="N° Documento"
        :label-for="id"
      >
        <b-input-group>
          <b-form-input
            :id="id"
            :value="documentNumber"
            type="number"
            :state="errors.length > 0 ? false:null"
            @keyup="$emit('keyup', $event.target.value)"
            @keydown.enter="searchDocumentNumber"
          />
          <b-input-group-append>
            <button-component
              class="py-25"
              icon-button="SearchIcon"
              margin-class="m-0"
              :method-function="searchDocumentNumber"
              :disabled="buttonDisabled || loading"
              :loading="loading"
            />
          </b-input-group-append>
        </b-input-group>
        <small class="text-danger">{{ errors[0] }}</small>
      </b-form-group>
    </validation-provider>
  </b-col>
</template>

<script>
import {
  BCol, BFormGroup, BInputGroup, BFormInput, BInputGroupAppend,
} from 'bootstrap-vue'
import { ValidationProvider } from 'vee-validate'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import getDataByDocumentNumber from '@/helpers/getDataByDocumentNumber'

export default {
  name: 'InputSearchDocNumberComponent',
  components: {
    BCol,
    BFormGroup,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    ValidationProvider,
    ButtonComponent,
  },
  model: {
    prop: 'documentNumber',
    event: 'keyup',
  },
  props: {
    // Propiedades permitidas para la distribución de columna en un componente b-row
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
    requiredValidation: {
      type: Boolean,
      required: false,
      default: false,
    },
    documentType: {
      type: String,
      required: true,
      default: '',
    },
    documentNumber: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      required: '',
      default: '',
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    rulesDocumentNumber: {
      get() {
        if (this.documentType === 'DNI') return 'digits:8'
        if (this.documentType === 'RUC') return 'digits:11'
        return ''
      },
      set(newValue) {
        this.documentType = newValue
      },
    },
    buttonDisabled: {
      get() {
        if (
          (this.documentType === 'DNI' && this.documentNumber.length === 8)
          || (this.documentType === 'RUC' && this.documentNumber.length === 11)
        ) {
          return false
        }
        return true
      },
    },
  },
  methods: {
    async searchDocumentNumber() {
      this.loading = true
      const { status, data } = await getDataByDocumentNumber(this.documentNumber)
      this.loading = false
      if (!status) return
      if (data) {
        if (this.documentNumber.length === 11) {
          let idDepartamento = 0
          let idProvincia = 0
          let idDistrito = 0
          if (data.ubigeo[0] !== null && data.ubigeo[0] !== '-') {
            idDepartamento = Number(data.ubigeo[0])
            idProvincia = Number(data.ubigeo[1].slice(-2))
            idDistrito = Number(data.ubigeo[2].slice(-2))
          }
          this.$emit('data-found', {
            ...data,
            idDepartamento,
            idProvincia,
            idDistrito,
          })
        } else {
          this.$emit('data-found', data)
        }
      }
    },
  },
}
</script>
