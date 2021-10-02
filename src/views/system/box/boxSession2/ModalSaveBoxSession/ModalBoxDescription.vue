<template>
  <b-modal
    :id="`${MODAL_ID}-description`"
    centered
    :title="!stateBoxSession.apertura ? 'Aperturar Caja' : 'Cerrar Caja'"
    no-close-on-backdrop
  >
    <field-set-component
      legend="Datos de Apertura"
      collapse="show"
      class="mt-1"
    >
      <b-row>
        <template
          v-if="stateBoxSession.apertura"
        >
          <b-col
            cols="12"
          >
            <b-form-group
              label="Aperturo"
              label-for="box-session-name-open"
            >
              <b-form-input
                id="box-session-name-open"
                v-model="stateBoxSession.nombreApertura"
                readonly
              />
            </b-form-group>
          </b-col>
          <b-col
            cols="12"
          >
            <b-form-group
              label="Fecha Apertura"
              label-for="box-session-date-open"
            >
              <b-form-input
                id="box-session-date-open"
                v-model="fechaApertura"
                style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                readonly
              />
            </b-form-group>
          </b-col>
          <b-col
            cols="12"
          >
            <b-form-group
              label="Descripción de Apertura"
              label-for="box-session-descripcion-apertura"
            >
              <b-form-textarea
                id="box-session-descripcion-apertura"
                key="1"
                v-model="stateBoxSession.descripcionApertura"
                rows="4"
                no-resize
                readonly
              />
            </b-form-group>
          </b-col>
        </template>
        <template
          v-else
        >
          <b-col
            cols="12"
          >
            <b-form-group
              label="Descripción de Apertura"
              label-for="box-session-descripcion-apertura"
            >
              <b-form-textarea
                id="box-session-descripcion-apertura"
                key="2"
                v-model="stateBoxSession.descripcion"
                rows="4"
                no-resize
              />
            </b-form-group>
          </b-col>
        </template>
      </b-row>
    </field-set-component>

    <field-set-component
      v-if="stateBoxSession.apertura"
      legend="Datos de Cierre"
      collapse="show"
      class="mt-1"
    >
      <b-row>
        <b-col
          cols="12"
        >
          <b-form-group
            label="Descripción de Cierre"
            label-for="box-session-descripcion-apertura"
          >
            <b-form-textarea
              id="box-session-descripcion-apertura"
              v-model="stateBoxSession.descripcion"
              rows="4"
              no-resize
            />
          </b-form-group>
        </b-col>
      </b-row>
    </field-set-component>

    <template #modal-footer>
      <button-component
        variant="outline-primary"
        icon-button="PowerIcon"
        text-default="Salir"
        :method-function="()=>$bvModal.hide(`${MODAL_ID}-description`)"
      />
      <button-component
        v-if="!stateBoxSession.idApertura && optionsPermissions.includes(APERTURAR_CAJA)"
        variant="success"
        icon-button="LogInIcon"
        :loading="stateBoxSession.loading"
        text-default="Aperturar"
        :method-function="()=>sendBox()"
      />
      <button-component
        v-if="stateBoxSession.idApertura && optionsPermissions.includes(CERRAR_CAJA)"
        variant="danger"
        icon-button="LogOutIcon"
        :loading="stateBoxSession.loading"
        text-default="Cerrar"
        :method-function="()=>sendBox()"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormTextarea,
} from 'bootstrap-vue'
import {
  computed,
} from '@vue/composition-api'
import store from '@/store'
import {
  APERTURAR_CAJA,
  CERRAR_CAJA,
} from '@/options'
import {
  ACTION_CLOSE_BOX,
  ACTION_OPEN_BOX,
} from '@/helpers/actionsApi'
import { validatePermission } from '@/helpers/validateActions'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import {
  formatDate,
} from '@/helpers/date'
import {
  MODAL_ID,
  titleNotificationBoxSession,
  stateBoxSession,
  clearStateBoxSession,
  routeNameBoxSession,
} from '../ServicesBoxSession/useVariablesBoxSession'
import {
  loadItemsBoxSession,
  sendBoxSession,
} from '../ServicesBoxSession/useServicesBoxSession'
import {
  serverQueryBoxSessionDetail,
  titleNotificationBoxSessionDetail,
} from '../ServicesBoxSessionDetail/useVariablesBoxSessionDetail'

export default {
  name: 'ModalBoxDescription',
  components: {
    BModal,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    ButtonComponent,
    FieldSetComponent,
  },
  setup(props, context) {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNameBoxSession]) {
        return store.state.rolesAndPermissions.options[routeNameBoxSession]
      }
      return []
    })

    const sendBox = async (actionSend = null, loading = true) => {
      if (!validatePermission(optionsPermissions.value, !stateBoxSession.value.idApertura ? CERRAR_CAJA : APERTURAR_CAJA, titleNotificationBoxSessionDetail)) return false

      if (loading) stateBoxSession.value.loading = true
      const { status, data } = await sendBoxSession(actionSend || (stateBoxSession.value.idApertura ? ACTION_CLOSE_BOX : ACTION_OPEN_BOX))
      if (loading) stateBoxSession.value.loading = false
      if (!status || !data) return false
      if (store.state.boxSession.boxSession.idCajero === stateBoxSession.value.idCajero) {
        store.commit('boxSession/logout')
      }
      stateBoxSession.value._id = data.id
      serverQueryBoxSessionDetail.value.indice = data.id
      await loadItemsBoxSession()
      clearStateBoxSession()
      context.root.$bvModal.hide(`${MODAL_ID}-description`)
      context.root.$bvModal.hide(`${MODAL_ID}-open`)
      return true
    }

    const fechaApertura = computed(() => formatDate(stateBoxSession.value.fechaApertura))

    return {
      MODAL_ID,
      titleNotificationBoxSession,
      stateBoxSession,
      sendBox,
      fechaApertura,

      optionsPermissions,
      APERTURAR_CAJA,
      CERRAR_CAJA,
    }
  },
}
</script>
