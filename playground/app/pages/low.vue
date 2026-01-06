<template>
  <div class="page">
    <h1>Low Page (Short Content)</h1>
    <p>This page has minimal content.</p>

    <div class="content">
      <p>
        Navigate to other pages and use the browser back button to test scroll
        restoration.
      </p>
      <p>
        <NuxtLink to="/">Home</NuxtLink> |
        <NuxtLink to="/high">High Page</NuxtLink> |
        <NuxtLink to="/high#lazy-section">High Page Lazy Section</NuxtLink>
      </p>
      <p>
        <NuxtLink to="/async">Async Data</NuxtLink> |
        <NuxtLink to="/async#item-5">Async Item 5 (delayed)</NuxtLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.content {
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.content p {
  margin: 0.75rem 0;
}

h1 {
  color: #020420;
  margin-bottom: 0.5rem;
}
</style>
