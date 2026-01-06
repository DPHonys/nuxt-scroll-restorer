<template>
  <div class="page">
    <h1>High Page (Tall Content)</h1>
    <p>
      This page has lots of content to test scroll restoration with lazy
      content.
    </p>

    <div class="spacer" />

    <section id="section-1">
      <h2>Section 1</h2>
      <p>You can link directly to this section: <code>/high#section-1</code></p>
    </section>

    <div class="spacer" />

    <!-- Simulate lazy-loaded content -->
    <section v-if="showLazy" id="lazy-section">
      <h2>Lazy Section (loaded after 1s)</h2>
      <p>
        This section appears after a delay to test anchor waiting. Link:
        <code>/high#lazy-section</code>
      </p>
    </section>
    <div v-else class="loading">Loading lazy content...</div>

    <div class="spacer" />

    <section id="section-2">
      <h2>Section 2</h2>
      <p>Another section for testing.</p>
    </section>

    <div class="spacer" />

    <section id="bottom">
      <h2>Bottom Section</h2>
      <p>
        You've reached the bottom! Scroll position should be saved when you
        navigate away.
      </p>
      <p><NuxtLink to="/">Go back home</NuxtLink></p>
    </section>

    <div class="spacer" />
  </div>
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

<style scoped>
.page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.spacer {
  height: 800px;
}

section {
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.loading {
  padding: 2rem;
  background: #fef3c7;
  border-radius: 8px;
  text-align: center;
  border: 1px solid #fcd34d;
}

h1 {
  color: #020420;
  margin-bottom: 0.5rem;
}

h2 {
  margin-top: 0;
  color: #020420;
}
</style>
