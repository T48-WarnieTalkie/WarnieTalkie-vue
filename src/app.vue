<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import {setLoggedUser} from '@/states/loggedUser'
import { inject, ref } from 'vue';
import { bus } from 'vue3-eventbus';
import { Modal } from 'bootstrap';

let checkedUser = ref(false)

const $cookies = inject('$cookies')
let user = $cookies.get('user')
if(user != null) {
  setLoggedUser(user)
}
checkedUser = true

bus.on('notImplementedEvent', () => {
  new Modal('#notImplementedModal').show()
})
</script>

<template>
  <div v-if="checkedUser" id="app" class="d-flex flex-column flex-grow">
    <Navbar />
    <RouterView />
  </div>
  <div class="modal fade" id="notImplementedModal" tabindex="-1" aria-labelledby="notImplementedModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">Funzionalità non implementata</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          La funzionalità richiesta non è stata implementata in questa demo!
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Ok</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
  height: 100vh;
}
</style>