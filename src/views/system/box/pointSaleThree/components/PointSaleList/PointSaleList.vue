<template>
  <Fragment>
    <b-card class="h-100">
      <div class="d-flex justify-content-between align-items-center mb-75">
        <b-input-group>
          <b-input-group-prepend>
            <button-component
              margin-class="0"
              variant="primary"
              icon-button="CastIcon"
              :method-function="()=>$bvModal.show('modal-query-table-article')"
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
        <modal-query-table-article
          @on-article-selected="articleSelected"
        />
        <modal-options-filter-article />
        <modal-point-sale-serie />
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
            :id="product._id"
            :key="product._id"
            :codigo="product.idTArticulo"
            :nombre="product.nombreArticulo"
            :imagen="product.imagen"
            :serie="product.flgSerie"
            :precio="product.precio"
            :cantidad="product.cantidad"
            :scantidad="product.scantidad"
            :sub-total="product.subTotal"
            :descuento="product.descuento"
            :tributo="product.tributo"
            :total="product.total"
          />
        </vue-perfect-scrollbar>
      </div>
    </b-card>
    <point-sale-amount
      class="detail-amount"
    />
  </Fragment>
</template>

<script>
import {
  BCard,
  BInputGroup,
  BInputGroupAppend,
  BFormInput,
  BInputGroupPrepend,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { Fragment } from 'vue-fragment'
import {
  computed,
} from '@vue/composition-api'
import {
  mapState,
} from 'vuex'
import ModalQueryTableArticle from '@/components/ModalQueryTableArticle/ModalQueryTableArticle.vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import PointSaleListItem from './PointSaleListItem.vue'
import PointSaleAmount from '../PointSaleAmount/PointSaleAmount.vue'
import ModalOptionsFilterArticle from './ModalOptionsFilterArticle.vue'
import ModalPointSaleSerie from './ModalPointSaleSerie.vue'
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
    Fragment,
    BCard,
    BInputGroup,
    BInputGroupAppend,
    BFormInput,
    BInputGroupPrepend,
    VuePerfectScrollbar,
    PointSaleListItem,
    PointSaleAmount,
    ModalQueryTableArticle,
    ButtonComponent,
    ModalOptionsFilterArticle,
    ModalPointSaleSerie,
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
      statePointSaleDetail.value.idTArticulo = _id
      statePointSaleDetail.value.cantidad = 1
      statePointSaleDetail.value.nombreArticulo = nombre
      statePointSaleDetail.value.imagenArticulo = imagen || ''
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
  max-height: calc(100vh - 29rem);
  padding: .4em;
}
@media screen and (min-width: 1000px) {
  .pointsale .scroll-area {
    max-height: calc(100vh - 19rem);
  }
}
</style>
