<template>
  <b-modal
    :id="`${MODAL_ID}-show`"
    centered
    :title="`Ver ${titleNotificationTArticleUnitGroup}`"
    no-close-on-backdrop
  >

    <b-form>
      <field-set-component legend="Datos Generales">
        <b-row>
          <!-- Nombre Tabla Articulo -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Artículo"
              label-for="tarticle-unit-group-article"
            >
              <b-form-input
                id="tarticle-unit-group-article"
                v-model.trim="stateTArticleUnitGroup.nombreTablaArticulo"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- Grupo -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Grupo Unidad"
              label-for="tarticle-unit-group-unit-group"
            >
              <b-form-input
                id="tarticle-unit-group-unit-group"
                v-model.trim="stateTArticleUnitGroup.nombreGrupoUnidad"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- Grupo Unidad -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Detalle Unidad"
              label-for="tarticle-unit-group-unit-detail"
            >
              <b-form-input
                id="tarticle-unit-group-unit-detail"
                v-model.trim="stateTArticleUnitGroup.nombreDetalleUnidad"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- Presentacion -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Presentacion"
              label-for="tarticle-unit-group-presentation"
            >
              <b-form-input
                id="tarticle-unit-group-presentation"
                v-model.trim="stateTArticleUnitGroup.nombrePresentacion"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- Empaque -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Empaque"
              label-for="tarticle-unit-group-packing"
            >
              <b-form-input
                id="tarticle-unit-group-packing"
                v-model.trim="stateTArticleUnitGroup.nombreEmpaque"
                type="text"
                readonly
              />
            </b-form-group>
          </b-col>
          <!-- Cantidad -->
          <b-col
            cols="12"
          >
            <b-form-group
              label="Cantidad"
              label-for="tarticle-unit-group-quantity"
            >
              <b-form-input
                id="tarticle-unit-group-quantity"
                v-model.number="stateTArticleUnitGroup.cantidad"
                type="number"
                readonly
              />
            </b-form-group>
          </b-col>
        </b-row>
      </field-set-component>
    </b-form>

    <template #modal-footer>
      <button-component
        variant="primary"
        icon-button="PowerIcon"
        text-default="Cerrar"
        :method-function="()=>$bvModal.hide(`${MODAL_ID}-show`)"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal, BForm, BRow, BCol, BFormGroup, BFormInput,
} from 'bootstrap-vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { MODAL_ID, titleNotificationTArticleUnitGroup, stateTArticleUnitGroup } from '../ServicesTArticleUnitGroup/useVariablesTArticleUnitGroup'

export default {
  name: 'ModalShowTArticleUnitGroup',
  components: {
    BModal,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    FieldSetComponent,
    ButtonComponent,
  },
  setup() {
    return {
      MODAL_ID,
      titleNotificationTArticleUnitGroup,
      stateTArticleUnitGroup,
    }
  },
}
</script>
