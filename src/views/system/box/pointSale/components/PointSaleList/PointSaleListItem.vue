<template>
  <div
    class="overflow-auto product-item"
    :class="[stateProductSelected._id === codigo ? 'product-item--selected' : 'hola']"
    @click="selectedItem"
  >
    <b-card>
      <b-row
        style="box-shadow:0px 7px 15px 0px rgba(0,0,0,0.75); padding: 10px 5px 5px 0px; border-radius:10px"
      >
        <b-col>
          <b-img
            src="https://cdn.lumingo.com/medias/0100318233-000000000004521178-0-c1200Wx1200H?context=bWFzdGVyfGltYWdlc3wxOTk3Nzl8aW1hZ2UvanBlZ3xpbWFnZXMvaGI1L2hmYS84ODY4MTkyNzE0NzgyLmpwZ3xiMWY1YTVmZGYwMjk4MzRlNWEzZTU1MTViZDE1YjdkODllZTdlNDkzMGNkZjNkNzMzYmQ5N2MxOWI0NWE1ZTZj"
            fluid
            width="200"
            alt="Zapatilla"
          />
        </b-col>
        <b-col>
          <div class="product-item-left mt-3">
            <p class="product-item__name">
              {{ nombre }}
            </p>
            <div class="product-item__info mt-75">
              <p class="product-item__price">
                Precio S/. {{ precio.toFixed(2) }}
              </p>
              <span class="product-item__quantity mt-50">Cantidad: {{ cantidad }}</span>
            </div>
          </div>
        </b-col>
        <b-col>
          <div class="product-item-right mt-3">
            <div class="product-item__codes">
              <p>Descuento: </p>
              <p>SubTotal: </p>
            </div>
          </div>
        </b-col>
        <b-col>
          <div class="product-item__actions mt-3">
            <button-component
              icon-button="XIcon"
              variant="danger"
              icon-size="20"
              class="p-1"
              :method-function="()=>removeProduct(codigo)"
            />
          </div>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import {
  BCard, BRow, BCol, BImg,
} from 'bootstrap-vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { stateProductSelected } from '../../ServicesPointSale/useVariablesPointSale'
import { removeProduct } from '../../ServicesPointSale/useServicesPointSale'

export default {
  name: 'PointSaleListItem',
  components: {
    ButtonComponent,
    BCard,
    BRow,
    BCol,
    BImg,
  },
  props: {
    nombre: {
      type: String,
      required: true,
      default: '',
    },
    precio: {
      type: Number,
      required: true,
      default: 0,
    },
    cantidad: {
      type: Number,
      required: true,
      default: 0,
    },
    codigo: {
      type: String,
      required: true,
      default: '',
    },
    sku: {
      type: String,
      required: false,
      default: '',
    },
  },
  setup(props) {
    const selectedItem = () => {
      stateProductSelected.value._id = props.codigo
      stateProductSelected.value.ref = props.sku
      stateProductSelected.value.nombre = props.nombre
      stateProductSelected.value.imagen = props.imagen
      stateProductSelected.value.precio = props.precio
      stateProductSelected.value.descuento = props.descuento
      stateProductSelected.value.cantidad = props.cantidad
    }

    return {
      selectedItem,
      stateProductSelected,
      removeProduct,
    }
  },
}
</script>
