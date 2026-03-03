import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Send from '../views/Send.vue'
import Settings from '../views/Settings.vue'
import StartPage from '../views/StartPage.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/send', name: 'Send', component: Send },
  { path: '/startpage', name: 'SendStart', component: StartPage},
  { path: '/settings', name: 'Settings', component: Settings }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
