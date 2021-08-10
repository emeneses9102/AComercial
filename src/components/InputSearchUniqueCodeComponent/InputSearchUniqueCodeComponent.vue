<template>
  <fragment>
    <div>
      <b-modal
        :id="MODAL_ID"
        centered
        title="Buscador de Códigos de Producto"
        ok-title="Ok"
        cancel-title="Cerrar"
        cancel-variant="outline-primary"
        no-close-on-backdrop
        size="lg"
      >
        <field-set-component
          legend="Buscador de Códigos"
        >
          <header-search-detail-component
            :columns-filter="columnsFilterUniqueCode"
            :column-filter-selected-default="'a.nombreProducto'"
            @on-change-field="onChangeField"
            @on-search-for-value="onSearchForValue"
          >
            <template #before>
              <b-col
                cols="12"
              >
                <!-- Validación -->
                <validation-provider
                  #default="{ errors }"
                  name="Segmento"
                  rules="requiredComboVueSelect:m"
                >
                  <b-form-group
                    label-for="segment-code-sunat"
                    label="Segmento *"
                    :state="errors.length > 0 ? false:null"
                  >
                    <!-- Combo Segmento -->
                    <v-select
                      id="segment-code-sunat"
                      v-model="stateCodesSunat.segmentSunat"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :reduce="segmentSunat => segmentSunat._id"
                      label="nombre"
                      :options="combosCodesSunat.segmentSunat.data"
                      :loading="combosCodesSunat.segmentSunat.loading"
                      :disabled="combosCodesSunat.segmentSunat.disabled"
                      :clearable="false"
                      @option:selected="selectedSegmentSunat"
                    >
                      <template v-slot:no-options>
                        No se encontraron resultados.
                      </template>
                    </v-select>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col
                cols="12"
              >
                <!-- Validacion -->
                <validation-provider
                  #default="{ errors }"
                  name="Familia"
                  rules="requiredComboVueSelect"
                >
                  <b-form-group
                    label-for="family-code-sunat"
                    label="Familia *"
                    :state="errors.length > 0 ? false:null"
                  >
                    <!-- Combo Familia -->
                    <v-select
                      id="family-code-sunat"
                      v-model="stateCodesSunat.familySunat"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :reduce="familySunat => familySunat._id"
                      label="nombre"
                      :options="combosCodesSunat.familySunat.data"
                      :loading="combosCodesSunat.familySunat.loading"
                      :disabled="combosCodesSunat.familySunat.disabled"
                      :clearable="false"
                      @option:selected="selectedFamilySunat"
                    >
                      <template v-slot:no-options>
                        No se encontraron resultados.
                      </template>
                    </v-select>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>
              <b-col
                cols="12"
              >
                <!-- Validacion -->
                <validation-provider
                  #default="{ errors }"
                  name="Clase"
                  rules="requiredComboVueSelect"
                >
                  <b-form-group
                    label-for="class-code-sunat"
                    label="Clase *"
                    :state="errors.length > 0 ? false:null"
                  >
                    <!-- Combo Clase -->
                    <v-select
                      id="class-code-sunat"
                      v-model="stateCodesSunat.classSunat"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :reduce="classSunat => classSunat._id"
                      label="nombre"
                      :options="combosCodesSunat.classSunat.data"
                      :loading="combosCodesSunat.classSunat.loading"
                      :disabled="combosCodesSunat.classSunat.disabled"
                      :clearable="false"
                      @option:selected="selectedClassSunat"
                    >
                      <template v-slot:no-options>
                        No se encontraron resultados.
                      </template>
                    </v-select>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </template>
          </header-search-detail-component>
          <table-good-component
            :title-notification="titleNotificationUniqueCode"
            :columns="columnsUniqueCode"
            :server-query="serverQueryUniqueCode"
            :data-table="dataTableUniqueCode"
            :load-items="loadItemsUniqueCode"
            @on-row-click="rowSelected"
          />
        </field-set-component>
      </b-modal>
    </div>

    <!-- Código Único -->
    <b-col
      :cols="cols"
      :sm="colsm"
      :md="colmd"
      :lg="collg"
    >
      <validation-provider
        #default="{ errors }"
        name="Nombre Código Unico"
        :rules="rulesValidation"
      >
        <b-form-group
          label="Nombre Código Unico"
          label-for="input-unique-code-button"
        >
          <b-input-group>
            <b-form-input
              id="input-unique-code-button"
              v-model="nameUniqueCode"
              :state="errors.length > 0 ? false:null"
              readonly
            />
            <b-input-group-append>
              <button-component
                class="py-25"
                icon-button="SearchIcon"
                margin-class="m-0"
                :method-function="openModal"
                :loading="dataTableUniqueCode.loading"
                :disabled="disabledButton"
              />
            </b-input-group-append>
          </b-input-group>
          <small class="text-danger">{{ errors[0] }}</small>
        </b-form-group>
      </validation-provider>
    </b-col>
  </fragment>
</template>

<script>
import {
  BModal, BCol, BFormGroup, BFormInput, BInputGroup, BInputGroupAppend,
} from 'bootstrap-vue'
import { Fragment } from 'vue-fragment'
import { ValidationProvider } from 'vee-validate'
import VSelect from 'vue-select'
import { onMounted } from '@vue/composition-api'
import { endPointsCombo, loadCombos, resetCombos } from '@/helpers/combos'
import ButtonComponent from '../ButtonComponent/ButtonComponent.vue'
import FieldSetComponent from '../FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '../TableComponent/TableGoodComponent.vue'
import HeaderSearchDetailComponent from '../HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import {
  MODAL_ID, stateCodesSunat, combosCodesSunat, columnsUniqueCode, dataTableUniqueCode, serverQueryUniqueCode, columnsFilterUniqueCode, titleNotificationUniqueCode, clearDataTableUniqueCode, clearStateCodesSunat,
} from './useVariablesUniqueCode'
import { loadItemsUniqueCode } from './useServicesUniqueCode'

export default {
  name: 'InputSearchUniqueCodeComponent',
  components: {
    BModal,
    BCol,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    ValidationProvider,
    VSelect,
    Fragment,
    ButtonComponent,
    FieldSetComponent,
    TableGoodComponent,
    HeaderSearchDetailComponent,
  },
  model: {
    prop: 'value',
    event: 'update:value',
  },
  props: {
    // Propiedades permitidas para la distribución de columna en un componente b-row
    cols: {
      type: String,
      default: '12',
    },
    colsm: {
      type: String,
      default: '12',
    },
    colmd: {
      type: String,
      default: '12',
    },
    collg: {
      type: String,
      default: '12',
    },
    rulesValidation: {
      type: String,
      required: false,
      default: '',
    },
    nameUniqueCode: {
      type: String,
      required: true,
      default: '',
    },
    disabledButton: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props, context) {
    let timer = null
    const timeForLoad = 500

    const openModal = async () => {
      clearStateCodesSunat()
      resetCombos(combosCodesSunat, ['familySunat', 'classSunat'])
      serverQueryUniqueCode.value.filtro = ''
      clearDataTableUniqueCode()
      context.root.$bvModal.show(MODAL_ID)
    }
    const rowSelected = async row => {
      context.emit('on-unique-code-selected', row)
      context.root.$bvModal.hide(MODAL_ID)
    }

    const onChangeField = (field, value) => {
      if (stateCodesSunat.value.segmentSunat && stateCodesSunat.value.familySunat && stateCodesSunat.value.classSunat) {
        serverQueryUniqueCode.value.campofiltro = field
        serverQueryUniqueCode.value.filtro = value
      }
    }

    const onSearchForValue = (field, value) => {
      if (stateCodesSunat.value.segmentSunat && stateCodesSunat.value.familySunat && stateCodesSunat.value.classSunat) {
        dataTableUniqueCode.value.loading = true
        clearTimeout(timer)
        timer = setTimeout(() => {
          serverQueryUniqueCode.value.campofiltro = field
          serverQueryUniqueCode.value.filtro = value
          loadItemsUniqueCode(1)
        }, timeForLoad)
      }
    }

    const selectedSegmentSunat = ({ _id }) => {
      stateCodesSunat.value.familySunat = 0
      stateCodesSunat.value.classSunat = 0
      resetCombos(combosCodesSunat, ['familySunat', 'classSunat'])
      clearDataTableUniqueCode()
      loadCombos(combosCodesSunat, ['familySunat'], `${endPointsCombo.familiaSunat}/1/${_id}`, 'Familia Sunat')
    }

    const selectedFamilySunat = ({ _id }) => {
      stateCodesSunat.value.classSunat = 0
      resetCombos(combosCodesSunat, ['classSunat'])
      clearDataTableUniqueCode()
      loadCombos(combosCodesSunat, ['classSunat'], `${endPointsCombo.claseSunat}/1/${_id}`, 'Clase Sunat')
    }

    const selectedClassSunat = () => {
      clearDataTableUniqueCode()
      serverQueryUniqueCode.value.opcional = `c.idsegmento=${stateCodesSunat.value.segmentSunat} and b.idfamilia=${stateCodesSunat.value.familySunat} and a.idclase=${stateCodesSunat.value.classSunat}`
      loadItemsUniqueCode(1)
    }

    onMounted(() => {
      loadCombos(combosCodesSunat, ['segmentSunat'], `${endPointsCombo.segmentoSunat}/1`, 'Segmento Sunat')
    })

    return {
      MODAL_ID,
      stateCodesSunat,
      combosCodesSunat,
      columnsUniqueCode,
      columnsFilterUniqueCode,
      dataTableUniqueCode,
      serverQueryUniqueCode,
      loadItemsUniqueCode,
      titleNotificationUniqueCode,
      openModal,
      rowSelected,
      onChangeField,
      onSearchForValue,
      selectedSegmentSunat,
      selectedFamilySunat,
      selectedClassSunat,
    }
  },
}
</script>

<style lang="scss">
#modal-search-unique-code {
  .modal-dialog {
    @media screen and (min-width: 576px) {
      max-width: 700px;
      width: 90%;
    }
  }
  .modal-lg {
    @media screen and (min-width: 992px) {
      max-width: 1000px;
      width: 90%;
    }
  }
}
</style>
