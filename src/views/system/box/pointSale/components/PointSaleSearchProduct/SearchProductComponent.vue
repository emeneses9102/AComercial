<template>
  <validation-observer
    ref="validation-modal-search"
  >
    <b-form>
      <b-row>
        <slot name="before" />
        <b-col
          cols="8"
        >
          <validation-provider
            #default="{ errors }"
            name="Filtro"
            :rules="rulesValue"
          >
            <b-form-input
              id="modal-search-search-value"
              v-model="serverQuery.filtro"
              class="control search-product bg-dark text-white form-control"
              placeholder="Ingrese o escanee el código"
              style="font-size:1.2em"
              type="text"
              :state="errors.length > 0 ? false:null"
              @keypress="e=>$emit('update:serverQuery.filtro', e.target.value)"
              @keydown.enter="sendSearch"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>
        <b-col
          cols="4"
        >
          <validation-provider
            #default="{ errors }"
            name="Columna"
            :rules="rulesColumn"
          >
            <vue-select
              id="modal-search-search-field"
              v-model="searchField"
              class="style-chooser"
              :value="serverQuery.campofiltro"
              :reduce="option => option.field"
              label="title"
              :options="columnsFilter"
              @input="selectField"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-col>
        <slot name="after" />
      </b-row>
    </b-form>
  </validation-observer>
</template>

<script>
import {
  BForm, BRow, BCol, BFormInput,
} from 'bootstrap-vue'
import { VueSelect } from 'vue-select'
import { ref } from '@vue/composition-api'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'ModalSearch',
  components: {
    BForm,
    BRow,
    BCol,
    BFormInput,
    VueSelect,
    ValidationObserver,
    ValidationProvider,
  },
  props: {
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
    columnFilterSelectedDefault: {
      type: String,
      required: true,
      default: () => '',
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
    const searchField = ref(props.columnFilterSelectedDefault)
    // Funcion para buscar
    const sendSearch = async () => {
      const successValidationSearch = await context.refs['validation-modal-search'].validate()
      if (!successValidationSearch) return
      context.root.$bvModal.hide(`${props.modalId}-search`)
      await props.loadItems(1)
      context.emit('search-product')
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
      searchField,
    }
  },
}
</script>
 <style scoped>
 .style-chooser .vs__search::placeholder,
  .style-chooser .vs__dropdown-toggle,
  .style-chooser .vs__dropdown-menu {
    background: #4b4b4b;
    border: none;
    color: #ffff;
  }

  .style-chooser .vs__clear,
  .style-chooser .vs__open-indicator {
    fill: #ffff;
  }
 .v-select.vs--single .vs__selected{
    color:#fff !important;
  }
 </style>
