<script setup>
import { onMounted, ref, useTemplateRef } from 'vue'
import formValidation from '@/utility/form-validation'
import { Modal } from 'bootstrap'

let handleSubmit
let form = useTemplateRef('form')
let name = ref()
let surname = ref()
let cellphoneNumber = ref()
let emailAddress = ref()
let password = useTemplateRef('password')
let confirmPassword = useTemplateRef('passwordConfirm')

let registered = ref(false)

function confirmPasswordValidation() {
  if(password.value.value != confirmPassword.value.value) {
    confirmPassword.value.setCustomValidity('invalid')
  } else {
    confirmPassword.value.setCustomValidity('')
  }
}

onMounted(() => {
  formValidation()

  handleSubmit = async () => {
    if(form.value.checkValidity()) {
      let userSensitiveResp = await fetch(import.meta.env.VITE_API_ENDPOINT + '/userSensitives/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cellphoneNumber: cellphoneNumber.value,
          emailAddress: emailAddress.value,
          password: password.value.value
        }),
      })
      if(userSensitiveResp.status == 409) {
        new Modal('#existingAccountModal').show()
        return
      } else if(userSensitiveResp.status == 400) {
        new Modal('#wrongInfoModal').show()
        return
      }
      let userResp = await fetch(import.meta.env.VITE_API_ENDPOINT + '/users/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name.value,
          surname: surname.value,
          userSensitiveID: userSensitiveResp.headers.get('Location')
        })
      })
      if(userResp.status == 400) {
        new Modal('#wrongInfoModal').show()
        return
      }
      registered.value = true
    }
  }
})
</script>

<template>
  <div class="mx-auto container-sm" style="max-width: 1000px">
    <div v-if="registered" class="my-4">
      <h2>Registrazione avvenuta con successo!</h2>
      <RouterLink to="/login">Vai al login</RouterLink>
      <br />
      <RouterLink to="/">Torna alla mappa</RouterLink>
    </div>
    <form v-else ref="form" class="needs-validation" @submit.prevent="handleSubmit()" novalidate>
      <div class="my-4">
        <label class="form-label" for="name">Nome</label>
        <input class="form-control" type="text" id="name" name="name" v-model="name" required />
        <div class="invalid-feedback">Inserisci un nome</div>
      </div>
      <div class="my-4">
        <label class="form-label" for="surname">Cognome</label>
        <input class="form-control" type="text" id="surname" name="surname" v-model="surname" required/>
        <div class="invalid-feedback">Inserisci un cognome</div>
      </div>
      <div class="my-4">
        <label class="form-label" for="cellphoneNumber">Numero di telefono</label>
        <input class="form-control" type="text" id="cellphoneNumber" name="cellphoneNumber" pattern="[0-9]{10}" v-model="cellphoneNumber"required="required"/>
        <div class="invalid-feedback">Inserisci un numero di telefono valido (es. 1234567890)</div>
      </div>
      <div class="my-4">
        <label class="form-label" for="emailAddress">Indirizzo e-mail</label>
        <input class="form-control" type="email" id="emailAddress" name="emailAddress" pattern=".*@.*" v-model="emailAddress" required="required"/>
        <div class="invalid-feedback">
          Inserisci un indirizzo e-mail valido (es. example@gmail.com)
        </div>
      </div>
      <div class="my-4">
        <label class="form-label" for="password">Password</label>
        <input ref="password" class="form-control" type="password" id="password" name="password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" @input="confirmPasswordValidation()"/>
        <div class="invalid-feedback">
          Inserisci una password valida. La password deve avere almeno 8 caratteri, includere almeno una lettera maiuscola, una lettera minuscola e un numero
        </div>
      </div>
      <div class="my-4">
        <label class="form-label" for="password">Conferma password</label>
        <input ref="passwordConfirm" class="form-control" type="password" id="confirmPassword" name="confirmPassword" required @input="confirmPasswordValidation()"/>
        <div class="invalid-feedback">La password e la sua conferma non corrispondono. Assicurati che entrambi i campi siano identici</div>
      </div>
      <div class="my-4">
        <button class="btn btn-primary" type="submit">Registrati</button>
      </div>
    </form>
  </div>
  <div class="modal fade" id="wrongInfoModal" tabindex="-1" aria-labelledby="wrongInfoModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">Informazioni errate</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Le informazioni inserite sono errate, riprova
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Ok</button>
        </div>
      </div>
    </div>
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
