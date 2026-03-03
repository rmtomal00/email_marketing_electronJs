<template>
    <Transition name="spinner-fade">
        <div v-if="loading" class="spinner-overlay" aria-modal="true" role="dialog" aria-label="Loading">
            <div class="spinner-backdrop" />
            <ProgressSpinner
                style="width: 60px; height: 60px"
                strokeWidth="6"
                fill="transparent"
                animationDuration=".5s"
                :aria-label="ariaLabel"
            />
        </div>
    </Transition>
</template>

<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner'

withDefaults(defineProps<{
    loading:   boolean
    ariaLabel?: string
}>(), {
    ariaLabel: 'Loading...'
})
</script>

<style scoped>
.spinner-overlay {
    position: fixed;
    inset: 0;                      /* top/right/bottom/left: 0 */
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: all;           /* blocks all clicks underneath */
}

.spinner-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
}

/* Spinner sits above the backdrop */
:deep(.p-progress-spinner) {
    position: relative;
    z-index: 1;
}

.spinner-fade-enter-active,
.spinner-fade-leave-active {
    transition: opacity 0.25s ease;
}
.spinner-fade-enter-from,
.spinner-fade-leave-to {
    opacity: 0;
}
</style>