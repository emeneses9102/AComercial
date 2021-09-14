<template>
  <field-set-component
    legend="Factor"
    collapse="show"
  >
    <validation-observer
      ref="validation-tribute-factor"
    >
      <b-form
        @submit.prevent="sendForm"
        @reset="clearStateTributeFactor"
      >
        <b-row>
          <!-- Factor -->
          <b-col
            cols="12"
            md="6"
            lg="4"
          >
            <b-form-group
              label="Factor *"
              label-for="tribute-factor-number"
            >
              <validation-provider
                #default="{ errors }"
                name="Factor"
                rules="required"
              >
                <b-form-input
                  id="tribute-factor-number"
                  v-model.trim="stateTributeFactor.factor"
                  type="number"
                  step="0.01"
                  :state="errors.length > 0 ? false:null"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!-- Inicio -->
          <b-col
            cols="12"
            md="6"
            lg="4"
          >
            <b-form-group
              label="Inicio"
              label-for="tribute-factor-start"
            >
              <b-form-datepicker
                id="tribute-factor-start"
                v-model="stateTributeFactor.finicial"
                v-bind="labelsFormDate"
              />
            </b-form-group>
          </b-col>
          <!-- Fin -->
          <b-col
            cols="12"
            md="6"
            lg="4"
          >
            <b-form-group
              label="Fin"
              label-for="tribute-factor-end"
            >
              <b-form-datepicker
                id="tribute-factor-end"
                v-model="stateTributeFactor.ffinal"
                v-bind="labelsFormDate"
              />
            </b-form-group>
          </b-col>
          <b-col
            cols="12"
          >
            <div class="d-flex flex-wrap justify-content-end">
              <button-component
                type="reset"
                variant="outline-primary"
                text-default="Limpiar"
                icon-button="DeleteIcon"
              />
              <button-component
                v-if="stateTributeFactor._id"
                type="submit"
                variant="success"
                text-default="Modificar"
                icon-button="RefreshCwIcon"
                :loading="stateTributeFactor.loading"
              />
              <button-component
                v-else
                type="submit"
                variant="primary"
                text-default="Agregar"
                icon-button="PlusCircleIcon"
                :loading="stateTributeFactor.loading"
              />
            </div>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </field-set-component>
</template>

<script>
import {
  BForm, BRow, BCol, BFormGroup, BFormInput, BFormDatepicker,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { stateTribute } from '../ServicesTribute/useVariablesTribute'
import { stateTributeFactor, clearStateTributeFactor } from '../ServicesTributeFactor/useVariablesTributeFactor'
import { loadItemsTributeFactor, sendTributeFactor } from '../ServicesTributeFactor/useServicesTributeFactor'

export default {
  name: 'Detail',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormDatepicker,
    ValidationObserver,
    ValidationProvider,
    FieldSetComponent,
    ButtonComponent,
  },
  props: {
    sendHeader: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      labelsFormDate: {
        labelPrevDecade: 'Década anterior',
        labelPrevYear: 'Año anterior',
        labelPrevMonth: 'El mes pasado',
        labelCurrentMonth: 'Mes actual',
        labelNextMonth: 'Próximo mes',
        labelNextYear: 'El próximo año',
        labelNextDecade: 'La próxima década',
        labelToday: 'Hoy',
        labelSelected: 'Fecha seleccionada',
        labelNoDateSelected: '',
        labelCalendar: 'Calendario',
        labelNav: 'Navegación de calendario',
        labelHelp: 'Navegar por el calendario con las teclas de flechas',
      },
    }
  },
  setup(props, context) {
    const sendForm = async () => {
      if (!stateTribute.value._id) {
        stateTributeFactor.value.loading = true
        const successValidationFeature = await props.sendHeader(ACTION_REGISTER, false)
        if (!successValidationFeature) {
          stateTributeFactor.value.loading = false
          return
        }
      }

      const successValidationTributeFactor = await context.refs['validation-tribute-factor'].validate()
      if (!successValidationTributeFactor) {
        stateTributeFactor.value.loading = false
        return
      }
      const { status: statusTributeFactor } = await sendTributeFactor(stateTributeFactor.value._id ? ACTION_UPDATE : ACTION_REGISTER)
      if (!statusTributeFactor) return

      clearStateTributeFactor()
      context.refs['validation-tribute-factor'].reset()
      document.getElementById('tribute-factor-number').focus()
      loadItemsTributeFactor(1)
    }

    return {
      stateTributeFactor,
      sendForm,
      clearStateTributeFactor,
    }
  },
}
</script>
