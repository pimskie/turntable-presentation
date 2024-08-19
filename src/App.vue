<template>
  <div class="layout">
    <PHeader />

    <main class="main">
      <div class="container">
        <RouterView />

        <PNavigation />
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
</style>
