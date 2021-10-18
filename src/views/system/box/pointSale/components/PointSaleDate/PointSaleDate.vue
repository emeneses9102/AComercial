<template>
  <div>
    <p
      class="text-right m-0"
      style="font-size:12px"
    >
      {{ day + ' '+month + ' ' + year }}</p>
    <p
      class="font-weight-bolder h1 text-right"
      style="font-size:2.5em"
    >
      <b>{{ hour + ':' + minutes }}</b>
    </p>
  </div>
</template>

<script>

export default {
  name: 'PointSaleDate',
  data() {
    return {
      hour: '',
      minutes: '',
      seconds: '',
      day: '',
      month: '',
      year: '',
      meses: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SET', 'OCT', 'NOV', 'DIC'],
    }
  },
  created() {
    this.actualizarTiempo()
    this.mostrarFecha()
  },
  methods: {
    actualizarTiempo() {
      setInterval(() => {
        const date = new Date(Date.now())
        this.hour = date.getHours()
        this.minutes = date.getMinutes()
        this.seconds = date.getSeconds()

        this.minutes = this.minutes > 9 ? this.minutes : `0${this.minutes.toString()}`
        this.seconds = this.seconds > 9 ? this.seconds : `0${this.seconds.toString()}`
      }, 100)
    },
    mostrarFecha() {
      const date = new Date(Date.now())
      this.day = date.getDate()
      this.day = this.day.toString().length <= 1 ? `0${this.day.toString()}` : this.day
      this.month = this.meses[date.getMonth()]
      this.year = date.getFullYear().toString().substring(2, 4)
    },
  },
}
</script>

<style>

</style>
