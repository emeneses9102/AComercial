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
        label-for="input-document-number"
      >
        <b-input-group>
          <b-form-input
            id="input-document-number"
            :value="documentNumber"
            @keyup="$emit('keyup', $event.target.value)"
            :state="errors.length > 0 ? false:null"
            readonly
          />
          <b-input-group-append>
            <button-component
              class="py-25"
              icon-button="SearchIcon"
              margin-class="m-0"
              :method-function="()=>searchDocumentNumber"
              :disabled="buttonDisabled"
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
    }
  },
  computed: {
    rulesDocumentNumber: {
      get() {
        if (this.documentType === 'ruc') return 'digits:11'
        else if (this.documentType === 'dni') return 'digits:8'
      },
      set(newValue) {
        this.documentType = newValuea
      },
    },
  },
  buttonDisabled: {
    get() {
      if (
        (this.documentType === 'dni' && this.documentNumber.length === 8)
        || (this.documentType === 'ruc' && this.documentNumber.length === 11)
      ) {
        return true
      }
      return false
    },
  },
  methods: {
    async searchDocumentNumber(){
      const { status, data } = await getDataByDocumentNumber(this.documentNumber)
      if (!status) return false
      if (data) {
        this.$emit('data-found', data)
      }
    }
  },
}
</script>
