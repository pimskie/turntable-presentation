<template>
  <nav class="nav">
    <router-link class="nav__link nav__link--prev" v-if="previousLink" :to="previousLink.path">
      <ArrowLeft />
      {{ previousLink.name }}
    </router-link>

    <router-link class="nav__link nav__link--next" v-if="nextLink" :to="nextLink.path">
      {{ nextLink.name }}
      <ArrowRight />
    </router-link>
  </nav>
</template>

<script setup lang="ts">
type Link =
  | {
      path: string;
      name: string;
    }
  | undefined;

import { computed } from 'vue';
import { useRouter } from 'vue-router';

import ArrowLeft from '@/assets/icons/arrow-left-circle-line.svg';
import ArrowRight from '@/assets/icons/arrow-right-circle-line.svg';

const router = useRouter();

const allRoutes = computed(() => router.getRoutes());
const currentRoute = computed(() => router.currentRoute.value);

const toCamelCase = (routeName: string) =>
  routeName
    .replace(/-/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const getRouteByIndex = (index: number) => {
  if (index < 0 || index > allRoutes.value.length - 1) {
    return undefined;
  }

  const route = allRoutes.value[index];
  const link: Link = {
    path: route.path,
    name: toCamelCase(route.name as string)
  };

  return link;
};

const routeIndex = computed(() =>
  allRoutes.value.findIndex((r) => r.path === currentRoute.value.path)
);

const nextLink = computed(() => getRouteByIndex(routeIndex.value + 1));
const previousLink = computed(() => getRouteByIndex(routeIndex.value - 1));
</script>

<style scoped>
.nav {
  display: flex;
}

.nav__link {
  display: flex;
  gap: var(--size-2);
  align-items: center;
}

.nav__link svg {
  width: 2rem;
}
.nav__link--next {
  margin-inline-start: auto;
}

.nav a {
  color: var(--gray-0);
  text-decoration: underline;
}

.nav a:hover {
  text-decoration: none;
}
</style>
