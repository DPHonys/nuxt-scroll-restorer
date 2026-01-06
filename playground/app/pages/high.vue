<template>
  <UContainer class="py-8">
    <h1 class="text-3xl font-bold text-highlighted mb-2">
      High Page (Tall Content)
    </h1>
    <p class="text-muted mb-8">
      This page has lots of content to test scroll restoration with lazy
      content.
    </p>

    <div class="h-[800px]" />

    <UCard id="section-1" variant="subtle">
      <h2 class="text-xl font-semibold text-highlighted mb-2">Section 1</h2>
      <p>
        You can link directly to this section:
        <code class="text-sm bg-muted px-2 py-1 rounded">/high#section-1</code>
      </p>
    </UCard>

    <div class="h-[800px]" />

    <!-- Simulate lazy-loaded content -->
    <UCard v-if="showLazy" id="lazy-section" variant="subtle">
      <h2 class="text-xl font-semibold text-highlighted mb-2">
        Lazy Section (loaded after 1s)
      </h2>
      <p>
        This section appears after a delay to test anchor waiting. Link:
        <code class="text-sm bg-muted px-2 py-1 rounded"
          >/high#lazy-section</code
        >
      </p>
    </UCard>
    <UCard v-else variant="subtle" class="text-center">
      <div class="flex items-center justify-center gap-3 py-4">
        <UIcon name="i-lucide-loader-circle" class="animate-spin text-xl" />
        <span>Loading lazy content...</span>
      </div>
    </UCard>

    <div class="h-[800px]" />

    <UCard id="section-2" variant="subtle">
      <h2 class="text-xl font-semibold text-highlighted mb-2">Section 2</h2>
      <p>Another section for testing.</p>
    </UCard>

    <div class="h-[800px]" />

    <UCard id="bottom" variant="subtle">
      <h2 class="text-xl font-semibold text-highlighted mb-2">
        Bottom Section
      </h2>
      <p class="mb-2">
        You've reached the bottom! Scroll position should be saved when you
        navigate away.
      </p>
      <UButton to="/" variant="link" class="p-0">Go back home</UButton>
    </UCard>

    <div class="h-[800px]" />
  </UContainer>
</template>

<script setup lang="ts">
const showLazy = ref(false)

onMounted(() => {
  // Simulate lazy content loading
  setTimeout(() => {
    showLazy.value = true
  }, 1000)
})
</script>
