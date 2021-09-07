<template>
  <div
    class="overflow-auto product-item"
    :class="[stateProductSelected._id === codigo ? 'product-item--selected' : 'hola']"
    @click="selectedItem"
  >
    <b-card class="mb-0">
      <b-row
        style="box-shadow:0px 3px 10px 0px rgba(0,0,0,0.65); padding: 5px 5px 5px 0px; border-radius:10px"
      >
        <b-col>
          <b-img
            src="https://cdn.lumingo.com/medias/0100318233-000000000004521178-0-c1200Wx1200H?context=bWFzdGVyfGltYWdlc3wxOTk3Nzl8aW1hZ2UvanBlZ3xpbWFnZXMvaGI1L2hmYS84ODY4MTkyNzE0NzgyLmpwZ3xiMWY1YTVmZGYwMjk4MzRlNWEzZTU1MTViZDE1YjdkODllZTdlNDkzMGNkZjNkNzMzYmQ5N2MxOWI0NWE1ZTZj"
            fluid
            width="110"
            alt="Zapatilla"
          />
        </b-col>
        <b-col>
          <div class="product-item-left mt-1">
            <p class="product-item__name font-weight-bold">
              {{ nombre }}
            </p>
            <div class="product-item__info mt-75">
              <p class="product-item__price">
                <b>Precio: </b>  S/. {{ precio.toFixed(2) }}
              </p>
              <p class="product-item__quantity mt-50">
                <b>Cantidad: </b>  {{ cantidad }}
              </p>
            </div>
          </div>
        </b-col>
        <b-col>
          <div class="product-item-right mt-1">
            <div class="product-item__codes">
              <p>
                <b>Descuento:</b> S/.0
              </p>
              <p class="mb-50">
                <b>SubTotal:</b>
                <span>S/. {{ estado === true? precio.toFixed(2) : subtotal.toFixed(2) }}</span>

              </p>
              <b-form-input
                v-if="estadoAmount"
                id="currency-moneda"
                v-model.number="cantidadDefault"
                type="number"
                @keydown.enter="()=>sendFunction()"
              />
            </div>
          </div>
        </b-col>
        <b-col class="d-flex  align-items-center  justify-content-center">
          <div class="product-item__actions">
            <button-component
              icon-button="Edit2Icon"
              variant="primary"
              icon-size="20"
              class="p-1"
              :method-function="()=>ActiveInput()"
            />
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
  BCard, BRow, BCol, BImg, BFormInput,
} from 'bootstrap-vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { stateProductSelected } from '../../ServicesPointSale/useVariablesPointSale'
import {
  removeProduct, updateSubtotal, changeAmount,
} from '../../ServicesPointSale/useServicesPointSale'

export default {
  name: 'PointSaleListItem',
  components: {
    ButtonComponent,
    BCard,
    BRow,
    BCol,
    BImg,
    BFormInput,
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
    subtotal: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  data() {
    return {
      cantidadDefault: '1',
      estadoAmount: false,
      estado: true,
    }
  },
  methods: {
    ActiveInput(estadoAmount) {
      this.estadoAmount = !estadoAmount
    },
    sendFunction() {
      changeAmount(this.codigo, this.cantidadDefault, this.precio)
      this.ActiveInput(this.estadoAmount)
      this.estado = false
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
      stateProductSelected.value.subtotal = props.subtotal
    }

    return {
      selectedItem,
      stateProductSelected,
      updateSubtotal,
      removeProduct,
      changeAmount,
    }
  },
}
</script>
