<template>
  <fieldset class="fieldset-component">
    <legend class="fieldset-component__legend">
      {{ legend }}
    </legend>
    <div
      ref="fieldset-component__body"
      class="fieldset-component__body"
      :style="initialHieghtBody"
    >
      <slot />
    </div>
    <div
      v-if="collapse === 'collapse' || collapse === 'show'"
      class="fieldset-component__button"
      @click="collapseBody"
    >
      <feather-icon
        icon="MinusIcon"
        size="20"
      />
    </div>
  </fieldset>
</template>

<script>
export default {
  name: 'FieldSetComponent',
  props: {
    // Texto a mostrar como leyenda
    legend: {
      type: String,
      required: true,
      default: '',
    },
    // Si quiere un efecto mostrar || ocultar, debera pasar esta prop con el valor de show o collapse
    collapse: {
      type: String,
      required: false,
      default: '',
    },
  },
  computed: {
    // Verificar si la prop collapse tiene el valor colapse
    initialHieghtBody() {
      if (this.collapse === 'collapse') {
        return 'height: 0px; transform: scaleY(0);'
      }
      return ''
    },
  },
  methods: {
    // Método para mostrar u ocultar el body
    collapseBody() {
      if (getComputedStyle(this.$refs['fieldset-component__body']).height === '0px' || getComputedStyle(this.$refs['fieldset-component__body']).height === '') {
        this.$refs['fieldset-component__body'].style.height = `${this.$refs['fieldset-component__body'].scrollHeight}px`
        this.$refs['fieldset-component__body'].style.transform = 'scaleY(1)'
        setTimeout(() => {
          this.$refs['fieldset-component__body'].removeAttribute('style')
        }, 1000)
      } else {
        this.$refs['fieldset-component__body'].style.height = `${this.$refs['fieldset-component__body'].scrollHeight}px`
        setTimeout(() => {
          this.$refs['fieldset-component__body'].style.height = '0px'
          this.$refs['fieldset-component__body'].style.transform = 'scaleY(0)'
        }, 10)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.fieldset-component {
  position: relative;
  border: 1px solid darken($color: #ebe9f1, $amount: 10%);
  padding: 1em 1.5em;
  border-radius: .25em;

  .dark-layout & {
    border: 1px solid lighten($color: #3b4253, $amount: 10%);
  }

  &__legend {
    display: block;
    padding-left: .5em;
    padding-right: 1em;
    width: auto;
    font-size: 1rem;
    line-height: inherit;
    color: inherit;
  }

  &__body {
    // overflow: hidden;
    transform-origin: top center;
    transition: height .3s ease-in-out, transform .3s ease-in-out;
  }

  &__button {
    width: 28px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: .25em;
    background-color: #f8f8f8;
    position: absolute;
    right: 20px;
    top: -26px;
    cursor: pointer;

    .dark-layout & {
      background-color: #3b4253;
    }
  }
}
</style>
