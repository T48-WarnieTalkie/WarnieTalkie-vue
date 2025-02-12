<script setup>
import { onMounted } from 'vue'
import { categoryToString, timeDistance } from '@/utility/utils';
import L from 'leaflet'
import router from '@/router';
import.meta.env.VITE_API_ENDPOINT

onMounted(() => {
  
  const homeMap = L.map('homeMap');

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(homeMap);

  function onMapMoveEnd() {
    localStorage.setItem("indexMap_lastCenter", JSON.stringify(homeMap.getCenter()));
    localStorage.setItem("indexMap_lastZoom", homeMap.getZoom());
  }

  homeMap.on('moveend', onMapMoveEnd);

  var indexMap_lastCenter_json = localStorage.getItem("indexMap_lastCenter");
  if(indexMap_lastCenter_json != null) {
    var indexMap_lastCenter = JSON.parse(indexMap_lastCenter_json);
    homeMap.setView([indexMap_lastCenter.lat, indexMap_lastCenter.lng], localStorage.getItem("indexMap_lastZoom"));
  } else {
    //povo
    homeMap.setView([46.064638, 11.150307], 16);
  }

  fetch(import.meta.env.VITE_API_ENDPOINT + "/dangers/?status=approved", {
    method: "GET"
  })
  .then((resp) => resp.json())
  .then((dangers) => {
    dangers.forEach((d) => {
      var marker = L.marker([d.coordinates[0], d.coordinates[1]]).addTo(homeMap);
      marker.bindPopup(`
        <button class="btn btn-link text-info p-0" data-dangerid="${d._id}" onclick="onLinkClick(this)">
          <h5 class="m-0">${categoryToString(d.category)}</h5>  
        </button>
        <br>
        <span>inviata ${timeDistance(d.sendTimestamp)} fa</span>
      `);
    });
    window.onLinkClick = (button) => {
      router.push({name: 'visualizeDanger', params: {dangerId: button.dataset.dangerid}})  
    }
  })
})

</script>

<template>
  <div id="homeMap" class="flex-grow-1"></div>
</template>
