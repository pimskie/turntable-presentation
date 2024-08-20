<template>
  <div class="controls">
    <slot />
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  gap: var(--size-3);
  align-items: center;
}
</style>
