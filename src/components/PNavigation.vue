<template>
  <nav>
    <router-link v-if="previousRoute" :to="previousRoute.path">Previous</router-link>
    <router-link v-if="nextRoute" :to="nextRoute.path">Next</router-link>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const allRoutes = computed(() => router.getRoutes());
const currentRoute = computed(() => router.currentRoute.value);

const getRouteByIndex = (index: number) => {
  if (index < 0 || index > allRoutes.value.length) {
    return undefined;
  }

  return allRoutes.value[index];
};

const routeIndex = computed(() =>
  allRoutes.value.findIndex((r) => r.path === currentRoute.value.path)
);

const nextRoute = computed(() => getRouteByIndex(routeIndex.value + 1));
const previousRoute = computed(() => getRouteByIndex(routeIndex.value - 1));
</script>
