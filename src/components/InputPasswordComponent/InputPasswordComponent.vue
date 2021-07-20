<template>
  <b-col
    :cols="cols"
    :sm="colsm"
    :md="colmd"
    :lg="collg"
  >
    <!-- Contraseña -->
    <b-form-group
      :label="textField"
      :label-for="`input-password-${textField}`"
    >
      <validation-provider
        #default="{ errors }"
        :name="textField"
        :rules="rulesValidation"
      >
        <b-input-group
          class="input-group-merge"
          :class="errors.length > 0 ? 'is-invalid':null"
        >
          <b-form-input
            :id="`input-password-${textField}`"
            :value="value"
            :type="passwordFieldType"
            class="form-control-merge"
            :state="errors.length > 0 ? false:null"
            placeholder="·················"
            @keyup="$emit('keyup', $event.target.value)"
          />

          <b-input-group-append is-text>
            <feather-icon
              class="cursor-pointer"
              :icon="passwordToggleIcon"
              @click="togglePasswordVisibility"
            />
          </b-input-group-append>
        </b-input-group>
        <small class="text-danger">{{ errors[0] }}</small>
      </validation-provider>
    </b-form-group>
  </b-col>
</template>

<script>
import {
  BCol, BFormGroup, BInputGroup, BFormInput, BInputGroupAppend,
} from 'bootstrap-vue'
import { ValidationProvider } from 'vee-validate'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'

export default {
  name: 'InputPasswordCompoent',
  components: {
    BCol,
    BFormGroup,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    ValidationProvider,
  },
  mixins: [togglePasswordVisibility],
  model: {
    prop: 'value',
    event: 'keyup',
  },
  props: {
    // Propiedades permitidas para la distribución de columnas del Input Password en un componente b-row
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
    rulesValidation: {
      type: String,
      required: false,
      default: '',
    },
    textField: {
      type: String,
      required: true,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
}
</script>
