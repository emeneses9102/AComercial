<template>
  <b-row class="mb-1">
    <b-col
      cols="12"
      lg="4"
    >
      <b-form-group
        label="Campo"
        label-for="header-search-field"
      >
        <vue-select
          id="field"
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
        label-for="header-search-value"
      >
        <b-form-input
          id="header-search-value"
          v-model="searchValue"
          @keyup="searchForValue"
        />
      </b-form-group>
    </b-col>
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
