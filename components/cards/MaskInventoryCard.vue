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
              <l-tile-layer :url="url" :attribution="attribution" />
              <l-control-zoom position="bottomright" />
              <l-control position="topleft">
                <v-btn small @click="moveToPosition">
                  <v-icon>mdi-crosshairs-gps</v-icon>
                </v-btn>
              </l-control>
              <l-marker
                v-for="(genky, index) of genkyInFukui"
                :key="index"
                :lat-lng="[genky.緯度, genky.経度]"
              >
                <l-tooltip>
                  <div>
                    <h3>{{ getInventory(genky.店舗名).店舗名 }}</h3>
                    <div>
                      <span>在庫数</span>
                      <span>{{ getInventory(genky.店舗名).在庫数 }}</span>
                    </div>
                    <span>更新日時 {{ getInventory(genky.店舗名).日時 }}</span>
                  </div>
                </l-tooltip>
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
import MaskInventory from '@/data/mask_inventory.json'

export default {
  data() {
    return {
      url: 'https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
      zoom: 9,
      center: [35.833388, 136.185209],
      currentZoom: 9,
      currentCenter: [35.833388, 136.185209],
      mapOptions: {
        zoomControl: false,
        minZoom: 9
      },
      attribution:
        '<a href="https://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html" target="_blank">国土地理院</a>',
      maskInventoryData: MaskInventory.data,
    }
  },
  computed: {
    genkyInFukui: () => {
      return GenkyLocations.filter(genky => genky.IDg === '2')
    },
    getInventory: () => {
      return (shopName) => {
        const inventory = MaskInventory.data.filter(d => d.店舗名 === shopName)[0]
        if (inventory) {
          inventory.日時 = new Date(inventory.日時).toLocaleString()
          return inventory
        } else {
          return {
            "店舗名": shopName,
            "在庫数": "---",
            "日時": "---"
          }
        }
      }
    },
  },
  methods: {
    centerUpdate(center) {
      this.currentCenter = center
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom
    },
    moveToPosition() {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.center = [position.coords.latitude, position.coords.longitude]
          this.zoom = 13
        },
        error => {
          console.log(error)
        }
      )
    },
    openPopup(event) {
      this.$nextTick(() => {
        event.target.openPopup()
      })
    },
  }
}
</script>
<style lang="scss" scoped>
#map-wrapper {
  height: 600px;
  @include lessThan($large) {
    height: 480px;
  }
  @include lessThan($medium) {
    height: 320px;
  }
  @include lessThan($small) {
    height: 256px;
  }
}
</style>
