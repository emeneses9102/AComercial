<template>
  <b-row
    class="mb-0 pb-0"
  >
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
              <b-row>
                <b-col
                  cols="12"
                >
                  <p
                    class="mb-0 title-client"
                  >
                    Cliente N° #####
                  </p>
                  <p class="mt-50">
                    <b>Edgar Meneses</b>
                  </p>
                </b-col>
                <b-col
                  cols="12"
                  class="mt-2"
                >
                  <p
                    class="mb-0"
                  >
                    ID
                  </p>
                  <p><b>33045094X</b></p>
                </b-col>
                <b-col
                  cols="12"
                  class="mt-2 mt-md-0"
                >
                  <p
                    class="mb-0"
                  >
                    Dirección
                  </p>
                  <p><b>Jr Las Peras 124, Lince</b></p>
                </b-col>
                <b-col
                  cols="12"
                  class="mt-2 mt-md-0"
                >
                  <p
                    class="mb-0"
                  >
                    Teléfono
                  </p>
                  <p><b>971256364</b></p>
                </b-col>
                <b-col
                  cols="12"
                  class="mt-2 mt-md-0"
                >
                  <p
                    class="mb-0"
                  >
                    Correo
                  </p>
                  <p><b>edgar.meneses@simsac.pe</b></p>
                </b-col>
              </b-row>
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
            <!--Button Section-->
            <b-col
              class="m-0 p-md-0 px-md-50"
              cols="12"
            >
              <b-button
                class="btn-product px-md-1"
                variant=""
              >
                <feather-icon
                  icon="SearchIcon"
                  size="24"
                />
              </b-button>
              <b-button
                class="btn-product px-md-1"
              >
                <feather-icon
                  icon="Edit2Icon"
                  size="24"
                />
              </b-button>
              <b-button
                class="btn-product px-md-1"
              >
                <feather-icon
                  icon="UserPlusIcon"
                  size="24"
                />
              </b-button>
            </b-col>
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
        <b-card
          title=""
          tag="article"
          style="height: 880px"
          class="mb-2 card-5"
        >
          <b-card-text>
            <b-form-input
              class="control search-product bg-dark text-white"
              placeholder="INGRESE O SCANEE UN PRODUCTO"
              style="font-size:1.2rem"
            />
          </b-card-text>
          <div
            class="overflow-auto"
            style="height: 750px; padding: 0 20px"
          >
            <b-row>
              <b-col
                cols="12"
                class="p-md-0"
              >
                <b-card
                  style="height: 50px"
                >
                  <b-row
                    style="box-shadow:0px 7px 15px 0px rgba(0,0,0,0.75); padding: 10px 5px 5px 0px; border-radius:10px"
                  >
                    <b-col
                      cols="2"
                      lg="2"
                      md="1"
                    >
                      <b-img
                        src="https://cdn.lumingo.com/medias/0100318233-000000000004521178-0-c1200Wx1200H?context=bWFzdGVyfGltYWdlc3wxOTk3Nzl8aW1hZ2UvanBlZ3xpbWFnZXMvaGI1L2hmYS84ODY4MTkyNzE0NzgyLmpwZ3xiMWY1YTVmZGYwMjk4MzRlNWEzZTU1MTViZDE1YjdkODllZTdlNDkzMGNkZjNkNzMzYmQ5N2MxOWI0NWE1ZTZj"
                        fluid
                        width="200"
                        alt="Zapatilla"
                      />
                    </b-col>
                    <b-col
                      cols="4"
                      class="text-center pt-2"
                    >
                      <p>Nike Zapatilla</p>
                      <p>139.90 $</p>
                    </b-col>
                    <b-col
                      cols="4"
                      class="text-center pt-2 "
                    >
                      <p>Ref: ######</p>
                      <p>Code: ######</p>
                    </b-col>
                    <b-col
                      cols="1"
                      lg="2"
                      md="2"
                      sm="2"
                      class="px-0 mt-50 pt-2  "
                    >
                      <b-button
                        variant="relief-danger"
                        class="btn-icon  btn-delete mr-1 mr-md-50"
                        size="lg"
                        style="font-weight: bold"
                      >
                        <feather-icon icon="XIcon" />
                      </b-button>
                      <b-button
                        variant="relief-success"
                        class="btn-icon  btn-delete"
                        size="lg"
                        style="font-weight: bold"
                      >
                        <feather-icon icon="SearchIcon" />
                      </b-button>
                    </b-col>
                  </b-row>
                </b-card>
              </b-col>
            </b-row>
          </div>
        </b-card>
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
                  <b-button
                    class="btn btn-primary btn-cuadrado"
                  >
                    <feather-icon
                      icon="UsersIcon"
                      size="24"
                    />
                  </b-button>
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
  BRow, BCol, BCard, BCardText, BFormInput, BButton, BImg,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,

    BCol,
    BCard,
    BCardText,
    BFormInput,
    BButton,
    BImg,
  },
}
</script>

<style lang="scss">
.btn-plus{
  color: green;
}
.btn-delete{
  color: white;
}
.btn-cuadrado{
  width: 75px;
  height: 75px;
  margin: 10px
}
.btn-product{
  width: 62px;
  height: 62px;
  margin: 8px;
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
