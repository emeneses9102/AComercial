<template>
  <b-card class="pointsale-client">
    <b-card-title>Cliente</b-card-title>
    <div class="card__group">
      <label class="card__label">N° Documento :</label>
      <p class="card__input">
        70267008
      </p>
    </div>
    <div class="card__group">
      <label class="card__label">Nombres :</label>
      <p class="card__input">
        Jhostin Estefano Osorio Macazana
      </p>
    </div>
    <div class="card__group">
      <label class="card__label">Dirección :</label>
      <p class="card__input">
        Pasaje San Jose S/N
      </p>
    </div>
    <div class="card__group">
      <label class="card__label">Teléfono :</label>
      <p class="card__input">
        938329877
      </p>
    </div>
    <div class="card__group">
      <label class="card__label">Correo Electrónico :</label>
      <p class="card__input">
        jhostineosorio@gmail.com
      </p>
    </div>
    <div class="d-flex flex-wrap justify-content-between mt-4 mb-1">
      <button-component
        margin-class="mr-1"
        icon-button="SearchIcon"
        icon-size="20"
        title-tool-tip="Buscar Cliente"
      />
      <button-component
        margin-class="mr-1"
        icon-button="UserPlusIcon"
        icon-size="20"
        title-tool-tip="Registrar Cliente"
      />
      <button-component
        margin-class=""
        icon-button="UserXIcon"
        icon-size="20"
        title-tool-tip="Retirar Cliente"
      />
    </div>
  </b-card>
</template>

<script>
import {
  BCard, BCardTitle,
} from 'bootstrap-vue'
import ButtonComponent from '@/components/ButtonComponent/ButtonComponent.vue'

export default {
  name: 'PointSaleClient',
  components: {
    BCard,
    BCardTitle,
    ButtonComponent,
  },
}
</script>
