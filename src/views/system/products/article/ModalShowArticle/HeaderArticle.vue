<template>
  <b-form>
    <field-set-component legend="Datos Generales">
      <b-row>
        <!-- SKU -->
        <b-col
          cols="12"
          md="4"
          lg="3"
        >
          <b-form-group
            label="SKU"
            label-for="article-SKU"
          >
            <b-form-input
              id="article-SKU"
              v-model="stateArticle.sku"
              readonly
            />
          </b-form-group>
        </b-col>

        <!-- Nombre del Artículo -->
        <b-col
          cols="12"
          md="8"
          lg="9"
        >
          <b-form-group
            label="Artículo"
            label-for="articleName"
          >
            <b-form-input
              id="articleName"
              v-model="stateArticle.nombre"
              readonly
            />
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
              :image="stateArticle.imagen"
              :mode-show="true"
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
            <!-- Descripción del Artículo -->
            <b-col
              cols="12"
            >
              <b-form-group
                label="Descripción"
                label-for="article-description"
              >
                <b-form-textarea
                  id="article-description"
                  v-model="stateArticle.descripcion"
                  rows="3"
                  no-resize
                  readonly
                />
              </b-form-group>
            </b-col>

            <!-- Tipo de Articulo -->
            <b-col
              cols="6"
              sm="6"
              md="6"
              lg="4"
            >
              <b-form-group
                label="Tipo de Articulo"
                label-for="article-type"
              >
                <div class="d-flex align-items-center flex-wrap">
                  <div
                    class="d-flex align-items-center mr-1"
                    style="height: 2.714rem;"
                  >
                    <b-badge
                      :variant="stateArticle.flgStock ? 'light-success' : 'light-danger'"
                    >
                      <feather-icon
                        :icon="stateArticle.flgStock ? 'CheckIcon' : 'SlashIcon'"
                        size="16"
                      />
                    </b-badge>
                    <span class="d-inline-block ml-50">Stock</span>
                  </div>
                  <div
                    class="d-flex align-items-center mr-1"
                    style="height: 2.714rem;"
                  >
                    <b-badge
                      :variant="stateArticle.flgServicio ? 'light-success' : 'light-danger'"
                    >
                      <feather-icon
                        :icon="stateArticle.flgServicio ? 'CheckIcon' : 'SlashIcon'"
                        size="16"
                      />
                    </b-badge>
                    <span class="d-inline-block ml-50">Servicio</span>
                  </div>
                </div>
              </b-form-group>
            </b-col>

            <!-- Receta -->
            <b-col
              cols="6"
              sm="6"
              md="6"
              lg="2"
            >
              <b-form-group
                label="Receta"
                label-for="article-recipe"
              >
                <div class="d-flex align-items-center flex-wrap">
                  <div
                    class="d-flex align-items-center"
                    style="height: 2.714rem;"
                  >
                    <b-badge
                      :variant="stateArticle.flgReceta ? 'light-success' : 'light-danger'"
                    >
                      <feather-icon
                        :icon="stateArticle.flgReceta ? 'CheckIcon' : 'SlashIcon'"
                        size="16"
                      />
                    </b-badge>
                    <span class="d-inline-block ml-50">Receta</span>
                  </div>
                </div>
              </b-form-group>
            </b-col>

            <!-- Tipo Producto -->
            <b-col
              cols="12"
              sm="12"
              md="12"
              lg="6"
            >
              <b-form-group
                label="Tipo Producto"
                label-for="productType"
              >
                <b-form-input
                  id="productType"
                  v-model="stateArticle.nombreTipoProducto"
                  readonly
                />
              </b-form-group>
            </b-col>

            <!-- Tipo Servicio -->
            <b-col
              cols="12"
              sm="12"
              md="12"
              lg="6"
            >
              <b-form-group
                label="Tipo Servicio"
                label-for="serviceType"
              >
                <b-form-input
                  id="serviceType"
                  v-model="stateArticle.nombreTipoServicio"
                  readonly
                />
              </b-form-group>
            </b-col>

            <!-- Grupo Unidad -->
            <b-col
              cols="12"
              sm="6"
              lg="6"
            >
              <b-form-group
                label="Grupo Unidad"
                label-for="article-unit-group"
              >
                <b-form-input
                  id="article-unit-group"
                  v-model.trim="stateArticle.nombreUnidad"
                  readonly
                />
              </b-form-group>
            </b-col>

            <!-- Unidad Medida -->
            <b-col
              cols="12"
              sm="6"
              lg="6"
            >
              <b-form-group
                label="Unidad Medida"
                label-for="article-unit-measure"
              >
                <b-form-input
                  id="article-unit-measure"
                  v-model.trim="stateArticle.nombreUnidadMedida"
                  readonly
                />
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
            label-for="article-purchase-price"
          >
            <b-form-input
              id="article-purchase-price"
              v-model.number="stateArticle.precioCompra"
              readonly
            />
          </b-form-group>
        </b-col>

        <!-- Precio Venta -->
        <b-col
          cols="6"
          sm="6"
          lg="2"
        >
          <b-form-group
            label="Precio Venta"
            label-for="article-sale-price"
          >
            <b-form-input
              id="article-sale-price"
              v-model.number="stateArticle.precioVenta"
              readonly
            />
          </b-form-group>
        </b-col>

        <!-- Precio Min Venta -->
        <b-col
          cols="6"
          sm="6"
          lg="2"
          offset-lg="2"
        >
          <b-form-group
            label="Precio Min Venta"
            label-for="article-minium-sale-price"
          >
            <b-form-input
              id="article-minium-sale-price"
              v-model.number="stateArticle.precioMinimoVenta"
              readonly
            />
          </b-form-group>
        </b-col>

        <!-- Stock Minimo -->
        <b-col
          cols="6"
          sm="6"
          lg="2"
        >
          <b-form-group
            label="Stock Min"
            label-for="article-minium-stock"
          >
            <b-form-input
              id="article-minium-stock"
              v-model.number="stateArticle.stockMinimo"
              readonly
            />
          </b-form-group>
        </b-col>

        <!-- Stock Maximo -->
        <b-col
          cols="6"
          sm="6"
          lg="2"
        >
          <b-form-group
            label="Stock Max"
            label-for="article-maximum-stock"
          >
            <b-form-input
              id="article-maximum-stock"
              v-model.number="stateArticle.stockMaximo"
              readonly
            />
          </b-form-group>
        </b-col>
      </b-row>
    </field-set-component>
  </b-form>
</template>

<script>
import {
  BForm, BRow, BCol, BFormGroup, BFormInput, BBadge, BFormTextarea,
} from 'bootstrap-vue'
import FieldSetComponent from '@/components/FieldSetComponent/FieldSetComponent.vue'
import UploadPhotoComponent from '@/components/UploadPhotoComponent/UploadPhotoComponent.vue'
import { stateArticle } from '../ServicesArticle/useVariablesArticle'

export default {
  name: 'HeaderArticle',
  components: {
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BBadge,
    BFormTextarea,
    FieldSetComponent,
    UploadPhotoComponent,
  },
  setup() {
    return {
      stateArticle,
    }
  },
}
</script>
