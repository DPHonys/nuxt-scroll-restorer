<script setup lang="ts">
import { useRuntimeConfig } from '#app'
import useScrollRestorer from '../composables/useScrollRestorer'

const { scrollRestorer: config } = useRuntimeConfig().public

useScrollRestorer(config)
</script>

<template>
  <slot />
</template>
