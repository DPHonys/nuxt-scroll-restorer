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
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 80px 20px 20px;
}

.content {
  padding: 20px;
  background: #f0f8e8;
  border-radius: 8px;
}
</style>
