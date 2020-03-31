<template>
  <v-col cols="12" class="DataCard">
    <v-card>
      <v-card-title>福井県のYouTube公開動画</v-card-title>
      <!-- <v-card-subtitle>公開日時: {{ publishedAt }}</v-card-subtitle> -->
      <v-card-text>
        <!-- <youtube :video-id="videoId" /> -->
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import Vue from 'vue'
import VueYoutube from 'vue-youtube'
// import videolist from '../../covid19_fukui/youtubeVideolist.json'

Vue.use(VueYoutube)

export default {
//   data: () => ({
//     videoId: '',
//     publishedAt: ''
//   }),

//   created () {
//     this.getLatestVideoId()
//   },

//   methods: {
//     async getLatestVideoId(userName) {
//       this.videoId = videolist[0].snippet.resourceId.videoId
//       this.publishedAt = new Date(videolist[0].snippet.publishedAt).toLocaleString()
//     }
//   }
// }
</script>

<style>
iframe {
  width: 100%;
}
</style>
