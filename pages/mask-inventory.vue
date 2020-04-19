<template>
  <v-col cols="12" class="DataCard">
    <v-card>
      <v-card-title>{{ $t('マスクの在庫状況') }}</v-card-title>
      <v-card-text>
        <div class="flex">
          <p class="visibleCities">
            {{ $t('表示中の店舗') }}:
            <!--<span
              v-text="locationsVisibleOnMap.length > 0 ? locationsVisibleOnMap : 'No visible cities'"
            />-->
          </p>
        </div>
        <div id="map-wrapper">
            <l-map
              id="map"
              :center="[locations[0].lat, locations[0].lng]"
              :zoom="zoom"
            >
              <l-tile-layer :url="url"></l-tile-layer>
              <!--<l-marker
                v-for="location in locations"
                :key="location.id"
                :lat-lng="[location.lat, location.lng]"
              >-->
              </l-marker>
            </l-map>
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
      zoom: 13,
      locations: GenkyLocations,
    }
  }
};
</script>
<style>
#map-wrapper {
  all: initial;
  width: 400px;
  height: 400px;
}
#map {
  all: initial;
}
</style>
