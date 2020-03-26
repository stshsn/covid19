<template>
  <div class="WhatsNew">
    <h2 class="WhatsNew-heading breaking">
      <v-icon size="24" class="WhatsNew-heading-icon">
        mdi-information
      </v-icon>
      {{ $t('速報（2020年03月26日 更新）') }}
    </h2>
    <ul class="WhatsNew-list">
      <h3 class="breaking-content">
        
      </h3>
      <li class="WhatsNew-list-item">
        <time class="WhatsNew-list-item-anchor-time px-2">
          2020/03/26
        </time>
        <span>
          福井県内で4, 5例目となる新型コロナウイルス感染者が確認されました。詳細は <a target="_blank" href="https://www.pref.fukui.lg.jp/doc/kenkou/kansensyo-yobousessyu/corona_d/fil/200326.pdf">こちら</a> からご確認いただけます
        </span>
      </li><br/>
      <li class="WhatsNew-list-item">
        <time class="WhatsNew-list-item-anchor-time px-2">
          2020/03/25
        </time>
        <span>
          福井県内で2, 3例目となる新型コロナウイルス感染者が確認されました。詳細は <a target="_blank" href="https://www.pref.fukui.lg.jp/doc/kenkou/kansensyo-yobousessyu/corona_d/fil/200325.pdf">こちら</a> からご確認いただけます
        </span>
      </li>
        <!-- <a
          class="WhatsNew-list-item-anchor"
          :href="item.url"
          target="_blank"
          rel="noopener"
        >
          <time
            class="WhatsNew-list-item-anchor-time px-2"
            :datetime="formattedDate(item.date)"
          >
            {{ item.date }}
          </time>
          <span class="WhatsNew-list-item-anchor-link">
            {{ item.text }}
            <v-icon
              v-if="!isInternalLink(item.url)"
              class="WhatsNew-item-ExternalLinkIcon"
              size="12"
            >
              mdi-open-in-new
            </v-icon>
          </span>
        </a> -->
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { convertDateToISO8601Format } from '@/utils/formatDate'

export default Vue.extend({
  props: {
    items: {
      type: Array,
      required: true
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
    margin: 3px;
  }
}

.breaking {
  color: #ff50a0 !important;
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

.breaking-content {
  margin-left: 14px;
}
</style>
