<template>
  <b-card class="pointsale-client">
    <b-card-title>Cliente</b-card-title>
    <div class="card__group client-id">
      <label class="card__label">Id :</label>
      <p class="card__input">
        {{ stateClient._id || '-----------' }}
      </p>
    </div>
    <div class="card__group client-number-document">
      <label class="card__label">{{ stateClient.numeroRuc ? 'RUC :' : 'N° Documento :' }}</label>
      <p class="card__input">
        {{ stateClient.numeroRuc || stateClient.numeroDocumento }}
      </p>
    </div>
    <div class="card__group client-name">
      <label class="card__label">{{ stateClient.numeroRuc ? 'Razón Social :' : 'Nombres :' }}</label>
      <p class="card__input">
        {{ stateClient.numeroRuc ? stateClient.razonSocial : stateClient.nombres }}
      </p>
    </div>
    <div class="card__group client-address">
      <label class="card__label">Dirección :</label>
      <p class="card__input">
        {{ stateClient.direccion }}
      </p>
    </div>
    <div class="card__group client-phone">
      <label class="card__label">Teléfono :</label>
      <p class="card__input">
        {{ stateClient.telefono }}
      </p>
    </div>
    <div class="card__group client-email">
      <label class="card__label">Correo Electrónico :</label>
      <p class="card__input">
        {{ stateClient.correo }}
      </p>
    </div>
    <div class="d-flex flex-wrap justify-content-between mt-2">
      <button-component
        :variant="stateClient._id ? 'primary' : 'warning'"
        margin-class="mr-1"
        icon-button="SearchIcon"
        icon-size="20"
        :method-function="()=>$bvModal.show('modal-query-partner')"
        :disabled="!boxSession._id || !!statePointSale.cerrado || !!statePointSale.cancelado || !!statePointSale.anulado || !!statePointSale.facturado"
      />
      <button-component
        margin-class="mr-1"
        icon-button="UserPlusIcon"
        icon-size="20"
        :method-function="()=>$bvModal.show('modal-partner')"
        :disabled="!boxSession._id || !!statePointSale.cerrado || !!statePointSale.cancelado || !!statePointSale.anulado || !!statePointSale.facturado"
      />
      <button-component
        margin-class=""
        icon-button="UserXIcon"
        icon-size="20"
        :method-function="()=>clearStateClient()"
        :disabled="!boxSession._id || !!statePointSale.cerrado || !!statePointSale.cancelado || !!statePointSale.anulado || !!statePointSale.facturado"
      />
      <modal-query-partner
        @on-partner-selected="partnerSelected"
      />
      <modal-save-partner />
    </div>
  </b-card>
</template>

<script>
import {
  BCard, BCardTitle,
} from 'bootstrap-vue'
import { mapState } from 'vuex'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'
import ModalQueryPartner from '@/components/ModalQueryPartner/ModalQueryPartner.vue'
import ModalSavePartner from '@/views/system/maintenance/partner/ModalSavePartner/ModalSavePartner.vue'
import {
  stateClient,
  clearStateClient,
} from '../../ServicesClient/useVariablesClient'
import {
  statePointSale,
} from '../../ServicesPointSale/useVariablesPointSale'

export default {
  name: 'PointSaleClient',
  components: {
    BCard,
    BCardTitle,
    ButtonComponent,
    ModalQueryPartner,
    ModalSavePartner,
  },
  computed: {
    ...mapState('boxSession', ['boxSession']),
  },
  setup() {
    const partnerSelected = ({
      _id,
      nombreDocumento,
      numeroDocumento,
      apellidoPaterno,
      apellidoMaterno,
      nombres,
      numeroRuc,
      razonSocial,
      nombreUbigeo,
      direccion,
      telefono,
      correo,
    }) => {
      if (_id) {
        stateClient.value._id = _id
        statePointSale.value.idSocio = _id
      }
      if (nombreDocumento) stateClient.value.nombreDocumento = nombreDocumento
      if (numeroDocumento) stateClient.value.numeroDocumento = numeroDocumento
      if (apellidoPaterno || apellidoMaterno || nombres) stateClient.value.nombres = `${apellidoPaterno} ${apellidoMaterno} ${nombres}`
      if (numeroRuc) stateClient.value.numeroRuc = numeroRuc
      if (razonSocial) stateClient.value.razonSocial = razonSocial
      if (nombreUbigeo) stateClient.value.nombreUbigeo = nombreUbigeo
      if (direccion) stateClient.value.direccion = direccion
      if (telefono) stateClient.value.telefono = telefono
      if (correo) stateClient.value.correo = correo
    }
    return {
      partnerSelected,
      stateClient,
      clearStateClient,
      statePointSale,
    }
  },
}
</script>
