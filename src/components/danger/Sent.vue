<script setup>
import EmptyList from './EmptyList.vue'
import List from './List.vue'
import UserActionButtons from './UserActionButtons.vue'
import { ref } from 'vue'
import { loggedUser } from '@/states/loggedUser'
import { bus } from 'vue3-eventbus'

let dangers = ref([])

async function fetchDangers() {
  await fetch(import.meta.env.VITE_API_ENDPOINT + '/dangers/?userID=' + loggedUser._id, {
    method: 'GET'
  })
  .then((resp) => resp.json())
  .then((data) => {
    dangers.value = data
  })
}

await fetchDangers()

bus.on('userActionEnd', (e) => fetchDangers())
</script>

<template>
  <div class="tab-content mx-auto container-sm my-4" style="max-width: 1000px">
    <List v-if="dangers.length > 0" :dangers="dangers" :buttons="UserActionButtons" />
    <EmptyList v-else subheader="Aggiungi una segnalazione per iniziare" />
  </div>
</template>
