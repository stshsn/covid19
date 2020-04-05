<template>
  <div class="WhatsNew">
    <h3 class="WhatsNew-heading">
      <v-icon size="24" class="WhatsNew-heading-icon">
        mdi-information
      </v-icon>
      {{ $t('福井新聞者の速報（RSS）') }}
    </h3>
    <ul class="WhatsNew-list">
      <li
        v-for="(item, i) in info.slice(0, 3)"
        :key="i"
        class="WhatsNew-list-item"
      >
        <a
          class="WhatsNew-list-item-anchor"
          :href="item.link"
          target="_blank"
          rel="noopener"
        >
          <time
            class="WhatsNew-list-item-anchor-time px-2"
            :datetime="item.datetime"
          >
            {{ item.datetime }}
          </time>
          <span class="WhatsNew-list-item-anchor-link">
            {{ item.title }}
            <v-icon
              v-if="!isInternalLink(item.link)"
              class="WhatsNew-item-ExternalLinkIcon"
              size="12"
            >
              mdi-open-in-new
            </v-icon>
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { parseString } from 'xml2js'
import Vue from 'vue'
import moment from 'moment'
import { convertDateToISO8601Format } from '@/utils/formatDate'

export default Vue.extend({
  data() {
    return {
      info: []
    }
  },
  async mounted() {
    try {
      const res = await axios.get('/fukuishimbun/list/feed/rss')
      const xml = res.data
      parseString(xml, (_, xmlres: any) => {
        this.info = xmlres.rss.channel[0].item
          .map((i: any) => {
            return {
              title: i.title[0],
              link: i.link[0],
              datetime: moment(i.pubDate[0]).format('YYYY/MM/DD HH:mm')
            }
          })
          .filter((i: any) => {
            return (
              i.title.includes('感染') ||
              i.title.includes('コロナ') ||
              i.title.includes('休業') ||
              i.title.includes('休館')
            )
          })
      })
    } catch (error) {
      this.info = []
    }
  },
  methods: {
    isInternalLink(path: string): boolean {
      return !/^https?:\/\//.test(path)
    },
    formattedDate(dateString: string) {
      return convertDateToISO8601Format(dateString)
    }
  }
})
</script>

<style lang="scss">
.WhatsNew {
  @include card-container();

  padding: 10px;
  margin-bottom: 20px;
}

.WhatsNew-heading {
  display: flex;
  align-items: center;

  @include card-h2();

  margin-bottom: 12px;
  color: $gray-2;
  margin-left: 12px;

  &-icon {
    margin: 10px;
  }

  &-link {
    font-size: 12px;
  }
}

.WhatsNew .WhatsNew-list {
  padding-left: 0;
  list-style-type: none;

  &-item {
    &-anchor {
      display: inline-block;
      text-decoration: none;
      margin: 5px;
      font-size: 14px;

      @include lessThan($medium) {
        display: flex;
        flex-wrap: wrap;
      }

      &-time {
        flex: 0 0 90px;

        @include lessThan($medium) {
          flex: 0 0 100%;
        }

        color: $gray-1;
      }

      &-link {
        flex: 0 1 auto;

        @include text-link();

        @include lessThan($medium) {
          padding-left: 8px;
        }
      }

      &-ExternalLinkIcon {
        margin-left: 2px;
        color: $gray-3 !important;
      }
    }
  }
}
</style>
