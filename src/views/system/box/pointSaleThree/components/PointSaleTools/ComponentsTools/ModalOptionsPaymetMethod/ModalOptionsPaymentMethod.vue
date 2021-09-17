<template>
  <b-modal
    id="modal-options-payment-method"
    centered
    title="Seleccionar Forma de Pago"
    no-close-on-backdrop
    size="sm"
  >
    <!-- Seleccionar Forma de Pago -->

    <field-set-component
      class="mt-75"
      legend="Selecciona una Forma de Pago"
    >
      <b-row>
        <b-col
          cols="12"
        >
          <div class="mt-50 mb-2 mx-auto">
            <b-form-group>
              <b-input-group class="input-group-merge">
                <b-input-group-prepend is-text>
                  <feather-icon icon="SearchIcon" />
                </b-input-group-prepend>
                <b-form-input
                  id="icons-search"
                  v-model="stateQueryName"
                  placeholder="Buscar icono ..."
                  @input="filteredPaymentMethodsByName"
                />
              </b-input-group>
            </b-form-group>
          </div>
        </b-col>
        <b-col
          cols="12"
        >
          <vue-perfect-scrollbar
            :settings="perfectScrollbarSettings"
            class="scrollable-container media-list scroll-area-payment-method mb-2"
          >
            <div class="list-group list-group-flush checkbox-grid mb-1">
              <template v-for="(option) in stateDataPaymentMethod.filteredData">
                <b-form-radio
                  :key="option._id"
                  v-model="statePaymentMethodSelected"
                  class="mt-50"
                  :value="option"
                  name="option-selected"
                  @input="$emit('payment-method-selected', option)"
                >
                  {{ option.nombre }}
                </b-form-radio>
              </template>
            </div>
          </vue-perfect-scrollbar>
        </b-col>
      </b-row>
    </field-set-component>

    <template #modal-footer>
      <!-- <button-component
        variant="outline-primary"
        text-default="Limpiar"
        icon-button="DeleteIcon"
        :method-function="()=>clearStateQueryName()"
      /> -->
      <button-component
        text-default="Listo"
        icon-button="CheckIcon"
        :method-function="()=>$bvModal.hide('modal-options-payment-method')"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal,
  BRow,
  BCol,
  BFormGroup,
  BInputGroup,
  BInputGroupPrepend,
  BFormInput,
  BFormRadio,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { onMounted } from '@vue/composition-api'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import {
  stateDataPaymentMethod,
  statePaymentMethodSelected,
  stateQueryName,
} from './useVariablesPaymentMethod'
import {
  getAllPaymentMethods,
  filteredPaymentMethodsByName,
  clearStateDataPaymentMethod,
  clearStatePaymentMethodSelected,
  clearStateQueryName,
} from './useServicesPaymentMethod'

export default {
  name: 'ModalOptionsPaymentMethod',
  components: {
    BModal,
    BRow,
    BCol,
    BFormGroup,
    BInputGroup,
    BInputGroupPrepend,
    BFormInput,
    BFormRadio,
    VuePerfectScrollbar,
    FieldSetComponent,
    ButtonComponent,
  },
  data() {
    return {
      perfectScrollbarSettings: {
        wheelPropagation: false,
      },
    }
  },
  setup() {
    onMounted(() => {
      clearStateDataPaymentMethod()
      clearStatePaymentMethodSelected()
      clearStateQueryName()
      getAllPaymentMethods()
    })

    return {
      stateDataPaymentMethod,
      statePaymentMethodSelected,
      stateQueryName,
      filteredPaymentMethodsByName,
      clearStateQueryName,
    }
  },
}
</script>

<style lang="scss">
.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  grid-gap: 1em;
}
.list-group-item {
  transition: all 1s
}
.scroll-area-payment-method {
  position: relative;
  margin: auto;
  max-height: 300px;
}
</style>
