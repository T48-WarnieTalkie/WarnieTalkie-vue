import '@/assets/custom-bootstrap.scss'
import 'leaflet/dist/leaflet.css'
import '@/assets/style.css'

import { createApp } from 'vue'
import App from './app.vue'
import router from './router'
import VueCookies from 'vue-cookies'

router.beforeEach(() => {
  import('bootstrap')
})

const app = createApp(App)

app.use(router)
app.use(VueCookies)

app.mount('#app')

import 'leaflet/dist/leaflet.js'
