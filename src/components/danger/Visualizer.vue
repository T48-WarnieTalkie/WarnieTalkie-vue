<script setup>
import { categoryToString, dateToDateString, dateToTimeString } from '@/utility/utils';
import { onMounted, ref } from 'vue'
import StatusString from './StatusString.vue';
import ModActionButtons from './ModActionButtons.vue';
import { bus } from 'vue3-eventbus';
import { isLogged, loggedUser } from '@/states/loggedUser';
import UserActionButtons from './UserActionButtons.vue';
import router from '@/router';

const props = defineProps({
  dangerId: String
})

let danger = ref()
let user = ref()

async function fetchDanger() {
  danger.value = await fetch(import.meta.env.VITE_API_ENDPOINT + "/dangers/" + props.dangerId, {
    method: "GET",
  })
  .then((resp) => resp.json())
  
  user.value = await fetch(import.meta.env.VITE_API_ENDPOINT + '/users/' + danger.value.userID, {
    method: 'GET'
  }).then((resp) => resp.json())
}

onMounted(() => {
  const visualizeDangerMap = L.map('visualizeDangerMap');

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(visualizeDangerMap);

  L.marker([danger.value.coordinates[0], danger.value.coordinates[1]]).addTo(visualizeDangerMap)

  visualizeDangerMap.setView([danger.value.coordinates[0], danger.value.coordinates[1]], 12);
})

await fetchDanger();

bus.on('userActionEnd', (e) => router.push({name: 'sentDangers'}))
bus.on('modActionEnd', (e) => fetchDanger())

</script>

<template>
  <div id="visualizeDanger" class="mx-auto container-sm">
    <div class="row my-2 gy-2">
      <div class="col-sm-6">
        <div id="visualizeDangerMap"></div>
      </div>
      <div class="col-sm-6">
        <div id="visualizeDangerCarousel" class="carousel slide bg-body-secondary">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img class="carousel-img" src="@/assets/sample-danger-photo_1.jpg">
            </div>
            <div class="carousel-item">
              <img class="carousel-img" src="@/assets/sample-danger-photo_2.jpg">
            </div>
            <div class="carousel-item">
              <img class="carousel-img" src="@/assets/sample-danger-photo_3.jpg">
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#visualizeDangerCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#visualizeDangerCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="d-flex align-items-end">
        <div>
          <h2>{{ categoryToString(danger.category) }}</h2>
          <span>inviata il </span>
          <span> {{ dateToDateString(new Date(danger.sendTimestamp)) }} </span>
          <span> alle </span>
          <span> {{ dateToTimeString(new Date(danger.sendTimestamp)) }}</span>
          <span> da </span>
          <span class="underlined"> {{ user.name }} {{ user.surname }}</span>
          <br>
          <StatusString :danger="danger"/>
        </div>
        <div v-if="isLogged()" class="ms-auto">
          <ModActionButtons v-if="loggedUser.isModerator" :danger="danger"/>
          <UserActionButtons v-else :danger="danger"></UserActionButtons>
        </div>
      </div>
    </div>
    <hr>
    <p>{{ danger.shortDescription }}</p>
  </div>
</template>

<style scoped>
#visualizeDanger {
  max-width: 1000px;
}

#visualizeDangerMap {
  height: 300px
}

#visualizeDangerCarousel {
  height: 300px;
  overflow: hidden;
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  overflow: hidden;
}

</style>