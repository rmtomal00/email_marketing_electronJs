<script setup lang="ts">
import Dialog from 'primevue/dialog'

defineProps<{
  visible: boolean
  title: string
  message: string
}>()

defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()
</script>

<template>
  <Dialog 
  :visible="visible" 
  :header="title"
  @update:visible="$emit('update:visible', $event)"
  :modal="true"
  :pt="{
    header: { class: 'bg-blue-500' },
    headerTitle: { class: 'text-white text-xl font-bold' },
    content: { class: 'p-4' }
  }">
    <p>{{ message }}</p>
  </Dialog>
</template>