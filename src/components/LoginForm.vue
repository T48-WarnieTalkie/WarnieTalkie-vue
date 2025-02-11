<script setup>
import { ref, onMounted, useTemplateRef, inject} from 'vue';
import formValidation from '@/utility/form-validation';
import {setLoggedUser} from '@/states/loggedUser'
import router from '@/router';
import {Modal} from 'bootstrap'

const $cookies = inject('$cookies')

let emailAddress = ref('');
let password = ref('')

let form = useTemplateRef('form')

async function handleSubmit() {
  if(form.value.checkValidity()) {
    let authResp = await fetch(import.meta.env.VITE_API_ENDPOINT + "/authentications", {
      method: "POST",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailAddress: emailAddress.value,
        password: password.value
      })
    })
    if(authResp.status == 403) {
      new Modal('#wrongCredentialsModal').show()
      return
    } 
    else {authResp = await authResp.json()}
    let userResp = await fetch(import.meta.env.VITE_API_ENDPOINT + "/users/" + authResp.userID, {
      method: 'GET'
    })
    userResp = await userResp.json()
    const loggedUser = {
      token: authResp.token,
      _id: userResp._id,
      name: userResp.name,
      surname: userResp.surname,
      isModerator: userResp.isModerator,
      userSensitiveID: userResp.userSensitiveID
    }
    setLoggedUser(loggedUser)
    $cookies.set('user', loggedUser)
    router.push({name: 'home'})
  }
}

onMounted(() => {
  formValidation()
})
</script>

<template>
  <div id="loginForm" class="mx-auto container-sm">
    <form ref="form" class="needs-validation" @submit.prevent="handleSubmit" novalidate="novalidate">
      <div class="my-4">
        <label class="form-label" for="emailAdress">Indirizzo e-mail</label>
        <input class="form-control" type="text" id="emailAdress" v-model="emailAddress" pattern=".*@.*" required="required" />
        <div class="invalid-feedback">Inserisci un indirizzo e-mail valido</div>
      </div>
      <div class="my-4">
        <label class="form-label" for="password">Password</label>
        <input class="form-control" type="password" id="password" v-model="password" required="required" />
        <div class="invalid-feedback">Inserisci una password</div>
      </div>
      <div class="my-4">
        <button class="btn btn-primary" type="submit">Login</button>
      </div>
    </form>
  </div>
  <div class="modal fade" id="wrongCredentialsModal" tabindex="-1" aria-labelledby="wrongCredentialsModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="wrongCredentialsModalLabel">Credenziali errate</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          L'indirizzo e-mail e/o la password inseriti sono errati
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Ok</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#loginForm{
  max-width: 1000px
}
</style>