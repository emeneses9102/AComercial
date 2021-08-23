<template>
  <b-card class="pointsale-board-numeric">
    <button-board-numeric
      text="7"
    />
    <button-board-numeric
      text="8"
    />
    <button-board-numeric
      text="9"
    />
    <button-board-numeric
      text="⇽"
    />
    <button-board-numeric
      text="4"
    />
    <button-board-numeric
      text="5"
    />
    <button-board-numeric
      text="6"
    />
    <button-board-numeric
      class="btn-board-numeric--key active"
      text="C"
    />
    <button-board-numeric
      text="1"
    />
    <button-board-numeric
      text="2"
    />
    <button-board-numeric
      text="3"
    />
    <button-board-numeric
      class="btn-board-numeric--enter"
      text="↲"
    />
    <button-board-numeric
      class="btn-board-numeric--zero"
      text="0"
    />
    <button-board-numeric
      class="btn-board-numeric--key"
      text="P"
    />
  </b-card>
</template>

<script>
import {
  BCard,
} from 'bootstrap-vue'
import ButtonBoardNumeric from './ButtonBoardNumeric.vue'

export default {
  name: 'PointSaleBoardNumeric',
  components: {
    BCard,
    ButtonBoardNumeric,
  },
}
</script>
