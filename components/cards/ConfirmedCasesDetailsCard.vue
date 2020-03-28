<template>
  <v-col cols="12" md="6" class="DataCard">
    <confirmed-cases-card
      :title="$t('検査陽性者の状況')"
      :title-id="'details-of-confirmed-cases'"
      :date="InspectionsSummary.date"
    >
      <confirmed-cases-table
        :aria-label="$t('検査陽性者の状況')"
        v-bind="confirmedCases"
      />
    </confirmed-cases-card>
  </v-col>
</template>

<script>
import InspectionsSummary from '@/covid19_fukui/inspection_summary.json'
import formatConfirmedCases from '@/utils/formatConfirmedCases'
import ConfirmedCasesCard from '@/components/ConfirmedCasesCard.vue'
import ConfirmedCasesTable from '@/components/ConfirmedCasesTable.vue'

export default {
  components: {
    ConfirmedCasesCard,
    ConfirmedCasesTable
  },
  data() {
    // 検査陽性者の状況
    const confirmedCases = formatConfirmedCases(InspectionsSummary)

    const data = {
      InspectionsSummary,
      confirmedCases
    }
    return data
  }
}
</script>
