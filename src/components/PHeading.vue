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
