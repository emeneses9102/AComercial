<template>
  <b-modal
    id="modal-description-sale"
    centered
    title="Ingresar observación"
    no-close-on-backdrop
    size="sm"
  >
    <!-- Ingresar Observación -->

    <field-set-component
      class="mt-75"
      legend="Ingresar una Observación"
    >
      <b-row>
        <b-col
          cols="12"
        >
          <b-form-group
            label="Observación"
            label-for="state-point-sale-descripcion"
          >
            <b-form-textarea
              id="state-point-sale-descripcion"
              rows="3"
              no-resize
            />
          </b-form-group>
        </b-col>
      </b-row>
    </field-set-component>

    <template #modal-footer>
      <button-component
        text-default="Listo"
        icon-button="CheckIcon"
        :method-function="()=>$bvModal.hide('modal-description-sale')"
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
  BFormTextarea,
} from 'bootstrap-vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'

export default {
  name: 'ModalOptionsPaymentMethod',
  components: {
    BModal,
    BRow,
    BCol,
    BFormGroup,
    BFormTextarea,
    FieldSetComponent,
    ButtonComponent,
  },
}
</script>
