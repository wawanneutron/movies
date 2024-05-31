<template>
  <aside class="relative h-[100vh] w-[480px] max-w-[480px] overflow-auto rounded-md bg-slate-800">
    <button
      @click="isOpen = !isOpen"
      class="absolute right-2 mt-2 h-7 w-7 rounded-full bg-slate-500"
    >
      {{ isOpen ? '-' : '+' }}
    </button>

    <slot v-if="isOpen" />
  </aside>
</template>

<script setup>
import { ref } from 'vue'

let isOpen = ref(true)
</script>
