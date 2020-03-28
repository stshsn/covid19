<template>
  <v-col cols="12" class="DataCard">
    <v-card>
      <v-card-title>福井県のYoutube配信</v-card-title>
      <v-card-subtitle>公開日時: {{ publishedAt }}</v-card-subtitle>
      <v-card-text>
        <youtube :video-id="videoId" />
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
          console.log(relatedVideo)
          this.videoId = relatedVideo[0].snippet.resourceId.videoId
          this.publishedAt = new Date(relatedVideo[0].snippet.publishedAt).toLocaleString()
        })

      
    }
    // async getPlaylists(userName) {
    //   await youtubeAPI
    //     .get(
    //       '/channels?part=contentDetails&forUsername='+userName+'&key='+youtubeAPIKey,
    //     )
    //     .then(res => {
    //       this.playlist = res.data.items[0].contentDetails.relatedPlaylists.uploads
    //     })
    // },
    // async getPlaylistItems(playlistId) {
    //   await youtubeAPI
    //     .get(
    //       '/playlistItems?part=snippet&playlistId='+playlistId+'&key='+youtubeAPIKey,
    //     )
    //     .then(res => {
    //       this.playlistItems = res.data.items
    //     })
    // },
    // getVideoId(playlistItems) {
    //   this.videoId = playlistItems[0].snippet.resourceId.videoId
    //   // this.videoId = this.playlistItems.filter(item => item.snippet.title === '（福井県20/3/27）新型コロナウイルス感染症に係る記者会見3')
    // }
  }
}
</script>
