<template>
  <div class="MainPage">
    <div class="Header mb-3">
      <page-header :icon="headerItem.icon">
        {{ headerItem.title }}
      </page-header>
      <div class="UpdatedAt">
        <span>{{ $t('最終更新') }} </span>
        <time :datetime="updatedAt">{{ Data.lastUpdate }}</time>
      </div>
      <div v-if="!['ja', 'ja-basic'].includes($i18n.locale)" class="Annotation">
        <span>{{ $t('注釈') }} </span>
      </div>
    </div>
    <breaking-news class="mb-4" />
    <whats-new class="mb-4" :items="newsItems" />
    <whats-new-japan class="mb-4" :items="japanItems" />
    <static-info
      class="mb-4"
      :url="$t('https://www.pref.fukui.lg.jp/doc/kenkou/kansensyo-yobousessyu/corona.html')"
      target="_blank"
      :text="$t('自分や家族の症状に不安や心配があればまずは確認を')"
      :btn-text="$t('福井県公式サイトへ')"
    />
    <v-row class="DataBlock">
      <youtube-card />
      <confirmed-cases-details-card />
      <confirmed-cases-attributes-card />
      <inspection-persons-number-card />
      <!-- <pcr-inspection-reports-number-card /> -->
      <hospital-beds-number-card />
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import PageHeader from '@/components/PageHeader.vue'
// 速報
import BreakingNews from '@/components/BreakingNews.vue'
import WhatsNew from '@/components/WhatsNew.vue'
import WhatsNewJapan from '@/components/WhatsNewJapan.vue'
import StaticInfo from '@/components/StaticInfo.vue'
import Data from '@/data/data.json'
import News from '@/data/news.json'
import JapanNews from '@/data/japan.json'
// 陽性患者数
// import ConfirmedCasesNumberCard from '@/components/cards/ConfirmedCasesNumberCard.vue'
// 陽性患者の属性
import ConfirmedCasesAttributesCard from '@/components/cards/ConfirmedCasesAttributesCard.vue'
// 検査陽性者の状況
import ConfirmedCasesDetailsCard from '@/components/cards/ConfirmedCasesDetailsCard.vue'
// 検査実施人数
import InspectionPersonsNumberCard from '@/components/cards/InspectionPersonsNumberCard.vue'
// 新型コロナ受診相談窓口相談件数（累計）
import PcrInspectionReportsNumberCard from '@/components/cards/PcrInspectionReportsNumberCard.vue'

// 病床数
import HospitalBedsNumberCard from '@/components/cards/HospitalBedsNumberCard.vue'
// Youtube
import YoutubeCard from '@/components/cards/YoutubeCard.vue'

// import TestedCasesDetailsCard from '@/components/cards/TestedCasesDetailsCard.vue'

// import TestedNumberCard from '@/components/cards/TestedNumberCard.vue'
// import ConsultationDeskReportsNumberCard from '@/components/cards/ConsultationDeskReportsNumberCard.vue'
// import MetroCard from '@/components/cards/MetroCard.vue'
// import AgencyCard from '@/components/cards/AgencyCard.vue'
import { convertDatetimeToISO8601Format } from '@/utils/formatDate'

export default Vue.extend({
  components: {
    PageHeader,
    BreakingNews,
    WhatsNew,
    WhatsNewJapan,
    StaticInfo,
    // ConfirmedCasesNumberCard,
    ConfirmedCasesDetailsCard,
    InspectionPersonsNumberCard,
    PcrInspectionReportsNumberCard,
    // TestedCasesDetailsCard,
    ConfirmedCasesAttributesCard,
    HospitalBedsNumberCard,
    YoutubeCard,
    // TestedNumberCard,
    // ConsultationDeskReportsNumberCard,
    // MetroCard,
    // AgencyCard
  },
  data() {
    const data = {
      Data,
      headerItem: {
        icon: 'mdi-chart-timeline-variant',
        title: this.$t('福井県内の最新感染動向')
      },
      newsItems: News.newsItems,
      japanItems: JapanNews.japanItems
    }
    return data
  },
  computed: {
    updatedAt() {
      return convertDatetimeToISO8601Format(this.$data.Data.lastUpdate)
    }
  },
  head(): MetaInfo {
    return {
      title: this.$t('福井県内の最新感染動向') as string
    }
  }
})
</script>

<style lang="scss" scoped>
.MainPage {
  .Header {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;

    @include lessThan($small) {
      flex-direction: column;
      align-items: baseline;
    }
  }

  .UpdatedAt {
    @include font-size(14);

    color: $gray-3;
    margin-bottom: 0.2rem;
  }

  .Annotation {
    @include font-size(12);

    color: $gray-3;
    @include largerThan($small) {
      margin: 0 0 0 auto;
    }
  }
  .DataBlock {
    margin: 20px -8px;

    .DataCard {
      @include largerThan($medium) {
        padding: 10px;
      }

      @include lessThan($small) {
        padding: 4px 8px;
      }
    }
  }
}
</style>
