<template>
  <div class="page">
    <h1>Async Data Page</h1>
    <p>
      This page simulates fetching data from an API. The items don't exist until
      the data loads.
    </p>
    <p class="hint">
      Try navigating to <code>/async#item-5</code> - the element doesn't exist
      until after data loads.
    </p>

    <div class="spacer" />

    <div v-if="loading" class="loading">
      <p>Fetching data... ({{ countdown }}s remaining)</p>
    </div>

    <div v-else class="items">
      <div
        v-for="item in items"
        :id="`item-${item.id}`"
        :key="item.id"
        class="item"
      >
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        <code>/async#item-{{ item.id }}</code>
      </div>
    </div>

    <div class="spacer" />

    <section id="bottom">
      <h2>Bottom Section</h2>
      <p>This section exists immediately, unlike the items above.</p>
      <p>
        <NuxtLink to="/">Go back home</NuxtLink>
      </p>
    </section>
  </div>
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

<style scoped>
.page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.spacer {
  height: 200px;
}

.hint {
  background: #dbeafe;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
}

.loading {
  padding: 2rem;
  background: #fef3c7;
  border-radius: 8px;
  text-align: center;
  font-size: 1.1rem;
  border: 1px solid #fcd34d;
}

.items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item {
  padding: 1.25rem;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #00dc82;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.item h3 {
  margin: 0 0 0.5rem 0;
  color: #020420;
}

.item p {
  margin: 0 0 0.5rem 0;
}

section {
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

section h2 {
  margin-top: 0;
  color: #020420;
}

h1 {
  color: #020420;
  margin-bottom: 0.5rem;
}
</style>
