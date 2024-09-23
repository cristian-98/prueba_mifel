<template>
  <div>
    <GmapMap
      v-if="
        userSelected.address &&
        userSelected.address.geo &&
        userSelected.address.geo.lat &&
        userSelected.address.geo.lng
      "
      :center="{
        lat: parseFloat(userSelected.address.geo.lat),
        lng: parseFloat(userSelected.address.geo.lng),
      }"
      :zoom="6"
      style="width: 100%; height: 400px"
    >
      <GmapMarker
        :position="{
          lat: parseFloat(userSelected.address.geo.lat),
          lng: parseFloat(userSelected.address.geo.lng),
        }"
      ></GmapMarker>
    </GmapMap>
    <div v-else>No se han proporcionado coordenadas.</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MapIndex",
  computed: {
    ...mapGetters(["getUserSelected"]),
    userSelected() {
      return this.getUserSelected;
    },
  },
};
</script>
