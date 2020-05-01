<template>
  <v-col cols="12" md="6" class="DataCard">
    <time-mixed-chart
      :title="$t('入院患者数')"
      :title-id="'number-of-hospitalized-patients'"
      :chart-id="'time-bar-chart-hospitalized-patients'"
      :chart-data="hospitalizedPatientsGraph"
      :is-enable-button="false"
      :force-data-kind="'cumulative'"
      :date="updatedAt"
      :unit="$t('人')"
      :url="'https://www.pref.fukui.lg.jp/doc/toukei-jouhou/covid-19.html'"
    >
      <template v-slot:description>
        <ul>
          <li>
            {{ $t('(注)１日あたりの入退院件数を表しています') }} <br />
            {{
              $t(
                '(注)入退院件数 = 入院件数 - 退院件数 - 死亡件数 と計算しています'
              )
            }}
            <br />
            {{
              $t(
                '(注)青グラフの場合、入院者数が１日の退院者数を上回っている。'
              )
            }}<br />
            {{
              $t(
                '(注)赤グラフの場合、退院者数が１日の入院者数を上回っていることを示しています'
              )
            }}
          </li>
        </ul>
      </template>
    </time-mixed-chart>
  </v-col>
</template>

<script>
import HospitalizedPatients from '@/data/hospitalized_patients.json'
import formatMixedGraph from '@/utils/formatMixedGraph'
import { getCommonStyleDateString } from '@/utils/formatDate'
import TimeMixedChart from '@/components/TimeMixedChart.vue'

export default {
  components: {
    TimeMixedChart
  },
  data() {
    return {
      updatedAt: getCommonStyleDateString(HospitalizedPatients.date),
      // 感染者数グラフ
      hospitalizedPatientsGraph: formatMixedGraph(HospitalizedPatients.data)
    }
  }
}
</script>
