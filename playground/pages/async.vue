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
  padding: 80px 20px 20px;
}

.spacer {
  height: 200px;
}

.hint {
  background: #e3f2fd;
  padding: 12px 16px;
  border-radius: 8px;
  border-left: 4px solid #2196f3;
}

.loading {
  padding: 40px;
  background: #fff3cd;
  border-radius: 8px;
  text-align: center;
  font-size: 1.2rem;
}

.items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.item {
  padding: 20px;
  background: #f3e5f5;
  border-radius: 8px;
  border-left: 4px solid #9c27b0;
}

.item h3 {
  margin: 0 0 8px 0;
  color: #7b1fa2;
}

.item p {
  margin: 0 0 8px 0;
}

.item code {
  background: #e0e0e0;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.85rem;
}

section {
  padding: 20px;
  background: #e8f4f8;
  border-radius: 8px;
}

section h2 {
  margin-top: 0;
}

code {
  background: #e0e0e0;
  padding: 2px 6px;
  border-radius: 4px;
}
</style>
