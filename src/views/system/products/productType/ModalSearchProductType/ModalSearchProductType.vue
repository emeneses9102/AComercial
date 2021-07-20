<template>
  <validation-observer
    ref="validation-product-type"
  >
    <b-form>
      <b-modal
        :id="`${MODAL_ID}-search`"
        centered
        :title="`Filtrar ${titleNotificationProductType}`"
        no-close-on-backdrop
      >
        <b-row>
          <b-col
            cols="12"
          >
            <validation-provider
              #default="{ errors }"
              name="Columna"
              rules="required"
            >
              <b-form-group
                label="Columna"
                label-for="product-type-search-field"
                :state="errors.length > 0 ? false:null"
              >
                <vue-select
                  id="product-type-search-field"
                  v-model="serverQueryProductType.campofiltro"
                  :reduce="option => option.field"
                  label="title"
                  :options="columnsFilterProductType"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col
            cols="12"
          >
            <b-form-group
              label="Filtro"
              label-for="product-type-search-value"
            >
              <validation-provider
                #default="{ errors }"
                name="Filtro"
                rules="required"
              >
                <b-form-input
                  id="product-type-search-value"
                  v-model.trim="serverQueryProductType.filtro"
                  type="text"
                  :state="errors.length > 0 ? false:null"
                  @keydown.enter="sendSearch"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>

        <template #modal-footer>
          <button-component
            type="reset"
            variant="outline-primary"
            text-default="Limpiar"
            icon-button="DeleteIcon"
            :method-function="clearSearch"
          />
          <button-component
            type="submit"
            variant="primary"
            text-default="Filtrar"
            icon-button="FilterIcon"
            :method-function="sendSearch"
          />
        </template>
      </b-modal>
    </b-form>
  </validation-observer>
</template>

<script>
import {
  BForm, BModal, BRow, BCol, BFormGroup, BFormInput,
} from 'bootstrap-vue'
import { VueSelect } from 'vue-select'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import {
  MODAL_ID, titleNotificationProductType, serverQueryProductType, columnsFilterProductType, clearFiltersProductType,
} from '../ServicesProductType/useVariablesProductType'
import { loadItemsProductType } from '../ServicesProductType/useServicesProductType'

export default {
  name: 'ModalSearchProductType',
  components: {
    BForm,
    BModal,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    VueSelect,
    ValidationObserver,
    ValidationProvider,
    ButtonComponent,
  },
  setup(props, context) {
    // Funcion para buscar
    const sendSearch = async () => {
      const successValidationSearch = await context.refs['validation-product-type'].validate()
      if (!successValidationSearch) return
      context.root.$bvModal.hide(`${MODAL_ID}-search`)
      await loadItemsProductType(1)
    }

    // Función para limpiar la búsqueda
    const clearSearch = async () => {
      clearFiltersProductType()
      context.refs['validation-product-type'].reset()
      context.root.$bvModal.hide(`${MODAL_ID}-search`)
      await loadItemsProductType(1)
    }

    return {
      MODAL_ID,
      titleNotificationProductType,
      serverQueryProductType,
      columnsFilterProductType,
      sendSearch,
      clearSearch,
    }
  },
}
</script>
