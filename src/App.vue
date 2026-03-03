<template>
  <div class="app-container">
    <!-- Sidebar -->
    <div class="sidebar">
      <div
        v-for="(item, index) in navItems"
        :key="index"
        class="nav-item"
        @click="navigate(item.path)"
      >
        <component :is="item.icon" class="icon" />
        <small>{{ item.label }}</small>
      </div>
    </div>

    <!-- Main content -->
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { HomeIcon, PaperAirplaneIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'

const router = useRouter()

const navItems = [
  { icon: HomeIcon, label: 'Home', path: '/' },
  { icon: PaperAirplaneIcon, label: 'Send', path: '/send' },
  { icon: Cog6ToothIcon, label: 'Settings', path: '/settings' }
]
router.push({name:'Home'})
const navigate = (path: string) => {
  router.push(path)
}
</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
  overflow: hidden; /* prevent sidebar from pushing outside */
}

.sidebar {
  width: 60px;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
  overflow-y: auto; /* make sidebar scrollable if content exceeds */
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  cursor: pointer;
}

.nav-item small {
  color: white;
  margin-top: 0.25rem;
}

.icon {
  width: 28px;
  height: 28px;
  color: white;
  transition: color 0.2s, transform 0.2s;
}

.icon:hover {
  color: #42b883;
  transform: scale(1.2);
}

.main-content {
  flex: 1;
  overflow-y: auto; /* make main content scrollable */
  background-color: #f8f9fa; /* optional */
  padding: 1rem;
}
</style>