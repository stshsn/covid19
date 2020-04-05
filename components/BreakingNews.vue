<template>
  <div class="BreakingNews">
    <h2 class="BreakingNews-heading breaking">
      <v-icon size="24" class="BreakingNews-heading-icon">
        mdi-information
      </v-icon>
      {{ $t('速報') }}
      <a class="WhatsNew-heading-link" :href="this.localePath('/news')"
        >過去のお知らせはこちら</a
      >
    </h2>
    <ul class="BreakingNews-list">
      <h3 class="breaking-content" />
      <li v-for="(item, i) in items" :key="i" class="BreakingNews-list-item">
        <time
          class="BreakingNews-list-item-anchor-time px-2"
          v-html="item.date"
        />
        <p class="BreakingNews-list-item-anchor-link" v-html="item.text" />
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
    margin-bottom: 10px;
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
