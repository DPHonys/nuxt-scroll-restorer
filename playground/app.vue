<template>
  <ScrollRestorer>
    <nav class="nav">
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/high">High Page</NuxtLink>
      <NuxtLink to="/low">Low Page</NuxtLink>
      <NuxtLink to="/async">Async Data</NuxtLink>
    </nav>
    <NuxtPage />
  </ScrollRestorer>
</template>

<style>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid #ccc;
  z-index: 100;
}

.nav a {
  color: #333;
  text-decoration: none;
}

.nav a:hover {
  text-decoration: underline;
}

body {
  margin: 0;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}
</style>
