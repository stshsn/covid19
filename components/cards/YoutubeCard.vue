<template>
  <v-col cols="12" class="DataCard">
    <v-card>
      <v-card-title>福井県のYouTube（LIVE）</v-card-title>
      <!-- <v-card-subtitle>公開日時: {{ publishedAt }}</v-card-subtitle> -->
      <v-card-text>
        <!-- <iframe style="width=100%;" height="315" src="https://www.youtube.com/embed/WaypSgzvlU4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> -->
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueYoutube from 'vue-youtube'

Vue.use(VueYoutube)

const youtubeAPIKey = 'AIzaSyDg9WtuupL11twuZ8TgPB_Ru73GmtJeDUo'
const youtubeUsername = 'fukuikouhou'
const youtubeAPI = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  },
  timeout: 3000,
  responseType: "json"
})

export default {
  data: () => ({
    playlistId: '',
    playlistItems: [],
    videoId: '',
    publishedAt: ''
  }),

  created () {
    this.getVideoId(youtubeUsername)
  },

  methods: {
    async getVideoId(userName) {
      var playlistId = ''
      var playlistItems = []
      await youtubeAPI
        .get(
          '/channels?part=contentDetails&forUsername='+userName+'&key='+youtubeAPIKey,
        )
        .then(res => {
          playlistId = res.data.items[0].contentDetails.relatedPlaylists.uploads
        })
        
      await youtubeAPI
        .get(
          '/playlistItems?part=snippet&playlistId='+playlistId+'&maxResults=50&key='+youtubeAPIKey,
        )
        .then(res => {
          playlistItems = res.data.items
          var relatedVideo = playlistItems.filter(
            video => video.snippet.title.match(/新型コロナウイルス/)
          )
          relatedVideo.sort((a, b) => {
            const publishedAt_a = new Date(a.snippet.publishedAt).getTime()
            const publishedAt_b = new Date(b.snippet.publishedAt).getTime()

            let comparison = 0
            if (publishedAt_a < publishedAt_b) {
              comparison = 1
            } else if (publishedAt_a > publishedAt_b) {
              comparison = -1
            }
            return comparison
          })
          // console.log(relatedVideo)
          this.videoId = relatedVideo[0].snippet.resourceId.videoId
          this.publishedAt = new Date(relatedVideo[0].snippet.publishedAt).toLocaleString()
        })

      
    }
  }
}
</script>

<style>
iframe {
  width: 100%;
}
</style>