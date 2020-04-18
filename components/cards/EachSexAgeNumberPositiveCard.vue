<template>
  <v-col cols="12" md="6" class="DataCard">
    <horizontal-bar-chart
      :title="$t('年代別の陽性患者数')"
      :title-id="'each-sex-age-number-positive'"
      :chart-id="'each-sex-age-number-positive'"
      :chart-data="patientsGraph"
      :date="patientsSummaryDate"
      :labels="graphLabels"
      :unit="$t('人')"
      :url="'https://www.pref.fukui.lg.jp/doc/toukei-jouhou/covid-19.html'"
    />
  </v-col>
</template>

<script>
import Patients from '@/data/patients.json'
import formatGraph from '@/utils/formatGraph'
import HorizontalBarChart from '@/components/HorizontalBarChart.vue'

export default {
  components: {
    HorizontalBarChart
  },
  data() {
    // 年代グラフラベル
    const graphLabels = [
      "90代", "80代", "70代", "60代", "50代", "40代", "30代", "20代", "10代", "10代未満"
    ]

    // 陽性患者の詳細
    const patientsGraph = Patients.data
    const patientsSummaryDate = new Date(Patients.date).toLocaleString()
    const data = {
      graphLabels,
      patientsSummaryDate,
      patientsGraph
    }
    return data
  }
}
</script>
