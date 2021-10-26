<template>
  <field-set-component legend="Listado">
    <header-search-detail-component
      v-if="stateArticle._id"
      id="header-search-children-feature"
      :columns-filter="columnsFilterArticleChildrenFeatureDetail"
      :column-filter-selected-default="'a.nombrecaracteristica'"
      @on-change-field="onChangeField"
      @on-search-for-value="onSearchForValue"
    />
    <table-good-component
      :title-notification="titleNotificationArticleChildrenFeatureDetail"
      :columns="columnsArticleChildrenFeatureDetail"
      :server-query="serverQueryArticleChildrenFeatureDetail"
      :data-table="dataTableArticleChildrenFeatureDetail"
      :load-items="loadItemsArticleChildrenFeatureDetail"
      :manage-row="sendArticleChildrenFeatureDetail"
      :pagination-enabled="!!stateArticle._id"
      :option-show="false"
      :option-edit="false"
      :option-delete="false"
      :option-status="false"
      :slot-options="true"
      @open-modal-for-edit="row=>openModalFor(row, 'edit')"
    >
      <template
        #options="{ props }"
      >
        <template
          v-if="props.row.tipo === 'H'"
        >
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

            <!-- INICIAR CAMBIAR ESTADO -->
            <template v-if="optionsPermissions.includes(CAMBIAR_ESTADO)">
              <b-dropdown-item
                @click.stop="changeStatus(props.row.idt)"
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
            <!-- FINAL CAMBIAR ESTADO -->

            <!-- INICIO EDITAR -->
            <template v-if="optionsPermissions.includes(EDITAR)">
              <b-dropdown-item
                @click.stop="openModalFor(props.row)"
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
            <!-- FINAL EDITAR -->

            <!-- INICIO ELIMINAR -->
            <template v-if="optionsPermissions.includes(ELIMINAR)">
              <b-dropdown-item
                @click.stop="deleteRow(props.row.idt)"
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
            <!-- FINAL ELIMINAR -->
          </b-dropdown>
        </template>
        <template
          v-else-if="props.row.tipo === 'P'"
        >
          <feather-icon
            icon="LockIcon"
          />
        </template>
      </template>
    </table-good-component>
  </field-set-component>
</template>

<script>
import {
  BDropdown,
  BDropdownItem,
} from 'bootstrap-vue'
import HeaderSearchDetailComponent from '@/components/HeaderSearchDetailComponent/HeaderSearchDetailComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import TableGoodComponent from '@/components/TableComponent/TableGoodComponent.vue'
import { confirmSwal } from '@/helpers/messageExtensions'
import { ACTION_DELETE, ACTION_STATUS } from '@/helpers/actionsApi'
import { endPointsCombo, loadCombos } from '@/helpers/combos'
import {
  CAMBIAR_ESTADO,
  EDITAR,
  ELIMINAR,
} from '@/options'
import { stateArticle } from '../ServicesArticle/useVariablesArticle'
import {
  columnsArticleChildrenFeatureDetail, serverQueryArticleChildrenFeatureDetail, dataTableArticleChildrenFeatureDetail, columnsFilterArticleChildrenFeatureDetail, titleNotificationArticleChildrenFeatureDetail, stateArticleChildrenFeatureDetail, combosArticleChildrenFeatureDetail,
} from '../ServicesArticleChildrenFeatureDetail/useVariablesArticleChildrenFeatureDetail'
import { loadItemsArticleChildrenFeatureDetail, sendArticleChildrenFeatureDetail } from '../ServicesArticleChildrenFeatureDetail/useServicesArticleChildrenFeatureDetail'

export default {
  name: 'DetailTableChildrenFeature',
  components: {
    BDropdown,
    BDropdownItem,
    FieldSetComponent,
    TableGoodComponent,
    HeaderSearchDetailComponent,
  },
  computed: {
    optionsPermissions() {
      if (this.$store.state.rolesAndPermissions.options[this.$route.name]) {
        return this.$store.state.rolesAndPermissions.options[this.$route.name]
      }
      return []
    },
  },
  setup() {
    let timer = null
    const timeForLoad = 500

    const changeStatus = async _id => {
      const confirm = await confirmSwal(titleNotificationArticleChildrenFeatureDetail, ACTION_STATUS)
      if (confirm) {
        dataTableArticleChildrenFeatureDetail.value.loading = true
        const { status } = await sendArticleChildrenFeatureDetail(ACTION_STATUS, _id)
        dataTableArticleChildrenFeatureDetail.value.loading = false
        if (status) loadItemsArticleChildrenFeatureDetail(1)
      }
    }

    const openModalFor = async ({
      idt, idTArticulo, idCaracteristica, idDtlCaracteristica, orden,
    }) => {
      dataTableArticleChildrenFeatureDetail.value.loading = true
      await loadCombos(combosArticleChildrenFeatureDetail, ['featureDetail'], `${endPointsCombo.detalleCaracteristica}/1/${idCaracteristica}/0`, 'Valores Característica')
      stateArticleChildrenFeatureDetail.value._id = idt
      stateArticleChildrenFeatureDetail.value.idTArticulo = idTArticulo
      stateArticleChildrenFeatureDetail.value.idCaracteristica = idCaracteristica
      stateArticleChildrenFeatureDetail.value.idDtlCaracteristica = idDtlCaracteristica
      stateArticleChildrenFeatureDetail.value.orden = orden
      dataTableArticleChildrenFeatureDetail.value.loading = false
      return true
    }

    const deleteRow = async _id => {
      const confirm = await confirmSwal(titleNotificationArticleChildrenFeatureDetail, ACTION_DELETE)
      if (confirm) {
        dataTableArticleChildrenFeatureDetail.value.loading = true
        const { status } = await sendArticleChildrenFeatureDetail(ACTION_DELETE, _id)
        dataTableArticleChildrenFeatureDetail.value.loading = false
        if (status) loadItemsArticleChildrenFeatureDetail(1)
      }
    }

    const onChangeField = (field, value) => {
      serverQueryArticleChildrenFeatureDetail.value.campofiltro = field
      serverQueryArticleChildrenFeatureDetail.value.filtro = value
      loadItemsArticleChildrenFeatureDetail(1)
    }

    const onSearchForValue = (field, value) => {
      dataTableArticleChildrenFeatureDetail.value.loading = true
      clearTimeout(timer)
      timer = setTimeout(() => {
        serverQueryArticleChildrenFeatureDetail.value.campofiltro = field
        serverQueryArticleChildrenFeatureDetail.value.filtro = value
        loadItemsArticleChildrenFeatureDetail(1)
      }, timeForLoad)
    }

    return {
      stateArticle,
      columnsArticleChildrenFeatureDetail,
      serverQueryArticleChildrenFeatureDetail,
      dataTableArticleChildrenFeatureDetail,
      loadItemsArticleChildrenFeatureDetail,
      sendArticleChildrenFeatureDetail,
      columnsFilterArticleChildrenFeatureDetail,
      titleNotificationArticleChildrenFeatureDetail,
      changeStatus,
      openModalFor,
      deleteRow,
      onChangeField,
      onSearchForValue,

      CAMBIAR_ESTADO,
      EDITAR,
      ELIMINAR,
    }
  },
}
</script>
