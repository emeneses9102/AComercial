<template>
  <fieldset class="fieldset-component">
    <legend class="fieldset-component__legend">
      {{ legend }}
    </legend>
    <slot />
  </fieldset>
</template>

<script>
export default {
  name: 'FieldSetComponent',
  props: {
    legend: {
      type: String,
      required: true,
      default: '',
    },
  },
}
</script>

<style lang="scss" scoped>
.fieldset-component {
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
}
</style>
