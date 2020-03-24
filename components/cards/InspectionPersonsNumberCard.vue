<template>
  <v-col cols="12" md="6" class="DataCard">
    <time-stacked-bar-chart
      :title="$t('検査実施人数（累計）')"
      :title-id="'number-of-inspection-persons'"
      :chart-id="'number-of-inspection-persons'"
      :chart-data="inspectionsGraph"
      :date="Data.inspection_persons.date"
      :unit="$t('人')"
      :items="inspectionsItems"
      :labels="inspectionsLabels"
    >
      <template v-slot:description>
        <ul>
          <li>
            {{ $t('（注）同一の対象者について複数の検体を調査する場合あり') }}
          </li>
        </ul>
      </template>
    </time-stacked-bar-chart>
  </v-col>
</template>

<script>
// import Data from '@/data/data.json'
import TimeStackedBarChart from '@/components/TimeStackedBarChart.vue'
import Data from '@/covid19_fukui/covid19_fukui.json'

export default {
  components: {
    TimeStackedBarChart
  },
  data() {
    // 検査実施日別状況
    const inspectionsGraph = [
      Data.inspection_persons.data['県内']
    ]
    const inspectionsItems = [
      this.$t('県内')
    ]
    const inspectionsLabels = Data.inspection_persons.labels
    const data = {
      Data,
      inspectionsGraph,
      inspectionsItems,
      inspectionsLabels
    }
    return data
  }
}
</script>
