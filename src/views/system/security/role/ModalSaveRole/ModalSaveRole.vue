<template>
  <b-modal
    :id="MODAL_ID"
    centered
    :title="`${stateRole._id ? 'Modificar' : 'Registrar'} ${titleNotificationRole}`"
    no-close-on-backdrop
  >
    <validation-observer
      ref="validation-role"
    >
      <b-form @submit.prevent="">
        <field-set-component legend="Datos Generales">
          <b-row>
            <!-- Nombre -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Nombre *"
                label-for="role-name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nombre"
                  rules="required|min:3"
                >
                  <b-form-input
                    id="role-name"
                    v-model.trim="stateRole.nombre"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                    @keydown.enter="()=>sendForm()"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Predio -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="{ errors }"
                name="Predio"
                rules="requiredComboVueSelect:m"
              >
                <b-form-group
                  label="Predio *"
                  label-for="role-predio"
                  :state="errors.length > 0 ? false:null"
                >
                  <vue-select
                    id="role-predio"
                    v-model="stateRole.idPredio"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :reduce="predio => predio._id"
                    label="nombre"
                    :options="combosRole.predio.data"
                    :loading="combosRole.predio.loading"
                    :clearable="false"
                    :disabled="combosRole.predio.disabled"
                  >
                    <template v-slot:no-options>
                      No se encontraron resultados.
                    </template>
                  </vue-select>
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
            </b-col>

            <!-- Almacén -->
            <b-col
              cols="12"
            >
              <validation-provider
                #default="{ errors }"
                name="Almacén"
                rules="requiredComboVueSelect:m"
              >
                <b-form-group
                  label="Almacén *"
                  label-for="role-storage"
                  :state="errors.length > 0 ? false:null"
                >
                  <vue-select
                    id="role-storage"
                    v-model="stateRole.idAlmacen"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :reduce="storage => storage._id"
                    label="nombre"
                    :options="combosRole.storage.data"
                    :loading="combosRole.storage.loading"
                    :clearable="false"
                    :disabled="combosRole.storage.disabled"
                  >
                    <template v-slot:no-options>
                      No se encontraron resultados.
                    </template>
                  </vue-select>
                  <small class="text-danger">{{ errors[0] }}</small>
                </b-form-group>
              </validation-provider>
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
          (!stateRole._id && optionsPermissions.includes(GUARDAR))
          || (stateRole._id && optionsPermissions.includes(EDITAR))
        )"
        variant="primary"
        icon-button="SaveIcon"
        :loading="stateRole.loading"
        text-default="Guardar"
        :method-function="()=>sendForm()"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal, BForm, BRow, BCol, BFormGroup, BFormInput,
} from 'bootstrap-vue'
import { VueSelect } from 'vue-select'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { computed } from '@vue/composition-api'
import store from '@/store'
import { validatePermission } from '@/helpers/validateActions'
import {
  GUARDAR,
  EDITAR,
} from '@/options'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import {
  MODAL_ID, titleNotificationRole, stateRole, clearStateRole, combosRole, routeNameRole,
} from '../ServicesRole/useVariablesRole'
import { loadItemsRole, sendRole } from '../ServicesRole/useServicesRole'

export default {
  name: 'ModalSaveRole',
  components: {
    BModal,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    VueSelect,
    ButtonComponent,
    FieldSetComponent,
    ValidationObserver,
    ValidationProvider,
  },
  setup(props, context) {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNameRole]) {
        return store.state.rolesAndPermissions.options[routeNameRole]
      }
      return []
    })

    const sendForm = async (actionSend = null, loading = true) => {
      if (!validatePermission(optionsPermissions.value, !stateRole.value._id ? GUARDAR : EDITAR, titleNotificationRole)) return false
      const successValidationRole = await context.refs['validation-role'].validate()
      if (!successValidationRole) return false
      if (loading) stateRole.value.loading = true
      const { status, data } = await sendRole(actionSend || (stateRole.value._id ? ACTION_UPDATE : ACTION_REGISTER))
      if (loading) stateRole.value.loading = false
      if (!status) return false
      stateRole.value._id = data.id
      clearStateRole()
      document.getElementById('role-name').focus()
      context.refs['validation-role'].reset()
      await loadItemsRole()
      return true
    }

    return {
      MODAL_ID,
      titleNotificationRole,
      stateRole,
      sendForm,
      combosRole,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
