<template>
  <div class="d-flex justify-content-between align-items-center mb-1">
    <div class="d-flex align-items-center left">
      <button-component
        v-if="optionNew && optionsPermissions.includes(GUARDAR)"
        variant="primary"
        text-default="Nuevo"
        icon-button="FilePlusIcon"
        :method-function="openModal"
        :responsive="true"
      />
    </div>
    <div class="right">
      <template
        v-if="optionsPermissions.includes(EXP_EXCEL) || optionsPermissions.includes(EXP_PDF)"
      >
        <b-dropdown
          variant="primary"
          class="mr-50"
        >
          <template v-slot:button-content>
            <feather-icon
              icon="ExternalLinkIcon"
            />
            <span class="d-none ml-0 d-sm-inline-block ml-sm-50">Exportar</span>
          </template>
          <template
            v-if="optionsPermissions.includes(EXP_EXCEL)"
          >
            <drop-down-excel-component
              :title="exportData.title"
              :url="exportData.url"
              :server-query="exportData.serverQuery"
              :columns="exportData.columns"
            />
          </template>
          <template
            v-if="optionsPermissions.includes(EXP_PDF)"
          >
            <drop-down-pdf-component
              :title="exportData.title"
              :subtitle="exportData.subtitle"
              :url="exportData.url"
              :server-query="exportData.serverQuery"
              :columns="exportData.columns"
              :options-columns-filter="exportData.optionsColumnsFilter"
            />
          </template>
        </b-dropdown>
      </template>
      <button-component
        v-if="optionsPermissions.includes(FILTRAR)"
        variant="primary"
        text-default="Filtrar"
        icon-button="FilterIcon"
        :method-function="openSearch"
        :responsive="true"
      />
    </div>
  </div>
</template>

<script>
import {
  BDropdown,
} from 'bootstrap-vue'
import {
  GUARDAR,
  EXP_PDF,
  EXP_EXCEL,
  FILTRAR,
} from '@/options'
import DropDownExcelComponent from '../DropDownExcelComponent/DropDownExcelComponent.vue'
import DropDownPdfComponent from '../DropDownPdfComponent/DropDownPdfComponent.vue'
import ButtonComponent from '../ButtonComponent/ButtonComponent.vue'

export default {
  name: 'HeaderMaintenanceComponent',
  components: {
    ButtonComponent,
    BDropdown,
    DropDownExcelComponent,
    DropDownPdfComponent,
  },
  props: {
    modalId: {
      type: String,
      required: true,
      default: '',
    },
    clearModal: {
      type: Function,
      required: true,
      default: () => {},
    },
    exportData: {
      type: Object,
      required: false,
      default: () => ({
        title: '',
        subtitle: '',
        url: '',
        serverQuery: {},
        columns: [],
        optionsColumnsFilter: [],
      }),
    },
    functionOpenModal: {
      type: Function,
      required: false,
      default: null,
    },
    optionNew: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    optionsPermissions() {
      if (this.$store.state.rolesAndPermissions.options[this.$route.name]) {
        return this.$store.state.rolesAndPermissions.options[this.$route.name]
      }
      return []
    },
  },
  methods: {
    openModal() {
      if (this.functionOpenModal) {
        this.functionOpenModal()
      } else {
        this.clearModal()
        this.$bvModal.show(this.modalId)
      }
    },
    openSearch() {
      this.$bvModal.show(`${this.modalId}-search`)
    },
  },
  setup() {
    return {
      GUARDAR,
      EXP_PDF,
      EXP_EXCEL,
      FILTRAR,
    }
  },
}
</script>
