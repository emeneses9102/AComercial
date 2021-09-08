<template>
  <b-modal
    id="modal-options-filter-article"
    centered
    title="Filtros para Artículo"
    no-close-on-backdrop
  >

    <!-- Campos de filtro -->

    <field-set-component
      class="mt-75"
      legend="Selecciona un campo de filtro"
    >
      <b-row>
        <b-col
          cols="12"
        >
          <div class="list-group list-group-flush checkbox-grid mb-1">
            <template v-for="(option) in optionsFiledFilterArticle">
              <b-form-radio
                :key="option.field"
                v-model="stateFieldFilterArticle"
                class="mt-50"
                :value="option.field"
                name="option-selected"
              >
                {{ option.label }}
              </b-form-radio>
            </template>
          </div>
        </b-col>
      </b-row>
    </field-set-component>

    <template #modal-footer>
      <button-component
        text-default="Listo"
        icon-button="CheckIcon"
        :method-function="()=>$bvModal.hide('modal-options-filter-article')"
      />
    </template>
  </b-modal>
</template>

<script>
import {
  BModal,
  BRow,
  BCol,
  BFormRadio,
} from 'bootstrap-vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import {
  stateFieldFilterArticle,
  optionsFiledFilterArticle,
} from '../../ServicesPointSale/useVariablesPointSale'

export default {
  name: 'ModalOptionsFilterArticle',
  components: {
    BModal,
    BRow,
    BCol,
    BFormRadio,
    FieldSetComponent,
    ButtonComponent,
  },
  setup() {
    return {
      stateFieldFilterArticle,
      optionsFiledFilterArticle,
    }
  },
}
</script>

<style lang="scss">
.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  grid-gap: 1em;
}
.list-group-item {
  transition: all 1s
}
</style>
