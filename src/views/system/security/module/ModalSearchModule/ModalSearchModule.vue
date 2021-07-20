<template>
  <validation-observer
    ref="validation-module"
  >
    <b-form>
      <b-modal
        :id="`${MODAL_ID}-search`"
        centered
        :title="`Filtrar ${titleNotificationModule}`"
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
                label-for="module-search-field"
                :state="errors.length > 0 ? false:null"
              >
                <vue-select
                  id="module-search-field"
                  v-model="serverQueryModule.campofiltro"
                  :reduce="option => option.field"
                  label="title"
                  :options="columnsFilterModule"
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
              label-for="module-search-value"
            >
              <validation-provider
                #default="{ errors }"
                name="Filtro"
                rules="required"
              >
                <b-form-input
                  id="module-search-value"
                  v-model.trim="serverQueryModule.filtro"
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
  MODAL_ID, titleNotificationModule, serverQueryModule, columnsFilterModule, clearFiltersModule,
} from '../ServicesModule/useVariablesModule'
import { loadItemsModule } from '../ServicesModule/useServicesModule'

export default {
  name: 'ModalSearchModule',
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
      const successValidationSearch = await context.refs['validation-module'].validate()
      if (!successValidationSearch) return
      context.root.$bvModal.hide(`${MODAL_ID}-search`)
      await loadItemsModule(1)
    }

    // Función para limpiar la búsqueda
    const clearSearch = async () => {
      clearFiltersModule()
      context.refs['validation-module'].reset()
      context.root.$bvModal.hide(`${MODAL_ID}-search`)
      await loadItemsModule(1)
    }

    return {
      MODAL_ID,
      titleNotificationModule,
      serverQueryModule,
      columnsFilterModule,
      sendSearch,
      clearSearch,
    }
  },
}
</script>
