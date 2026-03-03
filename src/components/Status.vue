<template>
    <div v-if="visible" class="mb-4">
        <div v-if="type === 'success'" class="alert alert-success d-flex align-items-center mb-2" role="alert">
          <i class="bi bi-check-circle-fill me-2"></i>
          <div>{{ message }}</div>
        </div>
        <div v-else-if="type === 'error'" class="alert alert-danger d-flex align-items-center" role="alert">
          <i class="bi bi-x-circle-fill me-2"></i>
          <div>{{ message }}</div>
        </div>
    </div>
</template>
<script setup>

defineProps({
    visible: {
        type: Boolean,
        required: true
    },
    type: {
        type: String,
        required: true,
        validator: value => ['success', 'error', 'empty'].includes(value)
    },
    message: {
        type: String,
        required:true
    }
});
</script>