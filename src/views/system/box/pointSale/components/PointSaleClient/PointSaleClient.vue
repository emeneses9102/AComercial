<template>
  <b-card class="pointsale-client">
    <b-card-title
      class="title-client"
    >
      <b>Cliente</b>
    </b-card-title>
    <div class="card__group">
      <label class="card__label h5">Tipo Documento :</label>
      <p class="card__input">
        {{ stateClient.nombreDocumento }}
      </p>
    </div>
    <div class="card__group">
      <label class="card__label h5">N° Documento :</label>
      <p class="card__input">
        {{ stateClient.numeroDocumento }}
      </p>
    </div>
    <div class="card__group">
      <label class="card__label h5">Nombres :</label>
      <p class="card__input">
        {{ stateClient.nombres }}
      </p>
    </div>
    <div class="card__group">
      <label class="card__label h5">Dirección :</label>
      <p class="card__input">
        {{ stateClient.direccion }}
      </p>
    </div>
    <div class="card__group">
      <label class="card__label h5">Teléfono :</label>
      <p class="card__input">
        {{ stateClient.telefono }}
      </p>
    </div>
    <div class="card__group">
      <label class="card__label h5">Correo Electrónico :</label>
      <p class="card__input">
        {{ stateClient.correo }}
      </p>
    </div>
    <div class="d-flex flex-wrap justify-content-between mt-4 mb-1 row">
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
import ModalQueryPartner from '@/components/ModalQueryPartner/ModalQueryPartner.vue'
import ModalSavePartner from '@/views/system/maintenance/partner/ModalSavePartner/ModalSavePartner.vue'
import { stateClient, clearStateClient } from '../../ServicesPointSale/useVariablesPointSale'

export default {
  name: 'PointSaleClient',
  components: {
    BCard,
    BCardTitle,
    ModalQueryPartner,
    ModalSavePartner,
  },
  setup() {
    const partnerSelected = ({
      _id,
      nombreDocumento,
      numeroDocumento,
      apellidoPaterno,
      apellidoMaterno,
      nombres,
      direccion,
      telefono,
      correo,
    }) => {
      if (_id) stateClient.value._id = _id
      if (nombreDocumento) stateClient.value.nombreDocumento = nombreDocumento
      if (numeroDocumento) stateClient.value.numeroDocumento = numeroDocumento
      if (apellidoPaterno || apellidoMaterno || nombres) stateClient.value.nombres = `${apellidoPaterno} ${apellidoMaterno} ${nombres}`
      if (direccion) stateClient.value.direccion = direccion
      if (telefono) stateClient.value.telefono = telefono
      if (correo) stateClient.value.correo = correo
    }
    return {
      partnerSelected,
      stateClient,
      clearStateClient,
    }
  },
}
</script>
