<template>
  <b-row
    class="mb-0 pb-0"
  >
    <div>
      <modal-list-client />
    </div>
    <!--Client Section-->
    <b-col
      cols="2"
      lg="2"
      md="6"
      sm="6"
    >
      <div>
        <b-card
          tag="article"
          style="height: 880px"
          class="mb-2 card-1"
        >
          <b-row>
            <b-col
              cols="12"
              style="height: 690px"
              class="s-cliente"
            >
              <point-sale-client />
              <!--Datos de Facturación-->
              <b-row
                class="mt-4"
              >
                <b-col
                  cols="12"
                >
                  <p
                    class="mb-0 title-client"
                  >
                    Datos de Facturación
                  </p>
                </b-col>
              </b-row>
            </b-col>
            <button-component
              margin-class=""
              icon-button="SearchIcon"
              class="btn-product col-3 px-md-1"
              icon-size="24"
              variant="secondary"
              title-tool-tip="Buscar Cliente"
              :method-function="()=>$bvModal.show('modal-query-partner')"
            />
            <button-component
              margin-class="mr-1"
              icon-button="Edit2Icon"
              icon-size="24"
              variant="secondary"
              class="btn-product col-3 px-md-1"
              title-tool-tip="Registrar Cliente"
              :method-function="()=>$bvModal.show('modal-partner')"
            />
            <button-component
              margin-class=""
              icon-button="UserXIcon"
              icon-size="24"
              variant="secondary"
              class="btn-product col-3 px-md-1"
              title-tool-tip="Retirar Cliente"
              :method-function="()=>clearStateClient()"
            />
            <b-col>
              <b-button
                variant="success"
                size="lg"
                class="btn-block btn-pay"
              >
                Facturar
              </b-button>
            </b-col>
          </b-row>
        </b-card>
      </div>
    </b-col>
    <b-col
      cols="7"
    >
      <div>
        <point-sale-list />
      </div>
    </b-col>
    <b-col
      cols="3"
    >
      <b-row>
        <b-col
          cols="12"
        >
          <div>
            <b-card
              title=""
              tag="article"
              style="height: 500px"
              class="mb-2 card-6"
            >
              <b-row
                style=""
              >
                <b-col
                  cols="6"
                >
                  <p
                    class="h3 mt-1 label-ticket"
                  >
                    <b>TICKET: </b>12456971
                  </p>
                </b-col>
                <b-col
                  cols="6"
                >
                  <div>
                    <p
                      class="text-right m-0"
                      style="font-size:12px"
                    >
                      12 AGO 2021</p>
                    <p
                      class="font-weight-bolder h1 text-right"
                      style="font-size:2.5em"
                    >
                      <b>12:23</b>
                    </p>
                  </div>
                </b-col>
                <b-col
                  cols="12"
                  class="mt-3 mt-md-2"
                >
                  <container-buttons
                    :modal-id="MODAL_ID"
                    icon="UsersIcon"
                  />
                  <button-component
                    icon-button="SearchIcon"
                    margin-class="ml-1"
                    :method-function="()=>$bvModal.show('modal-query-article')"
                    class="btn-cuadrado"
                    variant="secondary"
                  />
                  <b-button
                    class="btn btn-primary btn-cuadrado"
                  >
                    <feather-icon
                      icon="ArchiveIcon"
                      size="24"
                    />
                  </b-button>
                  <b-button
                    class="btn btn-primary btn-cuadrado"
                  >
                    <feather-icon
                      icon="BarChartIcon"
                      size="24"
                    />
                  </b-button>
                  <b-button
                    class="btn btn-primary btn-cuadrado"
                  >
                    <feather-icon
                      icon="CoffeeIcon"
                      size="24"
                    />
                  </b-button>
                  <b-button
                    class="btn btn-primary btn-cuadrado"
                  >
                    <feather-icon
                      icon="CpuIcon"
                      size="24"
                    />
                  </b-button>
                  <b-button
                    class="btn btn-primary btn-cuadrado"
                  >
                    <feather-icon
                      icon="CreditCardIcon"
                      size="24"
                    />
                  </b-button>
                  <b-button
                    class="btn btn-primary btn-cuadrado"
                  >
                    <feather-icon
                      icon="FeatherIcon"
                      size="24"
                    />
                  </b-button>
                  <b-button
                    class="btn btn-primary btn-cuadrado"
                  >
                    <feather-icon
                      icon="ImageIcon"
                      size="24"
                    />
                  </b-button>
                  <b-button
                    class="btn btn-primary btn-cuadrado"
                  >
                    <feather-icon
                      icon="MonitorIcon"
                      size="24"
                    />
                  </b-button>
                  <b-button
                    class="btn btn-primary btn-cuadrado"
                  >
                    <feather-icon
                      icon="SettingsIcon"
                      size="24"
                    />
                  </b-button>
                  <b-button
                    class="btn btn-primary btn-cuadrado"
                  >
                    <feather-icon
                      icon="SpeakerIcon"
                      size="24"
                    />
                  </b-button>
                  <b-button
                    class="btn btn-primary btn-cuadrado"
                  >
                    <feather-icon
                      icon="YoutubeIcon"
                      size="24"
                    />
                  </b-button>
                  <b-button
                    class="btn btn-primary btn-cuadrado"
                  >
                    <feather-icon
                      icon="AirplayIcon"
                      size="24"
                    />
                  </b-button>
                  <b-button
                    class="btn btn-primary btn-cuadrado"
                  >
                    <feather-icon
                      icon="PieChartIcon"
                      size="24"
                    />
                  </b-button>
                </b-col>
              </b-row>
            </b-card>
          </div>
        </b-col>
        <b-col
          cols="12"
        >
          <div>
            <b-card
              title=""
              tag="article"
              style="height: 365px"
              class="mb-2 card-7"
            >
              <b-row>
                <b-col
                  cols="6"
                >
                  <p
                    class="mb-0 font-weight-bolder"
                  >
                    Sub Total
                  </p>
                  <p
                    class="mb-0 font-weight-bolder"
                  >
                    IVA 25%
                  </p>
                  <p
                    class="mb-0 font-weight-bolder"
                  >
                    Descuento
                  </p>
                  <p
                    class="mb-0 font-weight-bolder"
                  >
                    Descuento
                  </p>
                  <p
                    class="mb-0 font-weight-bolder"
                  >
                    Descuento
                  </p>
                  <p
                    class="mb-0 font-weight-bolder"
                  >
                    Descuento
                  </p>
                  <p
                    class="mb-0 font-weight-bolder"
                  >
                    Descuento
                  </p>
                  <p
                    class="mb-0 font-weight-bolder"
                  >
                    Descuento
                  </p>
                  <p
                    class="mb-0 font-weight-bolder"
                  >
                    Descuento
                  </p>
                  <p
                    class="mb-0 font-weight-bolder"
                  >
                    Descuento
                  </p>
                </b-col>
                <b-col
                  cols="6"
                  class="text-right"
                >
                  <p
                    class="mb-0 font-weight-bolder"
                  >
                    110,52
                  </p>
                  <p
                    class="mb-0 font-weight-bolder"
                  >
                    29,38
                  </p>
                  <p
                    class="mb-0 font-weight-bolder"
                  >
                    0,00
                  </p>
                  <p
                    class="mb-0 font-weight-bolder"
                  >
                    0,00
                  </p>
                  <p
                    class="mb-0 font-weight-bolder"
                  >
                    0,00
                  </p>
                  <p
                    class="mb-0 font-weight-bolder"
                  >
                    0,00
                  </p>
                  <p
                    class="mb-0 font-weight-bolder"
                  >
                    0,00
                  </p>
                  <p
                    class="mb-0 font-weight-bolder"
                  >
                    0,00
                  </p>
                  <p
                    class="mb-0 font-weight-bolder"
                  >
                    0,00
                  </p>
                  <p
                    class="mb-0 font-weight-bolder text-danger"
                  >
                    -(0,00)
                  </p>
                </b-col>
                <b-col
                  cols="6"
                  class="text-left mt-1"
                >
                  <p
                    class="mb-0 font-weight-bolder"
                  >
                    Pagado
                  </p>
                  <p
                    class="mb-0 font-weight-bolder"
                  >
                    Vuelto
                  </p>
                </b-col>
                <b-col
                  cols="6"
                  class="text-right mt-1"
                >
                  <p
                    class="mb-0 font-weight-bolder"
                  >
                    0,00
                  </p>
                  <p
                    class="mb-0 font-weight-bolder"
                  >
                    0,00
                  </p>
                </b-col>
                <b-col
                  cols="12"
                  class="text-left"
                >
                  <p
                    class="  mt-2 font-weight-bolder mb-0"
                  >
                    TOTAL
                  </p>
                  <p
                    class="display-3 ml-2 font-weight-bolder text-right label-total"
                  >
                    <span>$</span>  139.90
                  </p>
                </b-col>
              </b-row>
            </b-card>
          </div>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>

import {
  BRow, BCol, BCard, BButton,
} from 'bootstrap-vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import { onMounted } from '@vue/composition-api'
import { endPointsCombo, loadCombos } from '@/helpers/combos'
import ContainerButtons from '@/components/ContainerButtons/ContainerButtons.vue'
import {
  MODAL_ID, clearStateClient,
} from './ServicesPointSale/useVariablesPointSale'
import ModalListClient from './ModalListClient/ModalListClient.vue'
import PointSaleClient from './components/PointSaleClient/PointSaleClient.vue'
import PointSaleList from './components/PointSaleList/PointSaleList.vue'
import { combosClient, combosClientUbigeo } from './ServicesClient/useVariablesClient'

export default {
  name: 'PointSale',
  components: {
    BRow,
    BCol,
    BCard,
    BButton,
    ContainerButtons,
    ModalListClient,
    PointSaleClient,
    PointSaleList,
    ButtonComponent,
  },
  setup() {
    onMounted(() => {
      loadCombos(combosClient, ['document'], `${endPointsCombo.tipoDocumento}/1`, 'Tipo de Documento')
      loadCombos(combosClientUbigeo, ['departament'], endPointsCombo.departamento, 'Departamento')
    })

    return {
      MODAL_ID,
      clearStateClient,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
.btn-circle{
  width: 35px;
  height: 35px;
  text-align: center;
  padding: 2px 0;
  margin-right: 5px;
  font-size: 12px;
  line-height: 1.428571429;
  border-radius: 19px;
  font-size: 20px;
  background-color: #989898;
}
.btn-plus{
  color: green;
}
.btn-delete{
  color: red;
}
.btn-cuadrado{
  width: 75px;
  height: 75px;
  margin: 10px;
}
.btn-product{
  width: 62px !important;
  height: 62px !important;
  margin: 8px !important;
  background-color: #fff !important;
  color: #989898 !important;
  border-color: #fff !important;
}
.btn-number{
  width: 75px;
  height: 75px;
  margin: 3px;
  border-radius: 50%;
  background-color: #1b1b1b  !important;
  border-color: #000000 !important;
  color: #24c06a !important;
  border-width: 3px;
  font-size: 2em;
}
.btn-double{
  width: 150px;
  border-radius: 65px ;
}
.btn-h{
  height: 150px;
  border-radius: 65px;
  font-size: 2.5em;
}
.title-client{
  color: #28c76f;
  font-weight: bold;
  font-size: 1.2em;
}
.btn-pay{
  font-size: 3.5em;
  border-color: #24c06a!important;
  background-color: #28c76f !important;
}
.btn-pay:active{
  background-color: rgb(33, 167, 93)6f !important;
}
.card-4{
  background-color: #565454;
}

@media (max-width: 1880px)  {
  .btn-cuadrado{
  width: 75px;
  height: 75px;
  margin: 8px
  }
  .btn-pay{
  font-size: 2.5em;
  border-color: #24c06a!important;
  background-color: #28c76f !important;
  }
  .btn-product{
  width: 60px;
  height: 60px;
  margin: 8px 4px;
  background-color: #fff !important;
  color: #989898 !important;
  border-color: #fff !important;
  }
}

@media (max-width: 1690px)  {
  .btn-cuadrado{
  width: 65px;
  height: 65px;
  margin: 6px
  }
  .btn-product{
  width: 55px;
  height: 55px;
  margin: 8px 2px;
  background-color: #fff !important;
  color: #989898 !important;
  border-color: #fff !important;
  }
}

@media (max-width: 1600px)  {
  .btn-cuadrado{
  width: 62px;
  height: 62px;
  margin: 6px
  }
  .btn-pay{
  font-size: 2em;
  border-color: #24c06a!important;
  background-color: #28c76f !important;
  }
  .btn-product{
  width: 53px;
  height: 53px;
  margin: 15px 1px;
  background-color: #fff !important;
  color: #989898 !important;
  border-color: #fff !important;
  }
  .btn-number{
  width: 65px;
  height: 65px;
  margin: 2px;
  border-radius: 50%;
  border-width: 3px;
  font-size: 2em;
}
.btn-double{
  width: 130px;
  border-radius: 65px ;
}
.btn-h{
  height: 130px;
  border-radius: 65px;
  font-size: 2.5em;
}
}

@media (max-width: 1440px)  {
  .btn-cuadrado{
  width: 58px;
  height: 58px;
  margin: 5px
  }
  .btn-pay{
  font-size: 1.8em;
  }
  .btn-product{
  width: 45px;
  height: 45px;
  margin: 15px 2px;
  background-color: #fff !important;
  color: #989898 !important;
  border-color: #fff !important;
  }
  .btn-number{
  width: 60px;
  height: 60px;
  margin: 2px;
  border-radius: 50%;
  border-width: 3px;
  font-size: 2em;
}
.btn-double{
  width: 120px;
  border-radius: 65px ;
}
.btn-h{
  height: 120px;
  border-radius: 65px;
  font-size: 2.5em;
}
}

@media (max-width: 1366px)  {
  .btn-cuadrado{
  width: 56px;
  height: 56px;
  margin: 3px
  }
  .btn-pay{
  font-size: 1.5em;
  }
  .btn-product{
  width: 41px;
  height: 41px;
  margin: 20px 2px;
  background-color: #fff !important;
  color: #989898 !important;
  border-color: #fff !important;
  }
  .btn-number{
  width: 55px;
  height: 55px;
  margin: 2px;
  border-radius: 50%;
  border-width: 3px;
  font-size: 2em;
}
.btn-double{
  width: 110px;
  border-radius: 65px ;
}
.btn-h{
  height: 110px;
  border-radius: 65px;
  font-size: 2.5em;
}
}

@media (max-width: 1280px)  {
  .btn-cuadrado{
  width: 51px;
  height: 52px;
  margin: 3px;
  padding: 5px;
  }
  .btn-product{
  width: 38px;
  height: 38px;
  margin: 20px 1px;
  background-color: #fff !important;
  color: #989898 !important;
  border-color: #fff !important;
  }
  .card-6{
    height: 450px !important;
  }
  .card-7{
    height: 415px !important;
  }
  .btn-number{
  width: 52px;
  height: 52px;
  margin: 2px;
  border-radius: 50%;
  border-width: 3px;
  font-size: 2em;
}
.btn-double{
  width: 104px;
  border-radius: 65px ;
}
.btn-h{
  height: 104px;
  border-radius: 65px;
  font-size: 2.5em;
}
.p-total{
  text-align: center;
  font-size: 3.5em !important;
  margin-top: 40px;
}
}

@media (max-width: 1200px)  {
  .btn-cuadrado{
  width: 50px;
  height: 50px;
  margin: 3px;
  padding: 5px;
  }
  .btn-pay{
  font-size: 1.5em;
  border-color: #24c06a!important;
  background-color: #28c76f !important;
  }
  .btn-product{
  width: 38px;
  height: 38px;
  margin: 25px 2px;
  background-color: #fff !important;
  color: #989898 !important;
  border-color: #fff !important;
  }
  .card-1{
    height: 870px !important;
  }
  .card-6{
    height: 420px !important;
  }
  .card-7{
    height: 435px !important;
  }
  .card-2{
    height: 430px !important;
  }
  .card-4{
    height: 345px !important;
    padding-top: 20px !important;
  }
  .btn-number{
  width: 55px;
  height: 55px;
  margin: 2px;
  border-radius: 50%;
  border-width: 3px;
  font-size: 2em;
}
.btn-double{
  width: 110px;
  border-radius: 65px ;
}
.btn-h{
  height: 110px;
  border-radius: 65px;
  font-size: 2.5em;
}
.label-ticket{
    font-size: 1.7em;
  }
}

@media (max-width: 1172px)  {
.btn-cuadrado{
  width: 38px;
  height: 38px;
  margin: 3px;
  padding: 5px;
  }
  .card-6{
    height: 320px !important;
  }
  .label-ticket{
    font-size: 1.5em;
  }
  .btn-number{
  width: 49px;
  height: 49px;
  margin: 2px;
  border-radius: 50%;
  border-width: 3px;
  font-size: 1.3em;
}
.btn-double{
  width: 100px;
  border-radius: 65px ;
}
.btn-h{
  height: 100px;
  border-radius: 65px;
  font-size: 2.5em;
}
.card-4{
    height: 280px !important;
  }
.card-number{
    padding-top: 10px !important;
  }
  .card-1{
    height: 775px !important;
  }
  .btn-pay{
  font-size: 1.3em;
  border-color: #24c06a!important;
  background-color: #28c76f !important;
  }
  .btn-product{
  width: 35px;
  height: 35px;
  margin: 8px 2px;
  background-color: #fff !important;
  color: #989898 !important;
  border-color: #fff !important;
  }
  .s-cliente{
    height: 650px !important;
  }
  .card-5{
    height: 775px !important;
  }
  .card-2{
    height: 400px !important;
  }
  .label-total{
    margin-top: 60px;
    font-size: 3.8em !important;
  }
}
@media (max-width: 1080px)  {
.btn-cuadrado{
  width: 38px;
  height: 38px;
  margin: 3px;
  padding: 5px;
  }
  .card-6{
    height: 320px !important;
  }
  .label-ticket{
    font-size: 1.5em;
  }
  .btn-number{
  width: 45px;
  height: 45px;
  margin: 2px;
  border-radius: 50%;
  border-width: 3px;
  font-size: 0.8em;
  padding: 1.2em;
}
.btn-double{
  width: 90px;
  border-radius: 65px ;
}
.btn-h{
  height: 90px;
  border-radius: 65px;
  font-size: 2em;
  padding: 0em;
}
.card-4{
    height: 280px !important;
  }
.card-number{
    padding-top: 10px !important;
  }
  .card-1{
    height: 775px !important;
  }
  .btn-pay{
  font-size: 1.3em;
  padding: 0.8em 1em;
  border-color: #24c06a!important;
  background-color: #28c76f !important;
  }
  .btn-product{
  width: 30px;
  height: 30px;
  margin: 12px 2px;
  background-color: #fff !important;
  color: #989898 !important;
  border-color: #fff !important;
  }
  .s-cliente{
    height: 650px !important;
  }
  .card-5{
    height: 775px !important;
  }
  .card-2{
    height: 400px !important;
  }
  .label-total{
    margin-top: 60px;
    font-size: 3.2em !important;
  }
  .p-total{
    font-size: 3.2em !important;
  }
  .amount-article{
    font-size: 3em !important;
  }
  .btn-delete{
    margin-top: 0 !important;
  }
}
</style>
