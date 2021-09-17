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
        <b-col
          cols="12"
        >
          <div class="mt-50 mb-2 mx-auto">
            <b-form-group>
              <b-input-group class="input-group-merge">
                <b-input-group-prepend is-text>
                  <feather-icon icon="SearchIcon" />
                </b-input-group-prepend>
                <b-form-input
                  id="icons-search"
                  placeholder="Buscar opción ..."
                  @input="$emit('update:stateQuery', $event)"
                />
              </b-input-group>
            </b-form-group>
          </div>
        </b-col>
        <b-col
          cols="12"
        >
          <vue-perfect-scrollbar
            :settings="perfectScrollbarSettings"
            class="scrollable-container media-list scroll-area-options mb-2"
          >
            <div class="list-group list-group-flush checkbox-grid-options mb-1">
              <template v-for="(option) in filteredData">
                <b-form-radio
                  :key="option._id"
                  class="mt-50"
                  :value="option._id"
                  name="option-selected"
                  @input="$emit('update:stateSelected', $event)"
                >
                  {{ option.nombre }}
                </b-form-radio>
              </template>
            </div>
          </vue-perfect-scrollbar>
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
  BInputGroup,
  BInputGroupPrepend,
  BFormInput,
  BFormRadio,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import {
  onMounted,
  computed,
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
    BInputGroup,
    BInputGroupPrepend,
    BFormInput,
    BFormRadio,
    VuePerfectScrollbar,
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
    stateQuery: {
      type: String,
      required: true,
      default: '',
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
    clearStateQuery: {
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
  setup(props) {
    onMounted(async () => {
      props.clearStateData()
      props.clearStateSelected()
      props.clearStateQuery()
      await props.getAllOptions()
    })

    const filteredData = computed(() => (
      props.stateData.data.filter(el => el.nombre.trim().toLowerCase().includes(props.stateQuery.trim().toLowerCase()))
    ))

    const nameSelected = computed(() => {
      if (props.stateSelected) return props.stateData.data.find(el => el._id === props.stateSelected).nombre
      return ''
    })

    return {
      nameSelected,
      filteredData,
    }
  },
}
</script>

<style lang="scss">
.checkbox-grid-options {
  display: grid;
  // grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  grid-template-columns: 1fr;
  grid-gap: 1em;
}
.list-group-item {
  transition: all 1s
}
.scroll-area-options {
  position: relative;
  margin: auto;
  max-height: 300px;
}
</style>
