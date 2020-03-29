<template>
  <div class="BreakingNews">
    <h2 class="BreakingNews-heading breaking">
      <v-icon size="24" class="BreakingNews-heading-icon">
        mdi-information
      </v-icon>
      {{ $t('速報（2020年03月29日 20:00 更新）') }}
    </h2>
    <ul class="BreakingNews-list">
      <h3 class="breaking-content">
      </h3>
      <li class="BreakingNews-list-item">
        <time class="BreakingNews-list-item-anchor-time px-2">
          2020/03/29
        </time>
        <p class="BreakingNews-list-item-anchor-link">
          福井県内で13例目となる新型コロナウイルス感染者が確認されました。詳細は <a target="_blank" href="https://www.pref.fukui.lg.jp/doc/kenkou/kansensyo-yobousessyu/corona_d/fil/200329-1.pdf">こちら</a> からご確認いただけます
        </p>
      </li><br />
      <li class="BreakingNews-list-item">
        <time class="BreakingNews-list-item-anchor-time px-2">
          2020/03/28
        </time>
        <p class="BreakingNews-list-item-anchor-link">
          福井県内で10, 11, 12例目となる新型コロナウイルス感染者が確認されました。詳細は <a target="_blank" href="https://www.pref.fukui.lg.jp/doc/kenkou/kansensyo-yobousessyu/corona_d/fil/200328-1.pdf">こちら</a> からご確認いただけます
        </p>
      </li><br />
      <li class="BreakingNews-list-item">
        <time class="BreakingNews-list-item-anchor-time px-2">
          2020/03/27
        </time>
        <p class="BreakingNews-list-item-anchor-link">
          福井県内で8, 9例目となる新型コロナウイルス感染者が確認されました。詳細は <a target="_blank" href="https://www.pref.fukui.lg.jp/doc/kenkou/kansensyo-yobousessyu/corona_d/fil/200327-4.pdf">こちら</a> からご確認いただけます
        </p>
      </li><br />
      <li class="BreakingNews-list-item">
        <time class="BreakingNews-list-item-anchor-time px-2">
          2020/03/27
        </time>
        <p class="BreakingNews-list-item-anchor-link">
          福井県内で7例目となる新型コロナウイルス感染者が確認されました。詳細は <a target="_blank" href="https://www.pref.fukui.lg.jp/doc/kenkou/kansensyo-yobousessyu/corona_d/fil/200327.pdf">こちら</a> からご確認いただけます
        </p>
      </li><br />
      <li class="BreakingNews-list-item">
        <time class="BreakingNews-list-item-anchor-time px-2">
          2020/03/26
        </time>
        <p class="BreakingNews-list-item-anchor-link">
          福井県内で6例目となる新型コロナウイルス感染者が確認されました。詳細は <a target="_blank" href="https://www.pref.fukui.lg.jp/doc/kenkou/kansensyo-yobousessyu/corona_d/fil/200326-2.pdf">こちら</a> からご確認いただけます
        </p>
      </li>
        <!-- <a
          class="BreakingNews-list-item-anchor"
          :href="item.url"
          target="_blank"
          rel="noopener"
        >
          <time
            class="BreakingNews-list-item-anchor-time px-2"
            :datetime="formattedDate(item.date)"
          >
            {{ item.date }}
          </time>
          <span class="BreakingNews-list-item-anchor-link">
            {{ item.text }}
            <v-icon
              v-if="!isInternalLink(item.url)"
              class="BreakingNews-item-ExternalLinkIcon"
              size="12"
            >
              mdi-open-in-new
            </v-icon>
          </span>
        </a> -->
      <!-- </li> -->
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { convertDateToISO8601Format } from '@/utils/formatDate'

export default Vue.extend({
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
.BreakingNews {
  @include card-container();

  padding: 10px;
  margin-bottom: 20px;
}

.BreakingNews-heading {
  display: flex;
  align-items: center;

  @include card-h2();

  margin-bottom: 12px;
  color: $gray-2;
  margin-left: 12px;

  &-icon {
    margin: 10px;
  }
}

.breaking {
  color: #ff50a0 !important;
}

.BreakingNews .BreakingNews-list {
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
        display: inline;
    
        // @include text-link();

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

.link-color {
  color: #006ca8 !important;
}

.breaking-content {
  margin-left: 14px;
}
</style>
