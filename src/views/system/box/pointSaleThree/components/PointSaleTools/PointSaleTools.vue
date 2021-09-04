<template>
  <b-card>
    <div class="d-flex justify-content-between">
      <b-card-title>Ticket N°</b-card-title>
      <b-card-title>20315</b-card-title>
    </div>
    <div class="mt-3 text-center">
      <button-component
        icon-button="AirplayIcon"
        icon-size="32"
      />
      <button-component
        icon-button="AirplayIcon"
        icon-size="32"
      />
      <button-component
        icon-button="AirplayIcon"
        icon-size="32"
      />
      <button-component
        icon-button="AirplayIcon"
        icon-size="32"
      />
      <button-component
        icon-button="AirplayIcon"
        icon-size="32"
      />
      <button-component
        icon-button="AirplayIcon"
        icon-size="32"
      />
      <button-component
        icon-button="AirplayIcon"
        icon-size="32"
      />
      <button-component
        icon-button="AirplayIcon"
        icon-size="32"
      />
      <button-component
        icon-button="AirplayIcon"
        icon-size="32"
      />
      <button-component
        icon-button="AirplayIcon"
        icon-size="32"
      />
      <button-component
        icon-button="AirplayIcon"
        icon-size="32"
      />
      <button-component
        icon-button="AirplayIcon"
        icon-size="32"
      />
      <button-component
        icon-button="AirplayIcon"
        icon-size="32"
      />
      <button-component
        icon-button="AirplayIcon"
        icon-size="32"
      />
      <button-component
        icon-button="GridIcon"
        icon-size="32"
        :method-function="()=>$bvModal.show('modal-query-article')"
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
  name: 'PointSaleTools',
  components: {
    BCard,
    BCardTitle,
    ButtonComponent,
  },
}
</script>
