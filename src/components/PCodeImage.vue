<template>
  <img :src="getImageURL" :alt="alt" class="image" :class="{ 'pull-out': pullout }" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  src: string;
  alt?: string;
  pullout?: boolean;
}>();

const getImageURL = computed(() => `/turntable-presentation/images/${props.src}`);
</script>

<style scoped>
.image {
  margin-block-end: var(--size-8);
}

.image.pull-out {
  margin: 0 -5rem;
  width: calc(100% + 10rem);
  max-inline-size: unset;
}
</style>
