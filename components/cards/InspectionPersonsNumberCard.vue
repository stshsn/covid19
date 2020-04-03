<template>
  <v-col cols="12" md="6" class="DataCard">
    <time-stacked-bar-chart
      :title="$t('検査実施人数')"
      :title-id="'number-of-inspection-persons'"
      :chart-id="'number-of-inspection-persons'"
      :chart-data="inspectionsGraph"
      :date="InspectionPersons.date"
      :unit="$t('人')"
      :items="inspectionsItems"
      :labels="inspectionsLabels"
      :data-labels="inspectionsItems"
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
import TimeStackedBarChart from '@/components/TimeStackedBarChart.vue'
import InspectionPersons from '@/data/inspection_persons.json'

export default {
  components: {
    TimeStackedBarChart
  },
  data() {
    // 検査実施週別状況
    const inspectionsGraph = [
      InspectionPersons.data['県内']
    ]
    const inspectionsItems = [
      this.$t('県内')
    ]
    const inspectionsLabels = InspectionPersons.labels
    const data = {
      InspectionPersons,
      inspectionsGraph,
      inspectionsItems,
      inspectionsLabels
    }
    return data
  }
}
</script>
