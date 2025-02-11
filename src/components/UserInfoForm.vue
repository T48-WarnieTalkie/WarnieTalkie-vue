<script setup>
import { onMounted, ref, useTemplateRef } from 'vue';
import formValidation from '@/utility/form-validation';
import { loggedUser, setLoggedUser } from '@/states/loggedUser';
import { Modal } from 'bootstrap';
import { bus } from 'vue3-eventbus';
import router from '@/router';

onMounted(() => formValidation())

let user = ref()
let userSensitive = ref()
let form = useTemplateRef('form')

let loading = ref(false)

async function fetchInfo() {
  user.value = await fetch(import.meta.env.VITE_API_ENDPOINT + "/users/" + loggedUser._id, {
    method: 'GET',
  }).then((resp) => resp.json())

  userSensitive.value = await fetch(import.meta.env.VITE_API_ENDPOINT + "/userSensitives/" + loggedUser.userSensitiveID, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + loggedUser.token,
    }
  }).then((resp) => resp.json())
}

async function handleSubmit() {
  if(form.value.checkValidity()) {
    loading.value = true
    const userSensitiveResp = await fetch(import.meta.env.VITE_API_ENDPOINT + "/userSensitives/" + loggedUser.userSensitiveID, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        Authorization: 'Bearer ' + loggedUser.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        emailAddress: userSensitive.value.emailAddress,
        cellphoneNumber: userSensitive.value.cellphoneNumber
      })
    })
    if(userSensitiveResp.status == 409) {
      new Modal('#existingAccountModal').show()
      await fetchInfo()
      loading.value = false
      return
    }    
    await fetch(import.meta.env.VITE_API_ENDPOINT + "/users/" + loggedUser._id, {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        Authorization: 'Bearer ' + loggedUser.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: user.value.name,
        surname: user.value.surname
      })
    })
    let userResp = await fetch(import.meta.env.VITE_API_ENDPOINT + "/users/" + loggedUser._id, {
      method: 'GET'
    })
    userResp = await userResp.json()
    const updatedLoggedUser = {
      token: loggedUser.token,
      _id: userResp._id,
      name: userResp.name,
      surname: userResp.surname,
      isModerator: userResp.isModerator,
      userSensitiveID: userResp.userSensitiveID
    }
    setLoggedUser(updatedLoggedUser)
    $cookies.set('user', loggedUser)
    loading.value = false
  }
}

await fetchInfo()
</script>

<template>
  <div v-if="user" class="mx-auto container-sm" style="max-width: 1000px">
    <form ref="form" class="needs-validation" @submit.prevent="handleSubmit()" novalidate="novalidate">
      <div class="my-4">
        <label class="form-label" for="name">Nome</label>
        <input class="form-control" type="text" id="name" name="name" v-model="user.name" required="required"/>
        <div class="invalid-feedback">Inserisci un nome</div>
      </div>
      <div class="my-4">
        <label class="form-label" for="surname">Cognome</label>
        <input class="form-control" type="text" id="surname" name="surname" v-model="user.surname" required/>
        <div class="invalid-feedback">Inserisci un cognome </div>
      </div>
      <div class="my-4">
        <label class="form-label" for="cellphoneNumber">Numero di telefono</label>
        <input class="form-control" type="text" id="cellphoneNumber" name="cellphoneNumber" pattern="[0-9]{10}" v-model="userSensitive.cellphoneNumber" required />
        <div class="invalid-feedback">Inserisci un numero di telefono valido (es. 1234567890)</div>
      </div>
      <div class="my-4">
        <label class="form-label" for="emailAdress">Indirizzo e-mail</label>
        <input class="form-control" type="email" id="emailAdress" name="emailAdress" pattern=".*@.*" v-model="userSensitive.emailAddress" required />
        <div class="invalid-feedback">Inserisci un indirizzo e-mail valido (es. example@gmail.com)</div>
      </div>
      <div class="my-4">
        <label class="form-label" for="password">Password</label>
        <input class="form-control" type="password" id="password" name="password" value=":) ;) <3 :->" required disabled/>
        <button class="btn btn-link p-0 text-body" type="button" style="font-size: 14px;" @click="bus.emit('notImplementedEvent')">Modifica la password</button>
      </div>
      <div class="my-4 d-flex">
        <button class="btn btn-primary" type="submit">
          <span v-if="loading" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
          Salva modifiche
        </button>  
        <button class="ms-auto btn btn-outline-danger" type="button" @click="bus.emit('notImplementedEvent')">Elimina account...</button>
      </div>
    </form>
  </div>
  <div class="modal fade" id="existingAccountModal" tabindex="-1" aria-labelledby="existingAccountModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">Account esistente</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <span>L'indirizzo e-mail e/o il numero di telefono inseriti sono associati ad un account esistente. <br>
            Riprova inserendo altre credenziali o vai al <a href="#" data-bs-dismiss="modal" @click="router.push({name: 'login'})">login</a>
          </span>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Ok</button>
        </div>
      </div>
    </div>
  </div>
</template>