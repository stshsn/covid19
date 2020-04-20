<template>
  <v-col cols="12" class="DataCard">
    <v-card>
      <!--<v-card-title>{{ $t('マスクの在庫状況') }}</v-card-title>-->
      <v-card-title>{{ $t('県内のゲンキー店舗') }}</v-card-title>
      <v-card-text>
        <div>
          <!--
          <p class="visibleShops">
            {{ $t('表示中の店舗') }}:
            <span
              v-text="locationsVisibleOnMap.length > 0 ? locationsVisibleOnMap : $t('表示できる店舗はありません')"
            />
          </p>
          -->
        </div>
        <div id="map-wrapper">
          <client-only>
            <l-map
              id="map"
              :center="center"
              :zoom="zoom"
              :options="mapOptions"
              @update:center="centerUpdate"
              @update:zoom="zoomUpdate"
            >
              <l-tile-layer
                :url="url"
                :attribution="attribution"
              ></l-tile-layer>
              <l-control-zoom position="bottomright"></l-control-zoom>
              <l-control position="topleft">
                <v-btn
                  small
                  @click="moveToPosition"
                >
                  <v-icon>mdi-near-me</v-icon>
                  {{ $t('現在地付近へ移動') }}
                </v-btn>
              </l-control>
              <l-marker
                v-for="(genky, index) of genkies"
                :key=index
                :lat-lng="[genky.緯度, genky.経度]"
              >
                <l-popup>
                  <div>
                    {{ genky.店舗名 }}
                  </div>
                </l-popup>
              </l-marker>  
            </l-map>
          </client-only>
        </div>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import GenkyLocations from '@/data/genky_locations.json'

export default {
  data() {
    return {
      url: "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
      zoom: 9,
      center: [35.833388, 136.185209],
      currentZoom: 9,
      currentCenter: [35.833388, 136.185209],
      mapOptions: {
        zoomControl: false,
        minZoom: 9,
      },
      attribution: '<a href="https://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html" target="_blank">国土地理院</a>'
    }
  },
  computed: {
    genkies: () => {
      return GenkyLocations.filter(function (genky) {
        return genky.IDg === '2'
      })
    }
  },
  methods: {
    centerUpdate(center) {
      this.currentCenter = center
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom
    },
    moveToPosition() {
      let currentPosition = []
      navigator.geolocation.getCurrentPosition(
        position => {
          //currentPosition = [position.coords.latitude, position.coords.longitude]
          console.log(position.coords.latitude, position.coords.longitude)
          this.center = [position.coords.latitude, position.coords.longitude]
          this.zoom = 13
        },
        error => {
          console.log(error)
        }
      )
    },
  },
};
</script>
<style scoped>
#map-wrapper {
  width: 600px;
  height: 600px;
}
</style>
