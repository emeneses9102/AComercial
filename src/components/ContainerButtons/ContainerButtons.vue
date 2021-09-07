<template>
  <div class="d-flex justify-content-between align-items-center mb-1">
    <div class="d-flex align-items-center left">
      <button-component-point-sale
        variant="secondary"
        :icon-button="icon"
        :method-function="openModal"
        :responsive="true"
        class="btn-cuadrado"
      />
    </div>
  </div>
</template>

<script>
import ButtonComponentPointSale from '../ButtonComponentPointSale/ButtonComponentPointSale.vue'

export default {
  name: 'ContainerButtons',
  components: {
    ButtonComponentPointSale,
  },
  props: {
    modalId: {
      type: String,
      required: true,
      default: '',
    },
    icon: {
      type: String,
      required: true,
      default: '',
    },
    clearModal: {
      type: Function,
      required: false,
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
    openModal() {
      if (this.functionOpenModal) {
        this.functionOpenModal()
      } else {
        this.clearModal()
        this.$bvModal.show(this.modalId)
      }
    },
    openSearch() {
      this.$bvModal.show(`${this.modalId}-component`)
    },
  },
}
</script>
