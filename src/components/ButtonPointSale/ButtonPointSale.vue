<template>
  <div class="d-flex justify-content-between align-items-center mb-1">
    <div>
      <button-component-point-sale
        variant="secondary"
        :icon-button="icon"
        :method-function="openSearch"
        :responsive="true"
        class="btn-cuadrado"
      />
    </div>
  </div>
</template>

<script>

import ButtonComponentPointSale from '../ButtonComponentPointSale/ButtonComponentPointSale.vue'

export default {
  name: 'HeaderMaintenanceComponent',
  components: {
    ButtonComponentPointSale,
  },
  props: {
    modalId: {
      type: String,
      required: true,
      default: 'UserCheckIcon',
    },
    icon: {
      type: String,
      required: true,
      default: '',
    },
    clearModal: {
      type: Function,
      required: true,
      default: () => {},
    },
    exportData: {
      type: Object,
      required: false,
      default: () => ({
        title: '',
        subtitle: '',
        url: '',
        serverQuery: {},
        columns: [],
        optionsColumnsFilter: [],
      }),
    },
    functionOpenModal: {
      type: Function,
      required: false,
      default: null,
    },
    optionNew: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  methods: {
    openSearch() {
      this.$bvModal.show(`${this.modalId}-search`)
    },
  },
}
</script>
