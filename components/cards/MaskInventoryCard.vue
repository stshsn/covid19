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
          <no-ssr>
            <l-map
              id="map"
              :center="center"
              :zoom="zoom"
              min-zoom="9"
            >
              <l-tile-layer :url="url"></l-tile-layer>
              <l-marker
                v-for="(location, index) of locations"
                v-if="location.IDg === '2'"
                :key=index
                :lat-lng="[location.緯度, location.経度]"
              ></l-marker>
            </l-map>
          </no-ssr>
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
      locations: GenkyLocations,
    }
  }
};
</script>
<style scoped>
#map-wrapper {
  width: 600px;
  height: 600px;
}
</style>
