<template>
  <div class="layout">
    <PHeader />

    <main class="main">
      <div class="container">
        <div class="stack">
          <RouterView />
          <PNavigation />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import PHeader from './components/PHeader.vue';
import PNavigation from './components/PNavigation.vue';
</script>

<style scoped>
.layout {
  padding-block: var(--size-3);
}

.stack {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-default);
}
</style>
