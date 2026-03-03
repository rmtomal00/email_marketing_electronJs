import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Chart from 'primevue/chart';
import { Dialog, ProgressSpinner } from 'primevue';
import Button from "primevue/button"
import Editor from 'primevue/editor';

import {createPinia} from 'pinia'

import Aura from '@primeuix/themes/aura';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'primeicons/primeicons.css'

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.component("Chart", Chart)
app.component("Dialog", Dialog)
app.component("ProgressSpinner", ProgressSpinner)
app.component("Editor", Editor)
app.component("Button", Button)

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})
app.mount('#app').$nextTick(() => {
  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})
