<template>
  <b-card>
    <div class="d-flex justify-content-between align-items-center mb-2">
      <input
        v-model="searchProductById"
        class="pointsale-list__input-code"
        type="text"
        placeholder="Ingresar o escane el código"
      >
      <button-component
        icon-button="SearchIcon"
        margin-class="ml-1"
        :method-function="()=>$bvModal.show('modal-query-article')"
      />
      <modal-query-article
        @on-article-selected="articleSelected"
      />
    </div>
    <div class="pointsale-list-products">
      <vue-perfect-scrollbar
        :settings="{
          wheelPropagation: false,
        }"
        class="scrollable-container media-list scroll-area"
      >
        <point-sale-list-item
          v-for="product in stateListProducts"
          :key="product._id"
          :codigo="product._id"
          :sku="product.sku"
          :nombre="product.nombre"
          :precio="product.precioVenta"
          :cantidad="product.cantidad"
        />
        <!-- <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item />
        <point-sale-list-item /> -->
      </vue-perfect-scrollbar>
    </div>
  </b-card>
</template>

<script>
import {
  BCard,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import ModalQueryArticle from '@/components/ModalQueryArticle/ModalQueryArticle.vue'
import PointSaleListItem from './PointSaleListItem.vue'
import { searchProductById, stateListProducts } from '../../ServicesPointSale/useVariablesPointSale'
import { addProductToList } from '../../ServicesPointSale/useServicesPointSale'

export default {
  name: 'PointSaleList',
  components: {
    BCard,
    VuePerfectScrollbar,
    PointSaleListItem,
    ButtonComponent,
    ModalQueryArticle,
  },
  setup() {
    const articleSelected = ({
      _id,
      sku,
      nombre,
      imagen,
      precioVenta,
    }) => {
      const newValue = {
        _id: _id.toString(),
        sku,
        nombre,
        imagen,
        precioVenta,
        cantidad: 1,
      }
      addProductToList(newValue)
    }
    return {
      searchProductById,
      articleSelected,
      stateListProducts,
    }
  },
}
</script>

<style lang="scss">
.scroll-area {
  position: relative;
  height: calc(100vh - 20rem);
  // height: calc(100% - 1px);
  padding-right: .5em;
}
</style>
