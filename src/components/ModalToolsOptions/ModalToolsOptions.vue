<template>
  <b-modal
    :id="`${modalId}`"
    centered
    :title="`Seleccionar ${title}`"
    no-close-on-backdrop
    size="sm"
  >
    <!-- Seleccionar Opción -->

    <field-set-component
      class="mt-75"
      legend="Selecciona la Opción"
    >
      <b-row>
        <b-col>
          <b-form-group
            label-for="modal-tools-options"
          >
            <vue-select
              id="modal-tools-options"
              :value="stateSelected"
              :reduce="option => option._id"
              label="nombre"
              :options="stateData.data"
              @input="selectedValue"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </field-set-component>

    <template #modal-footer>
      <button-component
        text-default="Listo"
        icon-button="CheckIcon"
        :method-function="()=>$bvModal.hide(modalId)"
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
} from 'bootstrap-vue'
import { VueSelect } from 'vue-select'
import {
  onMounted,
} from '@vue/composition-api'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'

export default {
  name: 'ModalToolsOptions',
  components: {
    BModal,
    BRow,
    BCol,
    BFormGroup,
    VueSelect,
    FieldSetComponent,
    ButtonComponent,
  },
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
    modalId: {
      type: String,
      required: true,
      default: '',
    },
    stateData: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    stateSelected: {
      type: Number,
      required: true,
      default: 0,
    },
    getAllOptions: {
      type: Function,
      required: true,
      default: () => {},
    },
    clearStateData: {
      type: Function,
      required: true,
      default: () => {},
    },
    clearStateSelected: {
      type: Function,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      perfectScrollbarSettings: {
        wheelPropagation: false,
      },
    }
  },
  setup(props, context) {
    onMounted(async () => {
      props.clearStateData()
      props.clearStateSelected()
      await props.getAllOptions()
    })

    const selectedValue = value => {
      if (value) {
        context.emit('update:stateSelected', value)
      } else {
        context.emit('update:stateSelected', 0)
      }
    }

    return {
      selectedValue,
    }
  },
}
</script>
