<script setup>
import List from '@/components/danger/List.vue';
import {ref} from 'vue'
import { loggedUser } from '@/states/loggedUser';
import ModActionButtons from '@/components/danger/ModActionButtons.vue';
import { bus } from 'vue3-eventbus';
import EmptyList from './EmptyList.vue';

let waitingApproval = ref([])
let active = ref([])
let rejectedExpired = ref([])

async function fetchDangers() {
  let dangers = []
  await fetch(import.meta.env.VITE_API_ENDPOINT + "/dangers/", {
    method: "GET"
  })
  .then((resp) => resp.json())
  .then((data) => {
    dangers = data
  })
  waitingApproval.value = dangers.filter((d) => d.status=='waiting-approval')
  active.value = dangers.filter((d) => d.status=='approved')
  rejectedExpired.value.push(...dangers.filter((d) => d.status=='rejected'))
  rejectedExpired.value.push(...dangers.filter((d) => d.status=='expired'))
}

await fetchDangers()

bus.on('modActionEnd', (e) => fetchDangers())
</script>

<template>
  <div class="tab-content mx-auto container-sm my-4" style="max-width: 1000px">
    <div class="tab-pane show active" id="waitingApproval-pane" role="tabpanel" tabindex="0">
      <List v-if="waitingApproval.length>0" :dangers="waitingApproval" :buttons="ModActionButtons"/>
      <EmptyList v-else subheader="Non hai più segnalazioni da valutare (rilassati!)"/>
    </div>
    <div class="tab-pane" id="active-pane" role="tabpanel" tabindex="0">
      <List v-if="active.length>0" :dangers="active" :buttons="ModActionButtons"/>
      <EmptyList v-else subheader="Non ci sono segnalazioni attive al momento" />
    </div>
    <div class="tab-pane" id="rejectedExpired-pane" role="tabpanel" tabindex="0">
      <List v-if="rejectedExpired.length>0" :dangers="rejectedExpired" :buttons="ModActionButtons"/>
      <EmptyList v-else subheader="Non ci sono segnalazioni rifiutate o scadute al momento"/>
    </div>
  </div>
</template>