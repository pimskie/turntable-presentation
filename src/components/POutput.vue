<template>
  <div class="output">
    <span v-if="label">{{ label }}: </span>
    {{ value }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: number | boolean;
  label?: string;
}>();
</script>

<style scoped>
.output {
  font-family: var(--font-monospace-code);
}
</style>
