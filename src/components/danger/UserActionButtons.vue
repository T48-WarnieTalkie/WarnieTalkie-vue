<script setup>
import { loggedUser } from '@/states/loggedUser';
import { bus } from 'vue3-eventbus';
const props = defineProps({
  danger: Object
})

function handleClick() {
  fetch(import.meta.env.VITE_API_ENDPOINT + "/dangers/" + props.danger._id, {
    method: "DELETE",
    mode: 'cors',
    headers: {
      'Authorization': 'Bearer ' + loggedUser.token
    }
  })
  .then(() => {
    bus.emit('userActionEnd')
  })
}
</script>

<template>
  <button v-if="danger.status=='waiting-approval'" type="button" class="btn btn-link p-0 text-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">Annulla</button>
  <button v-else type="button" class="btn btn-link p-0" disabled>Annulla</button>

  <div v-if="danger.status=='waiting-approval'" class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="deleteModalLabel">Attenzione</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Sei sicuro di voler annullare la segnalazione?
        </div>
        <div class="modal-footer">
          <button @click="handleClick" type="button" class="btn btn-danger" data-bs-dismiss="modal">Si, annulla</button>
        </div>
      </div>
    </div>
  </div>
</template>