<template>
  <b-card>
    <b-row class="pb-50">

      <!-- text and button -->
      <b-col
        sm="6"
        order-sm="1"
        order="2"
        class="d-flex justify-content-between flex-column mt-1 mt-sm-0"
      >
        <div>
          <h2 class="font-weight-bolder mb-25">
            {{ kFormatter('21203.23') }}
          </h2>
          <b-card-text class="font-weight-bold mb-2">
            Documentos Generados
          </b-card-text>

          <h5 class="font-medium-2">
            <span class="text-success mr-50">+5.2%</span>
            <span>vs los últimos 7 días</span>
          </h5>
        </div>

        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          class="shadow"
        >
          <span>Ver detalles </span>
          <feather-icon icon="ChevronsRightIcon" />
        </b-button>
      </b-col>

      <!-- dropdown and chart -->
      <b-col
        sm="6"
        cols="12"
        order-sm="2"
        order="1"
        class="d-flex justify-content-between flex-column text-right"
      >
        <div>
          <b-dropdown
            text="Ultimos 7 días"
            variant="transparent"
            class="chart-dropdown"
            left
            no-caret
            size="sm"
          >
            <b-dropdown-item
              v-for="day in ['Ultimos 7 días', 'Ultimo mes']"
              :key="day"
            >
              {{ day }}
            </b-dropdown-item>
          </b-dropdown>
        </div>

        <!-- apex chart -->
        <vue-apex-charts
          type="bar"
          height="200"
          :options="salesBar.chartOptions"
          :series="[{
            name: 'Documentos',
            data: [20,40,60,20],
          }]"
        />
      </b-col>
    </b-row>
    <hr>

    <!-- progress bar -->
    <b-row class="avg-sessions pt-50">
      <b-col
        cols="6"
        class="mb-2"
      >
        <b-card-text class="mb-50">
          Boletas: 200
        </b-card-text>
        <b-progress
          value="250"
          height="6px"
        />
      </b-col>
      <b-col
        cols="6"
        class="mb-2"
      >
        <b-card-text class="mb-50">
          Facturas: 100
        </b-card-text>
        <b-progress
          value="100"
          max="100"
          height="6px"
          variant="warning"
        />
      </b-col>
      <b-col cols="6">
        <b-card-text class="mb-50">
          Notas de débito: 20
        </b-card-text>
        <b-progress
          value="20"
          max="100"
          height="6px"
          variant="danger"
          class="mt-25"
        />
      </b-col>
      <b-col cols="6">
        <b-card-text class="mb-50">
          Notas de crédito: 10
        </b-card-text>
        <b-progress
          value="10"
          max="100"
          variant="success"
          height="6px"
          class="mt-25"
        />
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard, BRow, BCol, BButton, BDropdown, BDropdownItem, BProgress, BCardText,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import Ripple from 'vue-ripple-directive'
import { $themeColors } from '@themeConfig'
import { kFormatter } from '@core/utils/filter'

export default {
  components: {
    VueApexCharts,
    BCard,
    BRow,
    BCol,
    BButton,
    BCardText,
    BDropdown,
    BDropdownItem,
    BProgress,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      salesBar: {
        chartOptions: {
          chart: {
            sparkline: { enabled: true },
            toolbar: { show: false },
          },
          grid: {
            show: false,
            padding: {
              left: 0,
              right: 0,
            },
          },
          states: {
            hover: {
              filter: 'none',
            },
          },
          colors: [
            '#ebf0f7',
            '#ebf0f7',
            $themeColors.primary,
            '#ebf0f7',
            '#ebf0f7',
            '#ebf0f7',
          ],
          plotOptions: {
            bar: {
              columnWidth: '45%',
              distributed: true,
              endingShape: 'rounded',
            },
          },
          tooltip: {
            x: { show: false },
          },
          xaxis: {
            type: 'numeric',
          },
        },
      },
    }
  },
  methods: {
    kFormatter,
  },
}
</script>
