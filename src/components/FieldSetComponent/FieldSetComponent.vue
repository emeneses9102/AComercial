<template>
  <fieldset class="fieldset-component">
    <legend class="fieldset-component__legend">
      {{ legend }}
    </legend>
    <div
      ref="fieldset-component__body"
      class="fieldset-component__body"
      :class="[collapse === 'collapse' ? 'collapse-fieldset' : '']"
      :style="{ height: collapse === 'collapse' ? '0px' : '', transform: collapse === 'collapse' ? 'scaleY(0)' : ''}"
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
      default: 'show',
    },
  },
  data() {
    return {
      interval: null,
    }
  },
  methods: {
    // Método para mostrar u ocultar el body
    collapseBody() {
      if (this.$refs['fieldset-component__body'].classList.contains('collapse-fieldset')) {
        this.$refs['fieldset-component__body'].style.height = `${this.$refs['fieldset-component__body'].scrollHeight}px`
        this.$refs['fieldset-component__body'].style.transform = 'scaleY(1)'
        this.$refs['fieldset-component__body'].classList.remove('collapse-fieldset')
        this.interval = setTimeout(() => {
          this.$refs['fieldset-component__body'].removeAttribute('style')
        }, 300)
      } else {
        this.$refs['fieldset-component__body'].style.height = `${this.$refs['fieldset-component__body'].scrollHeight}px`
        setTimeout(() => {
          this.$refs['fieldset-component__body'].classList.add('collapse-fieldset')
          clearInterval(this.interval)
          this.$refs['fieldset-component__body'].style.height = '0px'
          this.$refs['fieldset-component__body'].style.transform = 'scaleY(0)'
        }, 1)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.fieldset-component {
  position: relative;
  border: 1px solid darken($color: #ebe9f1, $amount: 20%);
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
    color: #222;

    .dark-layout & {
      color: inherit;
    }
  }

  &__body {
    transform-origin: top center;
    transition: height .3s ease-in-out, transform .3s ease-in-out;
  }

  &__button {
    width: 32px;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: .25em;
    background-color: #e8e8e8;
    position: absolute;
    right: 20px;
    top: -26px;
    cursor: pointer;
    user-select: none;

    .dark-layout & {
      background-color: #3b4253;
    }
  }
}
</style>
