<script setup>
import { RouterLink } from 'vue-router'
import { loggedUser, isLogged } from '@/states/loggedUser'
import { clearLoggedUser } from '@/states/loggedUser'
import { inject } from 'vue'
import router from '@/router'
const $cookies = inject('$cookies')

function logout() {
  clearLoggedUser()
  $cookies.remove('user')
  if (router.currentRoute.value.name != 'home') {
    router.push({ name: 'home' })
  }
}

</script>

<template>
  <nav class="navbar sticky-top navbar-expand-sm bg-body">
    <div class="container-fluid">
      <RouterLink class="navbar-brand navbar-brand-text d-flex align-items-center" to="/">
        <img id="logo" src="@/assets/alert.svg" />
        <h3 class="m-0" id="brand">WarnieTalkie</h3>
      </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="navbar-nav container-fluid p-0">
          <div v-if="isLogged()" class="nav-item dropdown">
            <button
              class="btn border-secondary-subtle text-secondary dropdown-toggle d-flex align-items-center gap-1"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Aggiungi
            </button>
            <ul class="dropdown-menu dropdown-menu-start">
              <li>
                <RouterLink class="dropdown-item" to="/danger/add"
                  >Invia una segnalazione di pericolo</RouterLink
                >
              </li>
            </ul>
          </div>
          <div v-if="!isLogged()" class="btn-group ms-auto" role="group">
            <RouterLink class="btn border-secondary-subtle text-secondary" to="/login"
              >Accedi</RouterLink
            >
            <RouterLink class="btn border-secondary-subtle text-secondary" to="/register"
              >Registrati</RouterLink
            >
          </div>
          <div v-else class="d-flex ms-auto gap-2">
            <div v-if="loggedUser.isModerator" class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle text-success"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >Moderatore</a
              >
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <RouterLink class="dropdown-item" to="/danger/handle"
                    >Gestisci segnalazioni</RouterLink
                  >
                </li>
              </ul>
            </div>
            <div class="nav-item dropdown">
              <button
                class="btn border-secondary-subtle text-secondary dropdown-toggle d-flex align-items-center gap-1"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src="@/assets/avatar.svg" height="25" />
                <span>{{ loggedUser.name }} {{ loggedUser.surname }}</span>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <RouterLink class="dropdown-item" to="/danger/sent">
                    Le mie segnalazioni
                  </RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item" to="/user/info">Area riservata</RouterLink>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li><button @click="logout()" class="dropdown-item">Logout</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
#brand {
  font-size: 22px;
}

#logo {
  width: 30px;
}
</style>
