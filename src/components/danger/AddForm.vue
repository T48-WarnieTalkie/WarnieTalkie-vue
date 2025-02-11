<script setup>
import formValidation from '@/utility/form-validation';
import { onMounted, ref, useTemplateRef } from 'vue';
import { loggedUser } from '@/states/loggedUser';

let category = ref();
let shortDescription = ref();
var addDangerMap;
var handleSubmit;

var form = useTemplateRef('form')
var formCompleted = ref(false)

onMounted(() => {
  formValidation();
  addDangerMap = L.map('addDangerMap');

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(addDangerMap);

  addDangerMap.setView([46.064638, 11.150307], 16);

  handleSubmit = () => {
    if(form.value.checkValidity()) {
      fetch(import.meta.env.VITE_API_ENDPOINT + "/dangers", {
        method: "POST",
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + loggedUser.token
          },
        body: JSON.stringify({
          category: category.value,
          shortDescription: shortDescription.value,
          coordinates: [addDangerMap.getCenter().lat, addDangerMap.getCenter().lng],
          status: 'waiting-approval',
          userID: loggedUser._id,
          expiration: null,
          sendTimestamp: new Date()
        })
      }).then(() => formCompleted.value = true)
    }
  }
})
</script>

<template>
  <div id="dangerForm" class="mx-auto container-sm">
    <div v-if="formCompleted" class="my-4">
      <h2>Segnalazione inviata!</h2>
      <p>La segnalazione sarà mostrata sulla mappa quando un moderatore la approverà.</p>
      <RouterLink to="/danger/sent">Mostra tutte le segnalazioni che hai inviato</RouterLink> 
      <br>
      <RouterLink to="/">Torna alla mappa</RouterLink>
    </div>
    <form v-else ref="form" class="needs-validation" @submit.prevent="handleSubmit()" novalidate="novalidate">
      <div class="my-4">
          <label class="form-label" for="category">Categoria</label>
          <select class="form-select" v-model="category" name="category" required="required">
            <option selected="selected" disabled="disabled" value="">Scegli...</option>
            <option value="animale-pericoloso">Animale pericoloso</option>
            <option value="calamita-ambientale">Calamità ambientale </option>
            <option value="sentiero-inagibile">Sentiero inagibile </option>
            <option value="altro">Altro</option>
          </select>
          <div class="invalid-feedback">Inserisci una categoria</div>
      </div>
      <div class="my-4">
        <label class="form-label" for="shortDescription">Breve descrizione</label>
        <textarea class="form-control" type="text" v-model="shortDescription" name="shortDescription" minlenght="10" required="required"></textarea>
        <div class="invalid-feedback">La descrizione deve essere lunga almeno 10 caratteri</div>
      </div>
      <div class="my-4"><label class="form-label">Posizione</label>
        <div id="addDangerMap" style="height: 400px;">
          <img id="markerIcon" class="position-absolute" src="@/assets/marker-icon.png"/>
        </div>
      </div>
      <div class="my-4"><button class="btn btn-primary" id="submitButton" type="submit">Invia segnalazione</button></div>
    </form>
  </div>

</template>

<style scoped>
#markerIcon {
  height: 41px; 
  z-index: 10001; 
  margin: auto; 
  top: 0; 
  bottom: 41px; 
  left:0; 
  right:0;
}

#dangerForm {
  max-width: 1000px;
}
</style>