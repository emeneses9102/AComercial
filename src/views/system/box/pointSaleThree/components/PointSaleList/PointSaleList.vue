<template>
  <b-overlay
    :show="loadingProductList"
    variant="transparent"
    :opacity="0.85"
    blur="2px"
    rounded="md"
  >
    <b-card class="h-100">
      <div class="d-flex justify-content-between align-items-center mb-75">
        <b-input-group>
          <b-input-group-prepend>
            <button-component
              margin-class="0"
              variant="primary"
              icon-button="CastIcon"
              :method-function="()=>$bvModal.show('modal-query-article')"
              :disabled="!boxSession._id || !!statePointSale.cerrado || !!statePointSale.cancelado || !!statePointSale.anulado"
            />
          </b-input-group-prepend>
          <b-form-input
            id="input-search-product"
            v-model="searchProductById"
            autocomplete="off"
            type="text"
            style="height: 44px"
            :placeholder="placeholderSearch"
            :disabled="!boxSession._id || $store.state.pointSale.loading || !!statePointSale.cerrado || !!statePointSale.cancelado || !!statePointSale.anulado"
            @keydown.enter="searchArticle"
          />
          <b-input-group-append>
            <button-component
              margin-class="0"
              variant="primary"
              icon-button="FilterIcon"
              :method-function="()=>$bvModal.show('modal-options-filter-article')"
              :disabled="!boxSession._id"
            />
          </b-input-group-append>
        </b-input-group>
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
            v-for="product in listPointSaleDetail.rows"
            :key="product.idArticulo"
            :codigo="product.idArticulo"
            :nombre="product.nombreArticulo"
            :imagen="product.imagenArticulo"
            :precio="product.precio"
            :cantidad="product.cantidad"
            :sub-total="product.subTotal"
            :descuento="product.descuento"
            :tributo="product.tributo"
            :total="product.total"
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
  BInputGroup,
  BInputGroupAppend,
  BFormInput,
  BInputGroupPrepend,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import {
  computed,
} from '@vue/composition-api'
import {
  mapState,
} from 'vuex'
import ModalQueryArticle from '@/components/ModalQueryArticle/ModalQueryArticle.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import PointSaleListItem from './PointSaleListItem.vue'
import ModalOptionsFilterArticle from './ModalOptionsFilterArticle.vue'
import {
  searchProductById,
  stateFieldFilterArticle,
  statePointSale,
  optionsFiledFilterArticle,
} from '../../ServicesPointSale/useVariablesPointSale'
import {
  listPointSaleDetail, statePointSaleDetail,
} from '../../ServicesPointSaleDetail/useVariablesPointSaleDetail'
import {
  addArticleToList,
  searchArticle,
} from '../../ServicesPointSaleDetail/useServicesPointSaleDetail'

export default {
  name: 'PointSaleList',
  components: {
    BOverlay,
    BCard,
    BInputGroup,
    BInputGroupAppend,
    BFormInput,
    BInputGroupPrepend,
    VuePerfectScrollbar,
    PointSaleListItem,
    ModalQueryArticle,
    ButtonComponent,
    ModalOptionsFilterArticle,
  },
  computed: {
    ...mapState('pointSale', ['loadingProductList']),
    ...mapState('boxSession', ['boxSession']),
  },
  setup() {
    // Agregar a la lista el articulo seleccionado
    const articleSelected = ({
      _id,
      nombre,
      imagen,
      precioVenta,
      descuento,
    }) => {
      statePointSaleDetail.value.idArticulo = _id
      statePointSaleDetail.value.cantidad = 1
      statePointSaleDetail.value.nombreArticulo = nombre
      statePointSaleDetail.value.imagenArticulo = imagen
      statePointSaleDetail.value.precio = precioVenta
      statePointSaleDetail.value.descuento = descuento
      addArticleToList(statePointSaleDetail.value)
    }

    // Obtener la propiedad placeholder del filtro seleccionado
    const placeholderSearch = computed(() => {
      const optionSelected = optionsFiledFilterArticle.find(option => option.field === stateFieldFilterArticle.value)
      return optionSelected.placeholder
    })

    return {
      searchProductById,
      articleSelected,
      statePointSale,
      listPointSaleDetail,
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
