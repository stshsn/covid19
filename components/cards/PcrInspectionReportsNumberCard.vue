<template>
  <v-col cols="12" md="6" class="DataCard">
    <time-bar-chart
      :title="$t('PCR検査実施件数（累計）')"
      :title-id="'pcr-inspection-reports-number-card'"
      :chart-id="'pcr-inspection-reports-number-card'"
      :chart-data="pcrGraph"
      :date="Data.pcr.date"
      :unit="$t('件.reports')"
      :url="'https://www.city.fukui.lg.jp/fukusi/iryou/kensen/p021907.html'"
    />
    <!-- 件.reports = 窓口相談件数 -->
  </v-col>
</template>

<script>
import Data from '@/covid19_fukui/covid19_fukui.json'
import formatGraph from '@/utils/formatGraph'
import TimeBarChart from '@/components/TimeBarChart.vue'

export default {
  components: {
    TimeBarChart
  },
  data() {
    // pcr検査件数
    const pcrGraph = formatGraph(Data.pcr.data)

    const data = {
      Data,
      pcrGraph
    }
    return data
  }
}
</script>
