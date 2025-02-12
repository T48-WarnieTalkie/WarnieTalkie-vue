<script setup>
import formValidation from '@/utility/form-validation';
import { onMounted, ref, useTemplateRef } from 'vue'
import { loggedUser } from '@/states/loggedUser';

import { bus } from 'vue3-eventbus';
import { Modal } from 'bootstrap';

const props = defineProps({
  danger: Object
})

let expiration = ref()
let newExpiration = ref()
let handleApprove, handleReject, handleModifyExpiration, handleTerminate;
let approveModal = useTemplateRef('approveModal')
let rejectModal = useTemplateRef('rejectModal')
let modifyExpirationModal = useTemplateRef('modifyExpirationModal')
let terminateModal = useTemplateRef('terminateModal')

const openApproveModal = () => {new Modal(approveModal.value).show()}
const openRejectModal = () => {new Modal(rejectModal.value).show()}
const openModifyExpirationModal = () => {new Modal(modifyExpirationModal.value).show()}
const openTerminateModal = () => {new Modal(terminateModal.value).show()}

onMounted(() => {
  formValidation()

  handleApprove = () => {
    fetch(import.meta.env.VITE_API_ENDPOINT + "/dangers/" + props.danger._id, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + loggedUser.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: 'approved',
        expiration: expiration.value
      })
    }).then(() => {
      bus.emit('modActionEnd', {action: "approve"})
    })
    
  }

  handleReject = () => {
    fetch(import.meta.env.VITE_API_ENDPOINT + "/dangers/" + props.danger._id, {
      method: "PATCH",
      headers: {
        Authorization: 'Bearer ' + loggedUser.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: 'rejected'
      })
    }).then(() => {
      bus.emit('modActionEnd', {action: "reject"})
    })
    
  }

  handleModifyExpiration = () => {
    fetch(import.meta.env.VITE_API_ENDPOINT + "/dangers/" + props.danger._id, {
      method: "PATCH",
      headers: {
        Authorization: 'Bearer ' + loggedUser.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        expiration: newExpiration.value
      })
    }).then(() => {
      bus.emit('modActionEnd', {action: "modifyExpiration"})
    })
    
  }

  handleTerminate = () => {
    fetch(import.meta.env.VITE_API_ENDPOINT + "/dangers/" + props.danger._id, {
      method: "PATCH",
      headers: {
        Authorization: 'Bearer ' + loggedUser.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        expiration: new Date().toISOString(),
        status: 'expired'
      })
    }).then(() => {
      bus.emit('modActionEnd', {action: "terminate"})
    })
    
  }
})

</script>

<template>
  <div v-if="danger.status=='waiting-approval'" class="d-flex gap-2">
    <button class="btn btn-link p-0 text-success" @click="openApproveModal()">Approva</button>
    
    <div ref='approveModal' class="modal fade" id="approveModal" tabindex="-1" aria-labelledby="approveModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="approveModalLabel">Approva una segnalazione</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="needs-validation pb-4" novalidate>
              <label for="expiration" class="form-label">Inserisci una data di scadenza per la segnalazione:</label>
              <input id="expiration" class="form-control" type="datetime-local" v-model="expiration" :min="new Date().toISOString().slice(0, 16)" required>
              <div class="invalid-feedback">Inserisci una data valida</div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="handleApprove()" data-bs-dismiss="modal">Approva</button>
          </div>
        </div>
      </div>
    </div>

    <div class="vr"></div>
    <button class="btn btn-link p-0 text-danger" @click="openRejectModal()">Rifiuta</button>

    <div ref="rejectModal" class="modal fade" id="rejectModal" tabindex="-1" aria-labelledby="rejectModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="rejectModalLabel">Attenzione</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Sei sicuro di voler rifiutare la segnalazione?
          </div>
          <div class="modal-footer">
            <button type="button" @click="handleReject()" class="btn btn-danger" data-bs-dismiss="modal">Si, rifiuta</button>
          </div>
        </div>
      </div>
    </div>

  </div>
  <div v-if="danger.status=='approved'" class="d-flex gap-2">
    <button class="btn btn-link p-0 text-primary" @click="openModifyExpirationModal()">Modifica scadenza</button>

    <div ref="modifyExpirationModal" class="modal fade" id="modifyExpirationModal" tabindex="-1" aria-labelledby="modifyExpirationModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="modifyExpirationModalLabel">Modifica scadenza</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="needs-validation pb-4" novalidate>
              <label for="newExpiration" class="form-label">Inserisci una nuova data di scadenza per la segnalazione:</label>
              <input id="newExpiration" class="form-control" type="datetime-local" v-model="newExpiration" :min="new Date().toISOString().slice(0, 16)" required>
              <div class="invalid-feedback">Inserisci una data valida</div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="handleModifyExpiration()" data-bs-dismiss="modal">Modifica</button>
          </div>
        </div>
      </div>
    </div>

    <div class="vr"></div>
    <button class="btn btn-link p-0 text-danger" @click="openTerminateModal()">Termina</button>

    <div ref="terminateModal" class="modal fade" id="terminateModal" tabindex="-1" aria-labelledby="terminateModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="terminateModalLabel">Attenzione</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Sei sicuro di voler terminare la segnalazione?
          </div>
          <div class="modal-footer">
            <button type="button" @click="handleTerminate()" class="btn btn-danger" data-bs-dismiss="modal">Si, termina</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>