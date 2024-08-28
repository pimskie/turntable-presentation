<template>
  <div class="field">
    <slot />
  </div>
</template>

<style scoped>
.field {
  display: flex;
  align-items: center;
  gap: var(--size-2);
}
</style>
