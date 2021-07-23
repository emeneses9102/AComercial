<template>
  <b-form>
    <field-set-component legend="Datos Generales">
      <b-row>
        <!-- Rol -->
        <b-col
          cols="12"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Rol"
            rules="requiredComboVueSelect:m"
          >
            <b-form-group
              label="Rol *"
              label-for="access-role"
              :state="errors.length > 0 ? false:null"
            >
              <vue-select
                id="access-role"
                v-model="stateAccess.idRol"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :reduce="role => role._id"
                label="nombre"
                :options="combosAccess.role.data"
                :loading="combosAccess.role.loading"
                :clearable="false"
                :disabled="combosAccess.role.disabled"
                @option:selected="roleSelected"
              >
                <template v-slot:no-options>
                  No se encontraron resultados.
                </template>
              </vue-select>
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </b-col>

        <!-- Módulo -->
        <b-col
          cols="12"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Módulo"
            rules="requiredComboVueSelect:m"
          >
            <b-form-group
              label="Módulo *"
              label-for="access-module"
              :state="errors.length > 0 ? false:null"
            >
              <vue-select
                id="access-module"
                v-model="stateAccess.idModulo"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :reduce="module => module._id"
                label="nombre"
                :options="combosAccess.module.data"
                :loading="combosAccess.module.loading"
                :clearable="false"
                :disabled="combosAccess.module.disabled"
                @option:selected="moduleSelected"
              >
                <template v-slot:no-options>
                  No se encontraron resultados.
                </template>
              </vue-select>
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </b-col>

        <!-- Menú -->
        <b-col
          cols="12"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Menú"
            rules="requiredComboVueSelect:m"
          >
            <b-form-group
              label="Menú *"
              label-for="access-menu"
              :state="errors.length > 0 ? false:null"
            >
              <vue-select
                id="access-menu"
                v-model="stateAccess.idMenu"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :reduce="menu => menu._id"
                label="nombre"
                :options="combosAccess.menu.data"
                :loading="combosAccess.menu.loading"
                :clearable="false"
                :disabled="combosAccess.menu.disabled"
                @option:selected="menuSelected"
              >
                <template v-slot:no-options>
                  No se encontraron opciones.
                </template>
              </vue-select>
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </b-col>
      </b-row>
    </field-set-component>
  </b-form>
</template>

<script>
import {
  BForm, BRow, BCol, BFormGroup,
} from 'bootstrap-vue'
import { ValidationProvider } from 'vee-validate'
import { VueSelect } from 'vue-select'
import { toRef, watch } from '@vue/composition-api'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import { endPointsCombo, loadCombos, resetCombos } from '@/helpers/combos'
import { stateAccess, combosAccess } from '../ServicesAccess/useVariablesAccess'
import { clearDataTableAccessOptionDetail, combosAccessOptionDetail, stateAccessOptionDetail } from '../ServicesAccessOptionDetail/useVariablesAccessOptionDetail'
import { verifyExistenceOfAccess } from '../ServicesAccess/useServicesAccess'
import { loadItemsAccessOptionDetail } from '../ServicesAccessOptionDetail/useServicesAccessOptionDetail'

export default {
  name: 'HeaderAccess',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    VueSelect,
    ValidationProvider,
    FieldSetComponent,
  },
  props: {
    resetValidation: {
      type: Function,
      required: false,
      default: () => {},
    },
    resetDetailValidation: {
      type: Function,
      required: false,
      default: () => {},
    },
  },
  setup(props) {
    const idRole = toRef(stateAccess.value, 'idRol')
    const idModule = toRef(stateAccess.value, 'idModulo')
    const idMenu = toRef(stateAccess.value, 'idMenu')

    // Limpiar tabla y id
    const resetTableAndId = () => {
      stateAccess.value._id = 0
      clearDataTableAccessOptionDetail()
    }

    // Función cuando se selecciona un rol
    const roleSelected = () => {
      resetTableAndId()
      if (idRole.value && idMenu.value) {
        loadCombos(combosAccessOptionDetail, ['option'], `${endPointsCombo.opcionesDisponiblesPorIdRolIdMenu}/${idRole.value}/${idMenu.value}`, 'Opciónes disponibles')
        stateAccessOptionDetail.value.idOpcion = 0
      }
    }

    // Función cuando se selecciona un modulo
    const moduleSelected = ({ _id }) => {
      resetTableAndId()
      stateAccess.value.idMenu = 0
      stateAccessOptionDetail.value.idOpcion = 0
      if (props.resetValidation) props.resetValidation()
      if (props.resetDetailValidation) props.resetDetailValidation()
      loadCombos(combosAccess, ['menu'], `${endPointsCombo.menuPorIdModulo}/${_id}`, 'Menú')
      resetCombos(combosAccessOptionDetail, ['option'])
    }

    // Función cuando se selecciona un menú
    const menuSelected = () => {
      resetTableAndId()
      if (stateAccess.value.idRol && stateAccess.value.idMenu) {
        loadCombos(combosAccessOptionDetail, ['option'], `${endPointsCombo.opcionesDisponiblesPorIdRolIdMenu}/${stateAccess.value.idRol}/${stateAccess.value.idMenu}`, 'Opciónes disponibles')
        stateAccessOptionDetail.value.idOpcion = 0
      }
    }

    watch([idRole, idModule, idMenu], async () => {
      if (idRole.value && idModule.value && idMenu.value) {
        console.log('los 3 estan seleccionado')
        stateAccess.value._id = await verifyExistenceOfAccess(idRole.value, idModule.value, idMenu.value)
        if (stateAccess.value._id) {
          loadItemsAccessOptionDetail(1)
        }
      }
    })

    return {
      stateAccess,
      combosAccess,
      roleSelected,
      moduleSelected,
      menuSelected,
    }
  },
}
</script>
