<template>
  <fragment>
    <div>
      <b-modal
        id="modal-export"
        centered
        title="Exportar en PDF"
        no-close-on-backdrop
      >
        <!-- Orientación -->
        <field-set-component
          legend="Orientación"
          class="field-set-pdf"
        >
          <b-row>
            <b-col
              cols="12"
            >
              <div class="demo-inline-spacing mb-50">
                <b-form-radio
                  v-model="orientation"
                  name="orientation"
                  value="p"
                  class="mt-50"
                >
                  Vertical
                </b-form-radio>
                <b-form-radio
                  v-model="orientation"
                  name="orientation"
                  value="l"
                  class="mt-50"
                >
                  Horizontal
                </b-form-radio>
              </div>
            </b-col>
          </b-row>
        </field-set-component>

        <!-- Modo de Exportación -->
        <field-set-component
          class="field-set-pdf mt-75"
          legend="Datos a exportar"
        >
          <b-row>
            <b-col
              cols="12"
            >
              <v-select
                v-model="exportMode"
                :reduce="option => option.value"
                label="title"
                :options="exportModes"
                :clearable="false"
                class="mb-50"
              >
                <template v-slot:no-options>
                  No se encontraron resultados.
                </template>
              </v-select>
            </b-col>
          </b-row>
        </field-set-component>

        <!-- Columnas a exportar -->

        <field-set-component
          class="field-set-pdf mt-75"
          legend="Columnas"
        >
          <b-row>
            <b-col
              cols="12"
            >
              <div class="list-group list-group-flush checkbox-grid mb-50">
                <template v-for="(column) in columns">
                  <b-form-checkbox
                    v-if="column.field !== 'action'"
                    :key="column.field"
                    v-model="column.pdf"
                    class="mt-50"
                  >
                    {{ column.label }}
                  </b-form-checkbox>
                </template>
              </div>
            </b-col>
          </b-row>
        </field-set-component>

        <template #modal-footer>
          <!-- <button-component
            text-default="Imprimir"
            icon-button="PrinterIcon"
            :method-function="()=>exportPDF('print')"
            :loading="loadingPrint"
          /> -->
          <button-component
            text-default="Descargar"
            icon-button="DownloadIcon"
            :method-function="()=>exportPDF('download')"
            :loading="loadingDownload"
          />
          <button-component
            text-default="Visualizar"
            icon-button="EyeIcon"
            :method-function="()=>exportPDF('preview')"
            :loading="loadingPreview"
          />
        </template>
      </b-modal>
    </div>
    <b-dropdown-item
      @click="$bvModal.show('modal-export')"
    >
      <span>PDF</span>
    </b-dropdown-item>
  </fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import {
  BRow, BCol, BModal, BFormCheckbox, BFormRadio, BDropdownItem,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'
import exportPdf from '@/helpers/exportPdf'
import useFetchApiSimsac from '@/hooks/useFetchApiSimsac'
import FieldSetComponent from '../FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '../ButtonComponent/ButtonComponent.vue'

export default {
  name: 'DropDownPdfComponent',
  components: {
    Fragment,
    BRow,
    BCol,
    BModal,
    BFormCheckbox,
    BFormRadio,
    BDropdownItem,
    vSelect,
    FieldSetComponent,
    ButtonComponent,
  },
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
    subtitle: {
      type: String,
      required: false,
      default: '',
    },
    url: {
      type: String,
      required: true,
      default: '',
    },
    serverQuery: {
      type: Object,
      required: true,
      default: () => {},
    },
    columns: {
      type: Array,
      required: true,
      default: () => [],
    },
    optionsColumnsFilter: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  setup(props) {
    const loadingPreview = ref(false)
    const loadingPrint = ref(false)
    const loadingDownload = ref(false)

    const orientations = {
      landscape: 'l',
      portrait: 'p',
    }
    const exportModes = [
      {
        title: 'Exportar todos los datos',
        value: 'all',
      },
      {
        title: 'Exportar los datos con el filtro actual',
        value: 'filter',
      },
    ]

    const orientation = ref(orientations.portrait)
    const exportMode = ref(exportModes[0].value)

    const exportPDF = async action => {
      let response
      const columnsSelected = props.columns.filter(column => column.pdf)
      const renameColumns = columnsSelected.map(column => ({ header: column.label, dataKey: column.field, type: column.type }))

      if (action === 'print') loadingPrint.value = true
      else if (action === 'preview') loadingPreview.value = true
      else if (action === 'download') loadingDownload.value = true

      if (exportMode.value === 'all') {
        response = await useFetchApiSimsac(props.url, {
          ...props.serverQuery,
          pinicio: 0,
          pfin: 0,
          campofiltro: '',
          filtro: '',
        })
      } else if (exportMode.value === 'filter') {
        response = await useFetchApiSimsac(props.url, {
          ...props.serverQuery,
          pinicio: 0,
          pfin: 0,
        })
      }

      if (action === 'print') loadingPrint.value = false
      else if (action === 'preview') loadingPreview.value = false
      else if (action === 'download') loadingDownload.value = false

      const { error, data: rows } = response
      if (error) return

      const headerText = {
        title: props.title,
        subtitle: props.subtitle,
      }

      const dataTable = {
        columns: renameColumns,
        rows,
        serverQuery: props.serverQuery,
        optionsColumnsFilter: props.optionsColumnsFilter,
      }

      exportPdf(
        action,
        orientation.value,
        exportMode.value,
        headerText,
        dataTable,
      )
    }

    return {
      orientation,
      exportModes,
      exportMode,
      loadingPreview,
      loadingPrint,
      loadingDownload,
      exportPDF,
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
.field-set-pdf legend {
  margin-bottom: 0;
}
</style>
