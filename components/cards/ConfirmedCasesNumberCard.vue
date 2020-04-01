<template>
  <v-col cols="12" md="6" class="DataCard">
    <time-bar-chart
      :title="$t('陽性患者数')"
      :title-id="'number-of-confirmed-cases'"
      :chart-id="'time-bar-chart-patients'"
      :chart-data="patientsGraph"
      :date="patientsSummaryDate"
      :unit="$t('人')"
      :url="'https://www.pref.fukui.lg.jp/doc/kenkou/kansensyo-yobousessyu/corona.html'"
    />
  </v-col>
</template>
  
<script>
import PatientsSummary from '@/data/patients_summary.json'
import formatGraph from '@/utils/formatGraph'
import TimeBarChart from '@/components/TimeBarChart.vue'

export default {
  components: {
    TimeBarChart
  },
  data() {
    // 感染者数グラフ
    const patientsGraph = formatGraph(PatientsSummary.data)
    const patientsSummaryDate = new Date(PatientsSummary.date).toLocaleString()
    const data = {
      patientsSummaryDate,
      patientsGraph
    }
    return data
  }
}
</script>
