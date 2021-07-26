<template>
  <b-row class="mb-1">
    <slot name="before" />
    <b-col
      cols="12"
      lg="4"
    >
      <b-form-group
        label="Campo"
        :label-for="`${id}-field`"
      >
        <vue-select
          :id="`${id}-field`"
          v-model="searchField"
          :reduce="option => option.field"
          label="title"
          :options="columnsFilter"
          :clearable="false"
          @option:selected="changeField"
        />
      </b-form-group>
    </b-col>
    <b-col
      cols="12"
      lg="8"
    >
      <b-form-group
        label="Valor"
        :label-for="`${id}-value`"
      >
        <b-form-input
          :id="`${id}-value`"
          v-model="searchValue"
          @keyup="searchForValue"
        />
      </b-form-group>
    </b-col>
    <slot name="after" />
  </b-row>
</template>

<script>
import {
  BRow, BCol, BFormGroup, BFormInput,
} from 'bootstrap-vue'
import { VueSelect } from 'vue-select'
import { ref } from '@vue/composition-api'

export default {
  name: 'HeaderSearchDetailComponent',
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    VueSelect,
  },
  props: {
    id: {
      type: String,
      required: false,
      default: 'header-search',
    },
    columnsFilter: {
      type: Array,
      required: true,
      default: () => [],
    },
    columnFilterSelectedDefault: {
      type: String,
      required: true,
      default: () => '',
    },
  },
  setup(props, context) {
    const searchField = ref(props.columnFilterSelectedDefault)
    const searchValue = ref('')

    const changeField = async () => {
      context.emit('on-change-field', searchField.value, searchValue.value)
    }

    const searchForValue = async () => {
      context.emit('on-search-for-value', searchField.value, searchValue.value)
    }

    return {
      searchField,
      searchValue,
      searchForValue,
      changeField,
    }
  },
}
</script>

<style>

</style>
