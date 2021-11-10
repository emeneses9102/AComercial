<template>
  <validation-observer
    ref="validation-modal-search"
  >
    <b-form>
      <b-modal
        :id="`${modalId}-search`"
        centered
        :title="`Filtrar ${titleNotification}`"
        no-close-on-backdrop
      >
        <field-set-component
          legend="Campos de Filtro"
          collapse="show"
        >
          <b-row>
            <slot name="before" />
            <b-col
              cols="12"
            >
              <validation-provider
                #default="{ errors }"
                name="Columna"
                :rules="rulesColumn"
              >
                <b-form-group
                  label="Columna"
                  label-for="modal-search-search-field"
                  :state="errors.length > 0 ? false:null"
                >
                  <vue-select
                    id="modal-search-search-field"
                    v-model="campofiltro"
                    :reduce="option => option.field"
                    label="title"
                    :options="columnsFilter"
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
                label-for="modal-search-search-value"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Filtro"
                  :rules="rulesValue"
                >
                  <b-form-input
                    id="modal-search-search-value"
                    v-model="filtro"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                    @keydown.enter="sendSearch"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <slot name="after" />
          </b-row>
        </field-set-component>

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
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'

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
  data() {
    return {
      campofiltro: this.serverQuery.campofiltro,
      filtro: this.serverQuery.filtro,
    }
  },
  methods: {
    async sendSearch() {
      const successValidationSearch = await this.$refs['validation-modal-search'].validate()
      if (!successValidationSearch) return
      this.$root.$bvModal.hide(`${this.modalId}-search`)
      this.$emit('update:serverQuery', {
        ...this.serverQuery,
        campofiltro: this.campofiltro,
        filtro: this.filtro,
      })
      this.loadItems(1)
    },
    async clearSearch() {
      this.clearFilters()
      this.$refs['validation-modal-search'].reset()
      this.$root.$bvModal.hide(`${this.modalId}-search`)
      this.$emit('update:serverQuery', {
        ...this.serverQuery,
        campofiltro: '',
        filtro: '',
      })
      this.campofiltro = ''
      this.filtro = ''
      if (this.executeLoadItemsWhereClearFilters) {
        await this.loadItems(1)
      }
    },
  },
}
</script>
