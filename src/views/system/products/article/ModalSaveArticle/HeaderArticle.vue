<template>
  <b-form
    @submit.prevent=""
  >
    <field-set-component legend="Datos Generales">
      <b-row>
        <!-- SKU -->
        <b-col
          cols="12"
          md="4"
          lg="3"
        >
          <b-form-group
            label="SKU *"
            label-for="article-SKU"
          >
            <validation-provider
              #default="{ errors }"
              name="SKU"
              rules=""
            >
              <b-form-input
                id="article-SKU"
                v-model.trim="stateArticle.sku"
                type="text"
                :state="errors.length > 0 ? false:null"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>

        <!-- Nombre del Articulo -->
        <b-col
          cols="12"
          md="8"
          lg="9"
        >
          <b-form-group
            label="Nombre *"
            label-for="article-name"
          >
            <validation-provider
              #default="{ errors }"
              name="Nombre"
              rules="required"
            >
              <b-form-input
                id="article-name"
                v-model.trim="stateArticle.nombre"
                type="text"
                :state="errors.length > 0 ? false:null"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row
        class="mt-25"
      >

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
              :image.sync="stateArticle.imagen"
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
            <!-- Id Código Único -->
            <input-search-unique-code-component
              :name-unique-code="stateArticle.nombreCodigoUnico"
              rules-validation=""
              @on-unique-code-selected="uniqueCodeSelected"
            />

            <!-- Código Único -->
            <!-- <b-col
              cols="12"
              md="6"
            >
              <b-form-group
                label="Código Único"
                label-for="article-unique-code"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Código Único"
                  rules="required"
                >
                  <b-form-input
                    id="article-unique-code"
                    v-model.trim="stateArticle.codUnico"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                    readonly
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col> -->

            <!-- Nombre Código Único -->
            <!-- <b-col
              cols="12"
            >
              <b-form-group
                label="Nombre Código Único"
                label-for="article-name-unique-code"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nombre Código Único"
                  rules="required"
                >
                  <b-form-input
                    id="article-name-unique-code"
                    v-model.trim="stateArticle.nombreCodigoUnico"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                    readonly
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col> -->

            <!-- Codigo Interno -->
            <b-col
              cols="6"
              md="4"
              lg="4"
            >
              <b-form-group
                label="Cod Interno"
                label-for="article-internal-code"
              >
                <!-- <validation-provider
                  #default="{ errors }"
                  name="Cod Interno"
                  rules="required"
                >
                  <b-form-input
                    id="article-internal-code"
                    v-model.trim="stateArticle.codInterno"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider> -->
                <b-form-input
                  id="article-internal-code"
                  v-model.trim="stateArticle.codInterno"
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
                label-for="article-bar-code"
              >
                <b-input-group>
                  <b-form-input
                    id="article-bar-code"
                    v-model.trim="stateArticle.codBarra"
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
                label-for="article-maker-code"
              >
                <!-- <validation-provider
                  #default="{ errors }"
                  name="Cod Fabricante"
                  rules="required"
                >
                  <b-form-input
                    id="article-maker-code"
                    v-model.trim="stateArticle.codFabricante"
                    type="text"
                    :state="errors.length > 0 ? false:null"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider> -->
                <b-form-input
                  id="article-maker-code"
                  v-model.trim="stateArticle.codFabricante"
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
                label-for="article-description"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Descripcion"
                  rules=""
                >
                  <b-form-textarea
                    id="article-description"
                    v-model="stateArticle.descripcion"
                    rows="5"
                    no-resize
                    :state="errors.length > 0 ? false:null"
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
        <!-- Tipo Articulo -->
        <b-col
          cols="6"
          sm="6"
          md="6"
          lg="3"
        >
          <validation-provider
            #default="{ errors }"
            name="Tipo Artículo"
            rules="required"
          >
            <b-form-group
              label="Tipo Articulo *"
              label-for="article-type"
            >
              <div class="d-flex align-items-center flex-wrap">
                <div
                  class="d-flex align-items-center"
                  style="height: 2.714rem;"
                >
                  <b-form-group
                    label-for="stock"
                    class="form-group-checkbox mb-0"
                  >
                    <b-form-radio
                      v-model="selectedArticleType"
                      name="some-radios"
                      value="stock"
                      class="mr-2 mr-sm-1 mr-md-2 some-radio"
                    >
                      Stock
                    </b-form-radio>
                  </b-form-group>

                  <b-form-group
                    label-for="service"
                    class="form-group-checkbox mb-0"
                  >
                    <b-form-radio
                      v-model="selectedArticleType"
                      name="some-radios"
                      value="servicio"
                      class="mr-75 mr-sm-1 mr-md-2 some-radio"
                    >
                      Servicio
                    </b-form-radio>
                  </b-form-group>
                </div>
              </div>
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </b-col>

        <!-- Receta y Serie -->
        <b-col
          cols="6"
          sm="6"
          md="6"
          lg="3"
        >
          <div class="d-flex">
            <!-- Receta -->
            <b-form-group
              label="Receta"
              label-for="article-recipe"
            >
              <div class="d-flex align-items-center flex-wrap">
                <div
                  class="d-flex align-items-center"
                  style="height: 2.714rem;"
                >
                  <b-form-checkbox
                    v-model="stateArticle.flgReceta"
                    :value="1"
                    :unchecked-value="0"
                    switch
                    :disabled="dataTableArticleRecipeDetail.rows.length > 0"
                  />
                </div>
              </div>
            </b-form-group>

            <!-- Serie -->
            <b-form-group
              label="Serie"
              label-for="article-serial"
              class="ml-1"
            >
              <div class="d-flex align-items-center flex-wrap">
                <div
                  class="d-flex align-items-center"
                  style="height: 2.714rem;"
                >
                  <b-form-checkbox
                    v-model="stateArticle.flgSerie"
                    :value="1"
                    :unchecked-value="0"
                    switch
                  />
                </div>
              </div>
            </b-form-group>
          </div>
        </b-col>

        <!-- Tipo Producto -->
        <b-col
          cols="12"
          sm="12"
          md="12"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Tipo Producto"
            rules="requiredComboVueSelect:m"
          >
            <b-form-group
              label="Tipo Producto *"
              label-for="article-product-type"
              :state="errors.length > 0 ? false:null"
            >
              <vue-select
                id="article-product-type"
                v-model="stateArticle.idTipoProducto"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :reduce="productType => productType._id"
                label="nombre"
                :options="combosArticle.productType.data"
                :loading="combosArticle.productType.loading"
                :clearable="false"
                :disabled="combosArticle.productType.disabled"
              >
                <template v-slot:no-options>
                  No se encontraron resultados.
                </template>
              </vue-select>
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </b-col>

        <!-- Tipo Servicio -->
        <b-col
          v-if="selectedArticleType === 'servicio'"
          cols="12"
          sm="12"
          md="12"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Tipo Servicio"
            rules="requiredComboVueSelect:m"
          >
            <b-form-group
              label="Tipo Servicio *"
              label-for="article-service-type"
              :state="errors.length > 0 ? false:null"
            >
              <vue-select
                id="article-service-type"
                v-model="stateArticle.idTipoServicio"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :reduce="serviceType => serviceType._id"
                label="nombre"
                :options="combosArticle.serviceType.data"
                :loading="combosArticle.serviceType.loading"
                :clearable="false"
                :disabled="combosArticle.serviceType.disabled"
              >
                <template v-slot:no-options>
                  No se encontraron resultados.
                </template>
              </vue-select>
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </b-col>

        <!-- Grupo Unidad -->
        <b-col
          cols="12"
          sm="6"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Grupo Unidad"
            rules="requiredComboVueSelect:m"
          >
            <b-form-group
              label="Grupo Unidad *"
              label-for="article-unit-group"
              :state="errors.length > 0 ? false:null"
            >
              <vue-select
                id="article-unit-group"
                v-model="stateArticle.idGrupoUnidad"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :reduce="unitGroup => unitGroup._id"
                label="nombre"
                :options="combosArticle.unitGroup.data"
                :loading="combosArticle.unitGroup.loading"
                :clearable="false"
                :disabled="combosArticle.unitGroup.disabled"
                @option:selected="unitGroupSelected"
              >
                <template v-slot:no-options>
                  No se encontraron resultados.
                </template>
              </vue-select>
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </b-col>

        <!-- Unidad Medida -->
        <b-col
          cols="12"
          sm="6"
          lg="6"
        >
          <validation-provider
            #default="{ errors }"
            name="Unidad Medida"
            rules="requiredComboVueSelect"
          >
            <b-form-group
              label="Unidad Medida *"
              label-for="article-unit-measure"
              :state="errors.length > 0 ? false:null"
            >
              <vue-select
                id="article-unit-measure"
                v-model="stateArticle.idUnidad"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :reduce="unitMeasure => unitMeasure._id"
                label="nombre"
                :options="combosArticle.unitMeasure.data"
                :loading="combosArticle.unitMeasure.loading"
                :clearable="false"
                :disabled="combosArticle.unitMeasure.disabled"
              >
                <template v-slot:no-options>
                  No se encontraron resultados.
                </template>
              </vue-select>
              <small class="text-danger">{{ errors[0] }}</small>
            </b-form-group>
          </validation-provider>
        </b-col>
        <!-- Precio Compra -->
        <b-col
          cols="6"
          sm="6"
          lg="2"
        >
          <b-form-group
            label="Precio Compra"
            label-for="article-purchase-price"
          >
            <validation-provider
              #default="{ errors }"
              name="precio compra"
              rules="required"
            >
              <b-form-input
                id="article-purchase-price"
                v-model.number="stateArticle.precioCompra"
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
            label-for="article-sale-price"
          >
            <validation-provider
              #default="{ errors }"
              name="Precio Venta"
              rules="required"
            >
              <b-form-input
                id="article-sale-price"
                v-model.number="stateArticle.precioVenta"
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
            label-for="article-minimum-sale-price"
          >
            <validation-provider
              #default="{ errors }"
              name="Precio Min. Venta"
              rules="required"
            >
              <b-form-input
                id="article-minimum-sale-price"
                v-model.number="stateArticle.precioMinimoVenta"
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
            label-for="article-minium-stock"
          >
            <validation-provider
              #default="{ errors }"
              name="stock Min."
              rules="required"
            >
              <b-form-input
                id="article-minium-stock"
                v-model.number="stateArticle.stockMinimo"
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
            label-for="article-maximum-stock"
          >
            <validation-provider
              #default="{ errors }"
              name="Stock Max."
              rules="required"
            >
              <b-form-input
                id="article-maximum-stock"
                v-model.number="stateArticle.stockMaximo"
                type="number"
                :state="errors.length > 0 ? false:null"
                min="0"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
      </b-row>
    </field-set-component>
  </b-form>
</template>

<script>
import {
  BForm, BRow, BCol, BFormGroup, BFormInput, BFormTextarea, BFormCheckbox, BFormRadio, BInputGroup, BInputGroupAppend,
} from 'bootstrap-vue'
import { ValidationProvider } from 'vee-validate'
import { VueSelect } from 'vue-select'
import { watch } from '@vue/composition-api'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import InputSearchUniqueCodeComponent from '@/components/InputSearchUniqueCodeComponent/InputSearchUniqueCodeComponent.vue'
import UploadPhotoComponent from '@/components/UploadPhotoComponent/UploadPhotoComponent.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { endPointsCombo, loadCombos } from '@/helpers/combos'
import { generateBarCode } from '@/helpers/barCode'
import { stateArticle, selectedArticleType, combosArticle } from '../ServicesArticle/useVariablesArticle'
import { dataTableArticleRecipeDetail } from '../ServicesArticleRecipeDetail/useVariablesArticleRecipeDetail'

export default {
  name: 'HeaderArticle',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BFormCheckbox,
    BFormRadio,
    BInputGroup,
    BInputGroupAppend,
    ButtonComponent,
    VueSelect,
    ValidationProvider,
    FieldSetComponent,
    UploadPhotoComponent,
    InputSearchUniqueCodeComponent,
  },
  setup() {
    const unitGroupSelected = ({ _id }) => {
      loadCombos(combosArticle, ['unitMeasure'], `${endPointsCombo.grupoUnidad}/${_id}`, 'Unidad de Medida')
    }

    const uniqueCodeSelected = ({ _id, codProducto, nombreProducto }) => {
      stateArticle.value.idCodUnico = _id
      stateArticle.value.codUnico = codProducto
      stateArticle.value.nombreCodigoUnico = nombreProducto
    }

    const generateBarCodeArticle = _id => {
      stateArticle.value.codBarra = generateBarCode(_id)
    }

    watch(selectedArticleType, newValue => {
      if (newValue === 'stock') {
        stateArticle.value.flgStock = 1
        stateArticle.value.flgServicio = 0
      } else if (newValue === 'servicio') {
        stateArticle.value.flgStock = 0
        stateArticle.value.flgServicio = 1
      }
    })
    return {
      stateArticle,
      selectedArticleType,
      combosArticle,
      unitGroupSelected,
      uniqueCodeSelected,
      dataTableArticleRecipeDetail,
      generateBarCodeArticle,
    }
  },
}
</script>
