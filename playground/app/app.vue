<template>
  <UApp>
    <UHeader title="Nuxt Scroll Restorer">
      <UNavigationMenu :items="navItems" />

      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>

    <UMain>
      <ScrollRestorer>
        <NuxtPage />
      </ScrollRestorer>
    </UMain>
  </UApp>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const navItems = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Home',
    to: '/',
    active: route.path === '/',
  },
  {
    label: 'High Page',
    to: '/high',
    active: route.path === '/high',
  },
  {
    label: 'Low Page',
    to: '/low',
    active: route.path === '/low',
  },
  {
    label: 'Async Data',
    to: '/async',
    active: route.path === '/async',
  },
])
</script>
