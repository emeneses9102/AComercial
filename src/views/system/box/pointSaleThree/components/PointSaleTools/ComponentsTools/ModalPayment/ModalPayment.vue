<template>
  <b-modal
    :id="`${modalId}`"
    centered
    title="Ingresar Monto de Pago"
    no-close-on-backdrop
    size="sm"
  >
    <!-- Seleccionar Opción -->

    <field-set-component
      class="mt-75"
      legend="Pago"
    >
      <b-row>
        <b-col>
          <b-form-group
            label="Pago con:"
            label-for="modal-amount-payment"
          >
            <b-form-input
              id="modal-amount-payment"
              v-model.number="statePointSale.totalPagado"
              type="number"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </field-set-component>

    <template #modal-footer>
      <button-component
        :loading="statePointSale.loading"
        :disabled="statePointSale.loading"
        text-default="Finalizar"
        icon-button="CheckIcon"
        :method-function="()=>finishedOperation()"
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
} from 'bootstrap-vue'
import { watch } from '@vue/composition-api'
import store from '@/store'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { messageToast } from '@/helpers/messageExtensions'
import { ACTION_POINT_SALE_PAY } from '@/helpers/actionsApi'
import {
  statePointSale,
} from '../../../../ServicesPointSale/useVariablesPointSale'
import { sendPointSale } from '../../../../ServicesPointSale/useServicesPointSale'

export default {
  name: 'ModalPayment',
  components: {
    BModal,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    FieldSetComponent,
    ButtonComponent,
  },
  data() {
    return {
      modalId: 'modal-pointsale-payment',
    }
  },
  setup(props, context) {
    watch(statePointSale, () => {
      if (statePointSale.value.totalPagado) {
        if (statePointSale.value.totalPagado > statePointSale.value.total) {
          statePointSale.value.vuelto = statePointSale.value.totalPagado - statePointSale.value.total
        }
      } else {
        statePointSale.value.vuelto = 0
      }
    }, {
      deep: true,
    })

    const finishedOperation = async () => {
      if ((statePointSale.value.totalPagado - statePointSale.value.vuelto) < statePointSale.value.total) {
        messageToast('warning', 'Punto de Venta', 'Debe ingresar el monto a pagar')
      } else {
        statePointSale.value.loading = true
        store.commit('pointSale/ACTIVE_LOADING')
        await sendPointSale(ACTION_POINT_SALE_PAY)
        store.commit('pointSale/DESACTIVE_LOADING')
        context.root.$bvModal.hide('modal-pointsale-payment')
        statePointSale.value.cancelado = 1
        statePointSale.value.loading = false
      }
    }

    return {
      statePointSale,
      finishedOperation,
    }
  },
}
</script>
