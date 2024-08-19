<template>
  <header class="header">
    <div class="container">
      <a href="https://pimskie.dev" target="_blank">
        <PLogo class="logo" />
      </a>
    </div>
  </header>
</template>

<script setup lang="ts">
import PLogo from './PLogo.vue';
</script>

<style scoped>
.header {
  margin-block-end: var(--size-4);
}
.logo {
  max-width: 4rem;
}
</style>
