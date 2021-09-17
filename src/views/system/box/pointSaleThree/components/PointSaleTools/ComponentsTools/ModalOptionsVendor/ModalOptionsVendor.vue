<template>
  <b-modal
    id="modal-options-vendor"
    centered
    title="Seleccionar Vendedor"
    no-close-on-backdrop
  >
    <!-- Seleccionar Vendedor -->

    <field-set-component
      class="mt-75"
      legend="Selecciona un Vendedor"
    >
      <b-row>
        <b-col
          v-if="stateVendorSelected"
          cols="12"
        >
          {{ nameVendorSelected }}
        </b-col>
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
                  @input="filteredVendorsByName"
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
            class="scrollable-container media-list scroll-area-vendor mb-2"
          >
            <div class="list-group list-group-flush checkbox-grid mb-1">
              <template v-for="(option) in stateDataVendor.filteredData">
                <b-form-radio
                  :key="option._id"
                  v-model="stateVendorSelected"
                  class="mt-50"
                  :value="option._id"
                  name="option-selected"
                  @input="$emit('vendor-selected', option)"
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
        :method-function="()=>$bvModal.hide('modal-options-vendor')"
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
import {
  onMounted,
  computed,
} from '@vue/composition-api'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import {
  stateDataVendor,
  stateVendorSelected,
  stateQueryName,
} from './useVariablesVendor'
import {
  getAllVendors,
  filteredVendorsByName,
  clearStateDataVendor,
  clearStateVendorSelected,
  clearStateQueryName,
} from './useServicesVendor'

export default {
  name: 'ModalOptionsVendor',
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
      clearStateDataVendor()
      clearStateVendorSelected()
      clearStateQueryName()
      getAllVendors()
    })

    const nameVendorSelected = computed(() => {
      if (stateVendorSelected.value) {
        return stateDataVendor.value.data.find(el => el._id === stateVendorSelected.value).nombre
      }
      return ''
    })

    return {
      stateDataVendor,
      nameVendorSelected,
      stateVendorSelected,
      stateQueryName,
      filteredVendorsByName,
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
.scroll-area-vendor {
  position: relative;
  margin: auto;
  max-height: 300px;
}
</style>
