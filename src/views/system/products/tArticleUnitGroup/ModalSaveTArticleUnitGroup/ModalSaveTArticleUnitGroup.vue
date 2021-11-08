<template>
  <b-modal
    :id="MODAL_ID"
    centered
    :title="`${stateTArticleUnitGroup._id ? 'Modificar' : 'Registrar'} ${titleNotificationTArticleUnitGroup}`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-tarticle-unit-group"
    >
      <b-form @submit.prevent="">
        <field-set-component legend="Datos Generales">
          <b-row>
            <!-- Tabla Articulo -->
            <b-col
              cols="12"
              sm="6"
              lg="6"
            >
              <validation-provider
                #default="{ errors }"
                name="Artículo"
                rules="required"
              >
                <b-form-group
                  label="Artículo *"
                  label-for="tarticle-unit-group-article"
                >
                  <b-input-group>
                    <b-form-input
                      id="tarticle-unit-group-article"
                      v-model="stateTArticleUnitGroup.nombreTablaArticulo"
                      :state="errors.length > 0 ? false:null"
                      readonly
                    />
                    <b-input-group-append>
                      <button-component
                        class="py-25"
                        icon-button="SearchIcon"
                        margin-class="m-0"
                        :method-function="openModalQueryTableArticle"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Consultar Tabla Articulos -->
            <modal-query-table-article
              @on-article-selected="onArticleSelected"
            />

            <!-- Grupo Unidad -->
            <b-col
              cols="12"
              sm="6"
              lg="6"
            >
              <validation-provider
                #default="{ errors }"
                name="Grupo Unidad"
                rules="requiredComboVueSelect:m"
              >
                <b-form-group
                  label="Grupo Unidad *"
                  label-for="tarticle-unit-group-unit-group"
                  :state="errors.length > 0 ? false:null"
                >
                  <vue-select
                    id="tarticle-unit-group-unit-group"
                    v-model="stateTArticleUnitGroup.idGrupoUnidad"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :reduce="unitGroup => unitGroup._id"
                    label="nombre"
                    :options="combosTArticleUnitGroup.unitGroup.data"
                    :loading="combosTArticleUnitGroup.unitGroup.loading"
                    :clearable="false"
                    :disabled="combosTArticleUnitGroup.unitGroup.disabled"
                    @option:selected="unitGroupSelected"
                  >
                    <template v-slot:no-options>
                      No se encontraron resultados.
                    </template>
                  </vue-select>
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Detalle Unidad -->
            <b-col
              cols="12"
              sm="6"
              lg="6"
            >
              <validation-provider
                #default="{ errors }"
                name="Detalle Unidad"
                rules="requiredComboVueSelect:m"
              >
                <b-form-group
                  label="Detalle Unidad *"
                  label-for="tarticle-unit-group-detail-unit"
                  :state="errors.length > 0 ? false:null"
                >
                  <vue-select
                    id="tarticle-unit-group-detail-unit"
                    v-model="stateTArticleUnitGroup.idDetalleGrupoUnidad"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :reduce="unitMeasure => unitMeasure._id"
                    label="nombre"
                    :options="combosTArticleUnitGroup.unitMeasure.data"
                    :loading="combosTArticleUnitGroup.unitMeasure.loading"
                    :clearable="false"
                    :disabled="combosTArticleUnitGroup.unitMeasure.disabled"
                  >
                    <template v-slot:no-options>
                      No se encontraron resultados.
                    </template>
                  </vue-select>
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Presentacion -->
            <b-col
              cols="12"
              sm="6"
              lg="6"
            >
              <validation-provider
                #default="{ errors }"
                name="Presentación"
                rules="requiredComboVueSelect"
              >
                <b-form-group
                  label="Presentación *"
                  label-for="tarticle-unit-group-presentation"
                  :state="errors.length > 0 ? false:null"
                >
                  <vue-select
                    id="tarticle-unit-group-presentation"
                    v-model="stateTArticleUnitGroup.idPresentacion"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :reduce="presentation => presentation._id"
                    label="nombre"
                    :options="combosTArticleUnitGroup.presentation.data"
                    :loading="combosTArticleUnitGroup.presentation.loading"
                    :clearable="false"
                    :disabled="combosTArticleUnitGroup.presentation.disabled"
                  >
                    <template v-slot:no-options>
                      No se encontraron resultados.
                    </template>
                  </vue-select>
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Empaque -->
            <b-col
              cols="12"
              sm="6"
              lg="6"
            >
              <validation-provider
                #default="{ errors }"
                name="Empaque"
                rules="requiredComboVueSelect"
              >
                <b-form-group
                  label="Empaque *"
                  label-for="tarticle-unit-group-packing"
                  :state="errors.length > 0 ? false:null"
                >
                  <vue-select
                    id="tarticle-unit-group-packing"
                    v-model="stateTArticleUnitGroup.idEmpaque"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :reduce="packing => packing._id"
                    label="nombre"
                    :options="combosTArticleUnitGroup.packing.data"
                    :loading="combosTArticleUnitGroup.packing.loading"
                    :clearable="false"
                    :disabled="combosTArticleUnitGroup.packing.disabled"
                  >
                    <template v-slot:no-options>
                      No se encontraron resultados.
                    </template>
                  </vue-select>
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>
            <!-- Cantidad -->
            <b-col
              cols="12"
              sm="6"
              lg="6"
            >
              <b-form-group
                label="Cantidad *"
                label-for="tarticle-unit-group-quantity"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Cantidad"
                  rules="required|min_value:1"
                >
                  <b-form-input
                    id="tarticle-unit-group-quantity"
                    v-model.number="stateTArticleUnitGroup.cantidad"
                    type="number"
                    :state="errors.length > 0 ? false:null"
                    @keydown.enter="()=>sendForm()"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
        </field-set-component>
      </b-form>
    </validation-observer>

    <template #modal-footer>
      <button-component
        variant="outline-primary"
        icon-button="PowerIcon"
        text-default="Cerrar"
        :method-function="()=>$bvModal.hide(MODAL_ID)"
      />
      <button-component
        v-if="(
          (!stateTArticleUnitGroup._id && optionsPermissions.includes(GUARDAR))
          || (stateTArticleUnitGroup._id && optionsPermissions.includes(EDITAR))
        )"
        variant="primary"
        icon-button="SaveIcon"
        :loading="stateTArticleUnitGroup.loading"
        text-default="Guardar"
        :method-function="()=>sendForm()"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal, BForm, BRow, BCol, BFormGroup, BFormInput, BInputGroup, BInputGroupAppend,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { VueSelect } from 'vue-select'
import { computed } from '@vue/composition-api'
import store from '@/store'
import {
  EDITAR,
  GUARDAR,
} from '@/options'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { validatePermission } from '@/helpers/validateActions'
import { endPointsCombo, loadCombos, resetCombos } from '@/helpers/combos'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ModalQueryTableArticle from '@/components/ModalQueryTableArticle/ModalQueryTableArticle.vue'
import {
  MODAL_ID, titleNotificationTArticleUnitGroup, stateTArticleUnitGroup, clearSaveStateTArticleUnitGroup, routeNameTArticleUnitGroup, combosTArticleUnitGroup,
} from '../ServicesTArticleUnitGroup/useVariablesTArticleUnitGroup'
import { loadItemsTArticleUnitGroup, sendTArticleUnitGroup } from '../ServicesTArticleUnitGroup/useServicesTArticleUnitGroup'

export default {
  name: 'ModalSaveTArticleUnitGroup',
  components: {
    BModal,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    VueSelect,
    ButtonComponent,
    FieldSetComponent,
    ModalQueryTableArticle,
    ValidationObserver,
    ValidationProvider,
  },
  setup(props, context) {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNameTArticleUnitGroup]) {
        return store.state.rolesAndPermissions.options[routeNameTArticleUnitGroup]
      }
      return []
    })

    const sendForm = async (actionSend = null, loading = true) => {
      if (!validatePermission(optionsPermissions.value, !stateTArticleUnitGroup.value._id ? GUARDAR : EDITAR, titleNotificationTArticleUnitGroup)) return false
      const successValidationTArticleUnitGroup = await context.refs['validation-tarticle-unit-group'].validate()
      if (!successValidationTArticleUnitGroup) return false
      if (loading) stateTArticleUnitGroup.value.loading = true
      const { status, data } = await sendTArticleUnitGroup(actionSend || (stateTArticleUnitGroup.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateTArticleUnitGroup.value.loading = false
      if (!status) return false
      stateTArticleUnitGroup.value._id = data.id

      clearSaveStateTArticleUnitGroup()
      resetCombos(combosTArticleUnitGroup, ['unitMeasure'])
      context.refs['validation-tarticle-unit-group'].reset()
      await loadItemsTArticleUnitGroup()
      return true
    }

    const openModalQueryTableArticle = () => {
      context.root.$bvModal.show('modal-query-table-article')
    }

    const unitGroupSelected = ({ _id }) => {
      stateTArticleUnitGroup.value.idDetalleGrupoUnidad = 0
      loadCombos(combosTArticleUnitGroup, ['unitMeasure'], `${endPointsCombo.grupoUnidad}/${_id}`, 'Unidad de Medida')
    }

    const onArticleSelected = row => {
      stateTArticleUnitGroup.value.idTablaArticulo = row._id || 0
      stateTArticleUnitGroup.value.idArticulo = row.idArticulo || 0
      stateTArticleUnitGroup.value.nombreTablaArticulo = row.nombre || ''
      stateTArticleUnitGroup.value.nombreArticulo = row.nombreArticulo || ''
    }

    return {
      MODAL_ID,
      titleNotificationTArticleUnitGroup,
      stateTArticleUnitGroup,
      combosTArticleUnitGroup,
      openModalQueryTableArticle,
      onArticleSelected,
      unitGroupSelected,
      sendForm,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>

<style lang="scss">
#modal-t-article-unit-group {
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
