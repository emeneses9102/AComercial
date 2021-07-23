<template>
  <section id="dashboard-analytics">
    <b-row class="match-height">
      <b-col
        lg="6"
        md="12"
      >
        <analytics-congratulation />
      </b-col>

      <b-col
        lg="3"
        sm="6"
      >
        <statistic-card-with-area-chart
          icon="UsersIcon"
          :statistic="kFormatter('2503.12')"
          statistic-title="Ventas generadas"
          :chart-data="[{
            name: 'Porcentaje %',
            data: [40, 80, 69, 91]
          }]"
        />
      </b-col>

      <b-col
        lg="3"
        sm="6"
      >
        <statistic-card-with-area-chart
          icon="PackageIcon"
          color="warning"
          :statistic="kFormatter('1893.20')"
          statistic-title="Productos vendidos"
          :chart-data="[{
            name: 'Porcentaje %',
            data: [45, 68, 70, 99]
          }]"
        />
      </b-col>
    </b-row>

    <b-row class="match-height">
      <b-col lg="6">
        <analytics-avg-sessions />
      </b-col>
      <b-col lg="6">
        <analytics-support-tracker />
      </b-col>
    </b-row>

  </section>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import StatisticCardWithAreaChart from '@core/components/statistics-cards/StatisticCardWithAreaChart.vue'
import { kFormatter } from '@core/utils/filter'
import AnalyticsCongratulation from './AnalyticsCongratulation.vue'
import AnalyticsAvgSessions from './AnalyticsAvgSessions.vue'
import AnalyticsSupportTracker from './AnalyticsSupportTracker.vue'

export default {
  components: {
    BRow,
    BCol,
    AnalyticsCongratulation,
    StatisticCardWithAreaChart,
    AnalyticsAvgSessions,
    AnalyticsSupportTracker,
  },
  methods: {
    kFormatter,
  },
}
</script>
