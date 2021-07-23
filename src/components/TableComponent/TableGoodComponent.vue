<template>
  <!-- Componente TableGoodComponent -->
  <vue-good-table
    mode="remote"
    :columns="columns"
    :rows="dataTable.rows"
    :total-rows="dataTable.totalRows"
    :is-loading.sync="handleLoading"
    class="vgt-table condensed"
    :pagination-options="{
      enabled: paginationEnabled,
    }"
    :sort-options="{
      enabled: false,
    }"
    @on-page-change="onPageChange"
    @on-per-page-change="onPerPageChange"
    @on-row-click="onRowClick"
  >
    <!-- Ranura para mostrar elemento -->
    <div
      slot="emptystate"
      class="text-center p-2"
    >
      <small v-if="!handleLoading">
        No se encontraron resultados
      </small>
    </div>

    <!-- Ranura para mostrar un efecto loading -->
    <div
      slot="loadingContent"
    >
      <b-img
        width="32"
        :src="require('@/assets/images/loaders/circles.svg')"
        class="m-0 p-0 table-component__loading"
      />
    </div>

    <!-- Ranura por fila -->
    <template
      slot="table-row"
      slot-scope="props"
    >

      <!-- Columna Acción -->
      <span v-if="props.column.field === 'action'">
        <span>
          <b-dropdown
            variant="link"
            toggle-class="text-decoration-none"
            no-caret
            size="sm"
          >
            <template v-slot:button-content>
              <feather-icon
                icon="MoreHorizontalIcon"
                size="16"
                class="text-body align-middle mr-25"
              />
            </template>
            <template v-if="permission.includes('STATUS')">
              <b-dropdown-item
                v-if="optionStatus"
                @click="changeStatus(props.row._id)"
              >
                <div class="d-flex align-items-center">
                  <feather-icon
                    :icon="props.row.activo ? 'SlashIcon' : 'CheckCircleIcon'"
                    class="mr-50"
                  />
                  <span class="d-inline-block">
                    {{ props.row.activo ? 'Desactivar' : 'Activar' }}
                  </span>
                </div>
              </b-dropdown-item>
            </template>
            <template v-if="permission.includes('SHOW')">
              <b-dropdown-item
                v-if="optionShow"
                @click="openModalFor(props.row, 'show')"
              >
                <div class="d-flex align-items-center">
                  <feather-icon
                    icon="EyeIcon"
                    class="mr-50"
                  />
                  <span class="d-inline-block">Ver</span>
                </div>
              </b-dropdown-item>
            </template>
            <template v-if="permission.includes('EDIT')">
              <b-dropdown-item
                v-if="optionEdit"
                @click="openModalFor(props.row, 'edit')"
              >
                <div class="d-flex align-items-center">
                  <feather-icon
                    icon="Edit2Icon"
                    class="mr-50"
                  />
                  <span class="d-inline-block">Editar</span>
                </div>
              </b-dropdown-item>
            </template>
            <template v-if="permission.includes('CHANGE_PASSWORD')">
              <b-dropdown-item
                v-if="optionChangePassword"
                @click="openModalFor(props.row, 'change-password')"
              >
                <div class="d-flex align-items-center">
                  <feather-icon
                    icon="LockIcon"
                    class="mr-50"
                  />
                  <span class="d-inline-block">Cambiar Clave</span>
                </div>
              </b-dropdown-item>
            </template>
            <template v-if="permission.includes('DELETE')">
              <b-dropdown-item
                v-if="optionDelete"
                @click="deleteRow(props.row._id)"
              >
                <div class="d-flex align-items-center">
                  <feather-icon
                    icon="TrashIcon"
                    class="mr-50"
                  />
                  <span class="d-inline-block">Eliminar</span>
                </div>
              </b-dropdown-item>
            </template>
          </b-dropdown>
        </span>
      </span>

      <!-- Column type boolean -->
      <span v-else-if="props.column.type === 'boolean'">
        <b-badge :variant="props.row[props.column.field] ? 'light-success' : 'light-danger'">
          <feather-icon :icon="props.row[props.column.field] ? 'CheckIcon' : 'SlashIcon'" />
        </b-badge>
      </span>

      <!-- Columna Estado -->
      <span v-else-if="props.column.field === 'activo'">
        <b-badge :variant="props.row.activo ? 'light-success' : 'light-danger'">
          {{ props.row.activo ? 'ACTIVO' : 'DESACTIVO' }}
        </b-badge>
      </span>

      <!-- Columna Común -->
      <span v-else>
        {{ props.formattedRow[props.column.field] }}
      </span>
    </template>

    <!-- Paginación -->
    <template
      slot="pagination-bottom"
      slot-scope="props"
    >
      <div class="d-flex justify-content-between align-items-center flex-wrap mt-1">

        <!-- Por Cuanto deseas listar -->
        <div class="d-flex align-items-center mb-0">
          <span class="text-nowrap ">
            Listar
          </span>
          <b-form-select
            v-model="serverQuery.pfin"
            :options="pages"
            class="mx-1"
            @change="(value)=>props.perPageChanged({currentPerPage:value})"
          />
          <span class="text-nowrap"> de {{ props.total }} filas </span>
        </div>

        <!-- Componente de paginación -->
        <b-pagination
          v-model="serverQuery.pinicio"
          :total-rows="props.total"
          :per-page="serverQuery.pfin"
          first-number
          last-number
          align="right"
          prev-class="prev-item"
          next-class="next-item"
          class="mb-0"
          size="md"
          @change="(value)=>props.pageChanged({currentPage:value})"
        >
          <!-- props.perPageChanged({currentPerPage: serverQuery.pfin}) -->
          <template #prev-text>
            <feather-icon
              icon="ChevronLeftIcon"
              size="18"
            />
          </template>
          <template #next-text>
            <feather-icon
              icon="ChevronRightIcon"
              size="18"
            />
          </template>
        </b-pagination>
      </div>
    </template>
  </vue-good-table>
</template>

<script>
import {
  BPagination, BFormSelect, BBadge, BDropdown, BDropdownItem, BImg,
} from 'bootstrap-vue'
import { ACTION_STATUS, ACTION_DELETE } from '@/helpers/actionsApi'
import { VueGoodTable } from 'vue-good-table'
import { confirmSwal } from '@/helpers/messageExtensions'

export default {
  name: 'TableGoodComponent',
  components: {
    VueGoodTable,
    BPagination,
    BFormSelect,
    BBadge,
    BDropdown,
    BDropdownItem,
    BImg,
  },
  props: {
    titleNotification: {
      type: String,
      required: false,
      default: '',
    },
    serverQuery: {
      type: Object,
      required: true,
      default: () => ({
        _id: 0,
        tabla: '',
        pinicio: 1,
        pfin: 10,
        idusuario: 0,
        idNegocio: 0,
        campofiltro: '',
        filtro: '',
        campo: '',
        indice: 0,
      }),
    },
    columns: {
      type: Array,
      required: true,
      default: () => [],
    },
    dataTable: {
      type: Object,
      required: true,
      default: () => ({
        loading: false,
        rows: [],
        totalRows: 0,
      }),
    },
    loadItems: {
      type: Function,
      required: true,
      default: () => {},
    },
    manageRow: {
      type: Function,
      required: false,
      default: () => {},
    },
    paginationEnabled: {
      type: Boolean,
      required: false,
      default: () => true,
    },
    optionStatus: {
      type: Boolean,
      required: false,
      default: true,
    },
    optionShow: {
      type: Boolean,
      required: false,
      default: true,
    },
    optionEdit: {
      type: Boolean,
      required: false,
      default: true,
    },
    optionChangePassword: {
      type: Boolean,
      required: false,
      default: false,
    },
    optionDelete: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      dir: false,
      pages: [3, 5, 10, 15],
      loadingLocal: false,
      permission: [],
    }
  },
  computed: {
    handleLoading: {
      get() {
        return (this.dataTable.loading || this.loadingLocal)
      },
      set(newValue) {
        return newValue
      },
    },
  },
  created() {
    // Cargar los permisos permitidos
    this.permission = ['STATUS', 'SHOW', 'EDIT', 'DELETE', 'CHANGE_PASSWORD']
  },
  methods: {
    onPageChange(params) {
      this.loadItems(params.currentPage, this.serverQuery.pfin)
    },
    onPerPageChange(params) {
      this.loadItems(1, params.currentPerPage)
    },
    async changeStatus(_id) {
      const confirm = await confirmSwal(this.titleNotification, ACTION_STATUS)
      if (confirm) {
        this.loadingLocal = true
        const { status } = await this.manageRow(ACTION_STATUS, _id)
        this.loadingLocal = false
        if (status) this.loadItems()
      }
    },
    async deleteRow(_id) {
      const confirm = await confirmSwal(this.titleNotification, ACTION_DELETE)
      if (confirm) {
        this.loadingLocal = true
        const { status } = await this.manageRow(ACTION_DELETE, _id)
        this.loadingLocal = false
        if (status) this.loadItems()
      }
    },
    openModalFor(row, openFor) {
      const newRow = { ...row }
      /* eslint no-param-reassign: "error" */
      delete newRow.originalIndex
      delete newRow.vgt_id
      delete newRow.id
      delete newRow.activo
      delete newRow.accion
      delete newRow.numberRow
      delete newRow.idUsuario
      if (openFor === 'show') this.$emit('open-modal-for-show', newRow)
      else if (openFor === 'edit') this.$emit('open-modal-for-edit', newRow)
      else if (openFor === 'change-password') this.$emit('open-modal-for-change-password', newRow)
    },
    search() {
      this.loadItems(1)
    },
    onRowClick({ row }) {
      const newRow = { ...row }
      /* eslint no-param-reassign: "error" */
      delete newRow.originalIndex
      delete newRow.vgt_id
      delete newRow.id
      delete newRow.activo
      delete newRow.accion
      delete newRow.numberRow
      delete newRow.idUsuario
      this.$emit('on-row-click', newRow)
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-good-table.scss';
th span,
td span {
  font-size: 12px !important;
}
.vgt-loading .vgt-center-align {
  margin-top: 0;
  top: 40%;
  transform: translateY(-50%);
}
</style>
