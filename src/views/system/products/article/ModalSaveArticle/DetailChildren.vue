<template>
  <field-set-component legend="Detalle">
    <validation-observer
      ref="validation-article-children"
    >
      <b-form
        @submit.prevent="sendForm"
        @reset.prevent="clearViewArticleChildrenDetail"
      >
        <b-row>
          <!-- Imagen Articulo -->
          <b-col
            cols="12"
            sm="5"
            md="4"
            lg="3"
            class="pb-2"
          >
            <b-form-group
              label="Imagen"
              label-for="imagen"
            >
              <upload-photo-component
                id="imagenArticleChildren"
                :image.sync="stateArticleChildrenDetail.imagen"
              />
            </b-form-group>
          </b-col>

          <b-col
            cols="12"
            sm="7"
            md="8"
            lg="9"
          >
            <b-row>
              <!-- Nombre del Articulo Hijo -->
              <b-col
                cols="12"
              >
                <b-form-group
                  label="Nombre *"
                  label-for="article-children-name"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Nombre"
                    rules="required"
                  >
                    <b-form-input
                      id="article-children-name"
                      v-model.trim="stateArticleChildrenDetail.nombre"
                      type="text"
                      :state="errors.length > 0 ? false:null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <!-- Codigo Interno -->
              <b-col
                cols="6"
                md="4"
                lg="4"
              >
                <b-form-group
                  label="Cod Interno"
                  label-for="article-children-internal-code"
                >
                  <b-form-input
                    id="article-children-internal-code"
                    v-model.trim="stateArticleChildrenDetail.codInterno"
                    type="text"
                  />
                </b-form-group>
              </b-col>

              <!-- Codigo Barra -->
              <b-col
                cols="6"
                md="4"
                lg="4"
              >
                <b-form-group
                  label="Cod Barra"
                  label-for="article-children-bar-code"
                >
                  <b-input-group>
                    <b-form-input
                      id="article-children-bar-code"
                      v-model.trim="stateArticleChildrenDetail.codBarra"
                      type="text"
                    />
                    <b-input-group-append>
                      <button-component
                        class="py-25"
                        icon-button="HashIcon"
                        margin-class="m-0"
                        :disabled="!stateArticle._id || !!stateArticle.codBarra"
                        :method-function="()=>generateBarCodeArticle(stateArticle._id)"
                      />
                    </b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-col>

              <!-- Codigo Fabricante -->
              <b-col
                cols="6"
                md="4"
                lg="4"
              >
                <b-form-group
                  label="Cod Fabricante"
                  label-for="article-children-maker-code"
                >
                  <b-form-input
                    id="article-children-maker-code"
                    v-model.trim="stateArticleChildrenDetail.codFabricante"
                    type="text"
                  />
                </b-form-group>
              </b-col>

              <!-- Descripción del Artículo -->
              <b-col
                cols="12"
              >
                <b-form-group
                  label="Descripción"
                  label-for="article-children-description"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Descripcion"
                    rules=""
                  >
                    <b-form-textarea
                      id="article-children-description"
                      v-model="stateArticleChildrenDetail.descripcion"
                      rows="5"
                      no-resize
                      :state="errors.length > 0 ? false:null"
                      maxlength="500"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>

        <b-row
          class="mt-25"
        >
          <!-- Precio Compra -->
          <b-col
            cols="6"
            sm="6"
            lg="2"
          >
            <b-form-group
              label="Precio Compra"
              label-for="article-children-purchase-price"
            >
              <validation-provider
                #default="{ errors }"
                name="precio compra"
                rules="required"
              >
                <b-form-input
                  id="article-children-purchase-price"
                  v-model.number="stateArticleChildrenDetail.precioCompra"
                  type="number"
                  :state="errors.length > 0 ? false:null"
                  min="0"
                  step="0.01"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Precio Venta -->
          <b-col
            cols="6"
            sm="6"
            lg="2"
          >
            <b-form-group
              label="Precio Venta *"
              label-for="article-children-sale-price"
            >
              <validation-provider
                #default="{ errors }"
                name="Precio Venta"
                rules="required"
              >
                <b-form-input
                  id="article-children-sale-price"
                  v-model.number="stateArticleChildrenDetail.precioVenta"
                  type="number"
                  :state="errors.length > 0 ? false:null"
                  min="0"
                  step="0.01"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Precio Minimo de Venta -->
          <b-col
            cols="6"
            sm="6"
            lg="2"
          >
            <b-form-group
              label="Precio Min. Venta *"
              label-for="article-children-minimum-sale-price"
            >
              <validation-provider
                #default="{ errors }"
                name="Precio Min. Venta"
                rules="required"
              >
                <b-form-input
                  id="article-children-minimum-sale-price"
                  v-model.number="stateArticleChildrenDetail.precioMinimoVenta"
                  type="number"
                  :state="errors.length > 0 ? false:null"
                  min="0"
                  step="0.01"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Stock Mínimo -->
          <b-col
            cols="6"
            sm="6"
            lg="2"
          >
            <b-form-group
              label="Stock Min. *"
              label-for="article-children-minium-stock"
            >
              <validation-provider
                #default="{ errors }"
                name="stock Min."
                rules="required"
              >
                <b-form-input
                  id="article-children-minium-stock"
                  v-model.number="stateArticleChildrenDetail.stockMinimo"
                  type="number"
                  :state="errors.length > 0 ? false:null"
                  min="0"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Stock Máximo -->
          <b-col
            cols="6"
            sm="6"
            lg="2"
          >
            <b-form-group
              label="Stock Max. *"
              label-for="article-children-maximum-stock"
            >
              <validation-provider
                #default="{ errors }"
                name="Stock Max."
                rules="required"
              >
                <b-form-input
                  id="article-children-maximum-stock"
                  v-model.number="stateArticleChildrenDetail.stockMaximo"
                  type="number"
                  :state="errors.length > 0 ? false:null"
                  min="0"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col
            cols="12"
          >
            <div class="d-flex flex-wrap justify-content-end mt-1">
              <button-component
                type="reset"
                variant="outline-primary"
                text-default="Limpiar"
                icon-button="DeleteIcon"
              />
              <button-component
                v-if="stateArticleChildrenDetail._id && optionsPermissions.includes(EDITAR)"
                type="submit"
                variant="success"
                text-default="Modificar"
                icon-button="RefreshCwIcon"
                :loading="stateArticleChildrenDetail.loading"
              />
              <button-component
                v-else-if="!stateArticleChildrenDetail._id && optionsPermissions.includes(GUARDAR)"
                type="submit"
                variant="primary"
                text-default="Agregar"
                icon-button="PlusCircleIcon"
                :loading="stateArticleChildrenDetail.loading"
                :disabled="stateArticle._id ? false : true"
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
  BForm,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BFormTextarea,
} from 'bootstrap-vue'
import { computed } from '@vue/composition-api'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import store from '@/store'
import {
  EDITAR,
  GUARDAR,
} from '@/options'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import UploadPhotoComponent from '@/components/UploadPhotoComponent/UploadPhotoComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { ACTION_REGISTER, ACTION_UPDATE } from '@/helpers/actionsApi'
import { validatePermission } from '@/helpers/validateActions'
import { routeNameArticle, stateArticle } from '../ServicesArticle/useVariablesArticle'
import {
  stateArticleChildrenDetail, clearStateArticleChildrenDetail, titleNotificationArticleChildrenDetail, equalizeStateArticleChildrenDetail,
} from '../ServicesArticleChildrenDetail/useVariablesArticleChildrenDetail'
import { loadItemsArticleChildrenDetail, sendArticleChildrenDetail } from '../ServicesArticleChildrenDetail/useServicesArticleChildrenDetail'

export default {
  name: 'DetailBusiness',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BFormTextarea,
    ValidationObserver,
    ValidationProvider,
    FieldSetComponent,
    UploadPhotoComponent,
    ButtonComponent,
  },
  props: {
    sendHeader: {
      type: Function,
      required: true,
    },
  },
  setup(props, context) {
    const optionsPermissions = computed(() => {
      if (store.state.rolesAndPermissions.options[routeNameArticle]) {
        return store.state.rolesAndPermissions.options[routeNameArticle]
      }
      return []
    })

    const sendForm = async () => {
      if (!validatePermission(optionsPermissions.value, !stateArticleChildrenDetail.value._id ? GUARDAR : EDITAR, titleNotificationArticleChildrenDetail)) return

      if (!stateArticle.value._id) {
        stateArticleChildrenDetail.value.loading = true
        const successValidationArticle = await props.sendHeader(ACTION_REGISTER, false)
        if (!successValidationArticle) {
          stateArticleChildrenDetail.value.loading = false
          return
        }
      }

      const successValidationArticleChildrenDetail = await context.refs['validation-article-children'].validate()
      if (!successValidationArticleChildrenDetail) {
        stateArticleChildrenDetail.value.loading = false
        return
      }
      const { status: statusArticleChildrenDetail } = await sendArticleChildrenDetail(stateArticleChildrenDetail.value._id ? ACTION_UPDATE : ACTION_REGISTER)
      if (!statusArticleChildrenDetail) return

      clearStateArticleChildrenDetail()
      context.refs['validation-article-children'].reset()
      equalizeStateArticleChildrenDetail()
      loadItemsArticleChildrenDetail(1)
    }

    const clearViewArticleChildrenDetail = () => {
      clearStateArticleChildrenDetail()
      equalizeStateArticleChildrenDetail()
    }

    return {
      stateArticle,
      stateArticleChildrenDetail,
      sendForm,
      clearViewArticleChildrenDetail,

      optionsPermissions,
      EDITAR,
      GUARDAR,
    }
  },
}
</script>
