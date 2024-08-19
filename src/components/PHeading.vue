<template>
  <component class="heading" :is="heading"><slot /></component>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    heading?: string;
  }>(),
  {
    heading: 'h1'
  }
);
</script>

<style scoped>
.heading {
  margin-block: 0 var(--size-3);
}
</style>
