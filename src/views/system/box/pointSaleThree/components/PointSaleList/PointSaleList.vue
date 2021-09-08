<template>
  <b-overlay
    :show="loadingProductList"
    variant="transparent"
    :opacity="0.85"
    blur="2px"
    rounded="md"
  >
    <b-card
      class="h-100"
    >
      <div class="d-flex justify-content-between align-items-center mb-2">
        <input
          v-model="searchProductById"
          class="pointsale-list__input-code"
          type="text"
          :placeholder="placeholderSearch"
          @keydown.enter="searchArticle"
        >
        <modal-query-article
          @on-article-selected="articleSelected"
        />
        <modal-options-filter-article />
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
            :imagen="product.imagen"
            :precio="product.precioVenta"
            :cantidad="product.cantidad"
            :descuento="product.descuento"
          />
        </vue-perfect-scrollbar>
      </div>
    </b-card>
  </b-overlay>
</template>

<script>
import {
  BOverlay,
  BCard,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import {
  computed,
} from '@vue/composition-api'
import {
  mapState,
} from 'vuex'
import ModalQueryArticle from '@/components/ModalQueryArticle/ModalQueryArticle.vue'
import PointSaleListItem from './PointSaleListItem.vue'
import ModalOptionsFilterArticle from './ModalOptionsFilterArticle.vue'
import {
  searchProductById,
  stateListProducts,
  stateFieldFilterArticle,
  optionsFiledFilterArticle,
} from '../../ServicesPointSale/useVariablesPointSale'
import {
  addProductToList,
  searchArticle,
} from '../../ServicesPointSale/useServicesPointSale'

export default {
  name: 'PointSaleList',
  components: {
    BOverlay,
    BCard,
    VuePerfectScrollbar,
    PointSaleListItem,
    ModalQueryArticle,
    ModalOptionsFilterArticle,
  },
  computed: {
    ...mapState('pointSale', ['loadingProductList']),
  },
  setup() {
    // Agregar a la lista el articulo seleccionado
    const articleSelected = ({
      _id,
      sku,
      nombre,
      imagen,
      precioVenta,
      descuento,
    }) => {
      const newValue = {
        _id: _id.toString(),
        sku,
        nombre,
        imagen,
        precioVenta,
        descuento,
        cantidad: 1,
      }
      addProductToList(newValue)
    }

    // Obtener la propiedad placeholder del filtro seleccionado
    const placeholderSearch = computed(() => {
      const optionSelected = optionsFiledFilterArticle.find(option => option.field === stateFieldFilterArticle.value)
      return optionSelected.placeholder
    })

    return {
      searchProductById,
      articleSelected,
      stateListProducts,
      stateFieldFilterArticle,
      placeholderSearch,
      searchArticle,
    }
  },
}
</script>

<style lang="scss">
.pointsale .scroll-area {
  position: relative;
  max-height: calc(100vh - 19rem);
  padding: .4em;
}
</style>
