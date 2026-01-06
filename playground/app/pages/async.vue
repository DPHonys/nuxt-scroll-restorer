<template>
  <UContainer class="py-8">
    <h1 class="text-3xl font-bold text-highlighted mb-2">Async Data Page</h1>
    <p class="text-muted mb-4">
      This page simulates fetching data from an API. The items don't exist until
      the data loads.
    </p>

    <UAlert
      color="info"
      title="Test async anchor navigation"
      description="Try navigating to /async#item-5 - the element doesn't exist until after data loads."
      icon="i-lucide-info"
      class="mb-8"
    />

    <div class="h-[200px]" />

    <UCard v-if="loading" variant="subtle" class="text-center">
      <div class="flex items-center justify-center gap-3 py-4">
        <UIcon name="i-lucide-loader-circle" class="animate-spin text-xl" />
        <span class="text-lg"
          >Fetching data... ({{ countdown }}s remaining)</span
        >
      </div>
    </UCard>

    <div v-else class="flex flex-col gap-4">
      <UCard
        v-for="item in items"
        :id="`item-${item.id}`"
        :key="item.id"
        variant="subtle"
        class="border-l-4 border-l-primary"
      >
        <h3 class="text-lg font-semibold text-highlighted mb-1">
          {{ item.title }}
        </h3>
        <p class="text-muted mb-2">{{ item.description }}</p>
        <code class="text-sm bg-muted px-2 py-1 rounded"
          >/async#item-{{ item.id }}</code
        >
      </UCard>
    </div>

    <div class="h-[200px]" />

    <UCard id="bottom" variant="subtle">
      <h2 class="text-xl font-semibold text-highlighted mb-2">
        Bottom Section
      </h2>
      <p class="mb-2">
        This section exists immediately, unlike the items above.
      </p>
      <UButton to="/" variant="link" class="p-0">Go back home</UButton>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
interface Item {
  id: number
  title: string
  description: string
}

const loading = ref(true)
const countdown = ref(2)
const items = ref<Item[]>([])

// Simulate API fetch with delay
onMounted(async () => {
  // Countdown timer for visual feedback
  const interval = setInterval(() => {
    countdown.value--
  }, 1000)

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000))

  clearInterval(interval)

  // "Fetched" data
  items.value = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    description: `This is the description for item ${i + 1}. It was loaded asynchronously after a 2 second delay.`,
  }))

  loading.value = false
})
</script>
