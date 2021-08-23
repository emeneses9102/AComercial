<template>
  <field-set-component legend="Nuevo Cliente">
    <validation-observer
      ref="validation-modal-search"
    >
      <b-form>
        <b-row>
          <slot name="before" />
          <!--NUEVO CLIENTE-->
          <b-col
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
          <div class="container  d-flex">
            <div class="ml-auto">
              <button-component
                type="reset"
                variant="success"
                text-default="Guardar"
                icon-button="DeleteIcon"
                :method-function="returnClient"
              />
            </div>
          </div>
        </b-row>
      </b-form>
    </validation-observer>
  </field-set-component>
</template>

<script>
import {
  BForm, BRow, BCol, BFormGroup, BFormInput,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'

export default {
  name: 'ModalSearch',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    ValidationObserver,
    ValidationProvider,
    ButtonComponent,
    FieldSetComponent,
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
  methods: {
    selectField(option) {
      if (option === null) {
        this.$emit('update:serverQuery', { ...this.serverQuery, campofiltro: '' })
      } else {
        this.$emit('update:serverQuery', { ...this.serverQuery, campofiltro: option })
      }
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
