<template>
  <fragment>
    <div>
      <b-modal
        :id="MODAL_ID_ICONS"
        centered
        title="Iconos"
        ok-title="Ok"
        cancel-title="Cerrar"
        no-close-on-backdrop
        size="lg"
      >
        <field-set-component
          legend="Buscador de Iconos"
        >
          <section id="feather-icons">
            <div class="icon-search-wrapper mt-50 mb-2 mx-auto">
              <b-form-group>
                <b-input-group class="input-group-merge">
                  <b-input-group-prepend is-text>
                    <feather-icon icon="SearchIcon" />
                  </b-input-group-prepend>
                  <b-form-input
                    id="icons-search"
                    v-model="seachQuery"
                    placeholder="Buscar icono ..."
                  />
                </b-input-group>
              </b-form-group>
            </div>
            <vue-perfect-scrollbar
              :settings="perfectScrollbarSettings"
              class="scrollable-container media-list scroll-area mb-2"
            >
              <div
                id="icons-container"
                class="d-flex justify-content-center flex-wrap"
              >
                <b-card
                  v-for="icon in filterIcons"
                  :key="icon"
                  class="icon-card cursor-pointer text-center mb-2 mx-50"
                  @click="selectedIcon(icon)"
                >
                  <div class="icon-wrapper">
                    <feather-icon
                      :icon="icon"
                      size="24"
                    />
                  </div>
                  <b-card-text class="icon-name text-truncate mb-0 mt-1">
                    {{ icon }}
                  </b-card-text>
                </b-card>
              </div>
            </vue-perfect-scrollbar>
          </section>
        </field-set-component>
      </b-modal>
    </div>

    <!-- Icono -->
    <b-col
      :cols="cols"
      :sm="colsm"
      :md="colmd"
      :lg="collg"
    >
      <validation-provider
        #default="{ errors }"
        name="Icono"
        :rules="rulesValidation"
      >
        <b-form-group
          label="Icono"
          label-for="input-icon-button"
        >
          <b-input-group>
            <b-form-input
              id="input-icon-button"
              v-model="icono"
              :state="errors.length > 0 ? false:null"
              readonly
            />
            <b-input-group-append>
              <button-component
                class="py-25"
                icon-button="SearchIcon"
                margin-class="m-0"
                :method-function="()=>$bvModal.show(MODAL_ID_ICONS)"
              />
            </b-input-group-append>
          </b-input-group>
          <small class="text-danger">{{ errors[0] }}</small>
        </b-form-group>
      </validation-provider>
    </b-col>
  </fragment>
</template>

<script>
import {
  BModal, BCol, BFormGroup, BInputGroup, BFormInput, BInputGroupAppend, BInputGroupPrepend, BCard, BCardText,
} from 'bootstrap-vue'
import { Fragment } from 'vue-fragment'
import { ValidationProvider } from 'vee-validate'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { messageToast } from '@/helpers/messageExtensions'
import icons from '@/helpers/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent.vue'
import FieldSetComponent from '../FieldSetComponent/FieldSetComponent.vue'

export default {
  name: 'ModalSearchIconComponent',
  components: {
    BModal,
    BCol,
    BFormGroup,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroupPrepend,
    ValidationProvider,
    BCard,
    BCardText,
    Fragment,
    VuePerfectScrollbar,
    ButtonComponent,
    FieldSetComponent,
  },
  props: {
    // Propiedades permitidas para la distribución de columna en un componente b-row
    cols: {
      type: String,
      default: '12',
    },
    colsm: {
      type: String,
      default: '12',
    },
    colmd: {
      type: String,
      default: '12',
    },
    collg: {
      type: String,
      default: '12',
    },
    rulesValidation: {
      type: String,
      required: false,
      default: '',
    },
    icono: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {
      MODAL_ID_ICONS: 'modal-search-icon',
      seachQuery: '',
      icons: [...icons],
      perfectScrollbarSettings: {
        maxScrollbarLength: 60,
        wheelPropagation: false,
      },
    }
  },
  computed: {
    filterIcons() {
      const seachQueryIcon = this.seachQuery.toLowerCase()
      return this.icons.filter(item => item.toLowerCase().includes(seachQueryIcon))
    },
  },
  methods: {
    selectedIcon(iconName) {
      messageToast('success', 'Icono', `Se selecciono correctamente el icono ${iconName}`)
      this.$emit('update:icono', iconName)
      this.$bvModal.hide(this.MODAL_ID_ICONS)
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/ui-feather.scss';
.scroll-area {
  position: relative;
  margin: auto;
  height: 400px;
}
</style>
