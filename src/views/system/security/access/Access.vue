<template>
  <b-card>
    <table-access />
  </b-card>
</template>

<script>
import { BCard } from 'bootstrap-vue'
import TableAccess from './TableAccess/TableAccess.vue'

export default {
  name: 'Access',
  components: {
    BCard,
    TableAccess,
  },
}
</script>
