<template>
  <div>
    <!--<Tweet id="1253910475223363585"></Tweet>-->
    <template v-if="tweetList.length === 0">
      関連するツイートはありません
    </template>
    <template v-else>
      <Tweet v-for="tweetId in tweetList" :key="tweetId" :id="tweetId"></Tweet>
    </template>
  </div>
</template>

<script>
import { Tweet } from 'vue-tweet-embed'

export default {
  components: {
    Tweet
  },
  props: {
    tweetList: {
      type: Array,
      required: true
    },
    options: {
      type: Object,
      required: false
    }
  }
}
</script>
