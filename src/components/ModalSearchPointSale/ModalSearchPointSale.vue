<template>
  <validation-observer
    ref="validation-modal-search"
  >
    <b-form>
      <b-modal
        :id="`${modalId}-search`"
        centered
        size="lg"
        :title="`Filtrar ${titleNotification}`"
        no-close-on-backdrop
      >
        <b-row>
          <slot name="before" />
          <b-col
            v-if="!newClient"
            cols="10"
          >
            <validation-provider
              #default="{ errors }"
              name="Columna"
              :rules="rulesColumn"
            >
              <b-form-group
                label="Buscar por: "
                label-for="modal-search-search-field"
                :state="errors.length > 0 ? false:null"
              >
                <vue-select
                  id="modal-search-search-field"
                  :value="serverQuery.campofiltro"
                  :reduce="option => option.field"
                  label="title"
                  :options="columnsFilter"
                  @input="selectField"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col
            v-if="!newClient"
            cols="2"
            class="pt-1"
          >
            <b-button
              variant="success"
              @click="activeNewClient"
            >
              <feather-icon icon="UserPlusIcon" />
            </b-button>
          </b-col>
          <b-col
            v-if="!newClient"
            cols="12"
          >
            <b-form-group
              label="Filtro"
              label-for="modal-search-search-value"
            >
              <validation-provider
                #default="{ errors }"
                name="Filtro"
                :rules="rulesValue"
              >
                <b-form-input
                  id="modal-search-search-value"
                  v-model="serverQuery.filtro"
                  type="text"
                  :state="errors.length > 0 ? false:null"
                  @keypress="e=>$emit('update:serverQuery.filtro', e.target.value)"
                  @keydown.enter="sendSearch"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!--NUEVO CLIENTE-->
          <b-col
            v-if="newClient"
            cols="6"
          >
            <b-form-group
              label="Nombre"
              label-for="modal-search-search-value"
            >
              <validation-provider
                #default="{ errors }"
                name="Nombre"
                :rules="rulesValue"
              >
                <b-form-input
                  id="modal-search-search-value"
                  v-model="serverQuery.filtro"
                  type="text"
                  :state="errors.length > 0 ? false:null"
                  @keypress="e=>$emit('update:serverQuery.filtro', e.target.value)"
                  @keydown.enter="sendSearch"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col
            v-if="newClient"
            cols="6"
          >
            <b-form-group
              label="Apellidos"
              label-for="modal-search-search-value"
            >
              <validation-provider
                #default="{ errors }"
                name="Apellidos"
                :rules="rulesValue"
              >
                <b-form-input
                  id="modal-search-search-value"
                  v-model="serverQuery.filtro"
                  type="text"
                  :state="errors.length > 0 ? false:null"
                  @keypress="e=>$emit('update:serverQuery.filtro', e.target.value)"
                  @keydown.enter="sendSearch"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col
            v-if="newClient"
            cols="6"
          >
            <b-form-group
              label="DNI"
              label-for="modal-search-search-value"
            >
              <validation-provider
                #default="{ errors }"
                name="DNI"
                :rules="rulesValue"
              >
                <b-form-input
                  id="modal-search-search-value"
                  v-model="serverQuery.filtro"
                  type="text"
                  :state="errors.length > 0 ? false:null"
                  @keypress="e=>$emit('update:serverQuery.filtro', e.target.value)"
                  @keydown.enter="sendSearch"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col
            v-if="newClient"
            cols="6"
          >
            <b-form-group
              label="RUC"
              label-for="modal-search-search-value"
            >
              <validation-provider
                #default="{ errors }"
                name="RUC"
                :rules="rulesValue"
              >
                <b-form-input
                  id="modal-search-search-value"
                  v-model="serverQuery.filtro"
                  type="text"
                  :state="errors.length > 0 ? false:null"
                  @keypress="e=>$emit('update:serverQuery.filtro', e.target.value)"
                  @keydown.enter="sendSearch"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col
            v-if="newClient"
            cols="6"
          >
            <b-form-group
              label="Razón Social"
              label-for="modal-search-search-value"
            >
              <validation-provider
                #default="{ errors }"
                name="razón social"
                :rules="rulesValue"
              >
                <b-form-input
                  id="modal-search-search-value"
                  v-model="serverQuery.filtro"
                  type="text"
                  :state="errors.length > 0 ? false:null"
                  @keypress="e=>$emit('update:serverQuery.filtro', e.target.value)"
                  @keydown.enter="sendSearch"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col
            v-if="newClient"
            cols="6"
          >
            <b-form-group
              label="Teléfono"
              label-for="modal-search-search-value"
            >
              <validation-provider
                #default="{ errors }"
                name="Teléfono"
                :rules="rulesValue"
              >
                <b-form-input
                  id="modal-search-search-value"
                  v-model="serverQuery.filtro"
                  type="text"
                  :state="errors.length > 0 ? false:null"
                  @keypress="e=>$emit('update:serverQuery.filtro', e.target.value)"
                  @keydown.enter="sendSearch"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <slot name="after" />
        </b-row>
        <template
          #modal-footer
        >
          <button-component
            v-if="!newClient"
            type="reset"
            variant="outline-secondary"
            text-default="Limpiar"
            icon-button="DeleteIcon"
            :method-function="clearSearch"
          />
          <button-component
            v-if="!newClient"
            type="submit"
            variant="success"
            text-default="Filtrar"
            icon-button="FilterIcon"
            :method-function="sendSearch"
          />
          <button-component
            v-if="newClient"
            type="reset"
            variant="outline-secondary"
            text-default="Regresar"
            icon-button="DeleteIcon"
            :method-function="returnClient"
          />
          <button-component
            v-if="newClient"
            type="submit"
            variant="success"
            text-default="Guardar"
            icon-button="FilterIcon"
            :method-function="SaveIcon"
          />
        </template>
        <field-set-component
          v-if="!newClient"
          legend="Listado"
        >
          <header-search-detail-component
            :column-filter-selected-default="'a.serie'"
          />
          <table-good-component />
        </field-set-component>
      </b-modal>
    </b-form>
  </validation-observer>
</template>

<script>
import {
  BForm, BModal, BRow, BCol, BFormGroup, BFormInput, BButton,
} from 'bootstrap-vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import { VueSelect } from 'vue-select'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'

export default {
  name: 'ModalSearch',
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
    TableGoodComponent,
    FieldSetComponent,
    BButton,
  },
  props: {
    modalId: {
      type: String,
      required: true,
      default: '',
    },
    titleNotification: {
      type: String,
      required: true,
      default: '',
    },
    serverQuery: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    columnsFilter: {
      type: Array,
      required: true,
      default: () => ([]),
    },
    clearFilters: {
      type: Function,
      required: true,
      default: () => {},
    },
    executeLoadItemsWhereClearFilters: {
      type: Boolean,
      required: false,
      default: true,
    },
    loadItems: {
      type: Function,
      required: true,
      default: () => {},
    },
    rulesColumn: {
      type: String,
      required: false,
      default: 'required',
    },
    rulesValue: {
      type: String,
      required: false,
      default: 'required',
    },
  },
  data() {
    return {
      newClient: false,
    }
  },
  methods: {
    selectField(option) {
      if (option === null) {
        this.$emit('update:serverQuery', { ...this.serverQuery, campofiltro: '' })
      } else {
        this.$emit('update:serverQuery', { ...this.serverQuery, campofiltro: option })
      }
    },
    activeNewClient() {
      this.newClient = true
    },
    returnClient() {
      this.newClient = false
    },
  },
  setup(props, context) {
    // Funcion para buscar
    const sendSearch = async () => {
      const successValidationSearch = await context.refs['validation-modal-search'].validate()
      if (!successValidationSearch) return
      context.root.$bvModal.hide(`${props.modalId}-search`)
      await props.loadItems(1)
    }

    // Función para limpiar la búsqueda
    const clearSearch = async () => {
      props.clearFilters()
      context.refs['validation-modal-search'].reset()
      context.root.$bvModal.hide(`${props.modalId}-search`)
      if (props.executeLoadItemsWhereClearFilters) {
        await props.loadItems(1)
      }
    }

    return {
      sendSearch,
      clearSearch,
    }
  },
}
</script>
