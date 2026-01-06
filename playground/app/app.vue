<template>
  <ScrollRestorer>
    <header class="header">
      <div class="header-content">
        <NuxtLink to="/" class="logo"> Nuxt Scroll Restorer </NuxtLink>
        <nav class="nav">
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/high">High Page</NuxtLink>
          <NuxtLink to="/low">Low Page</NuxtLink>
          <NuxtLink to="/async">Async Data</NuxtLink>
        </nav>
      </div>
    </header>
    <main class="main">
      <NuxtPage />
    </main>
  </ScrollRestorer>
</template>

<style>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #020420;
  border-bottom: 1px solid #1a1a2e;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-weight: 600;
  font-size: 1.1rem;
  color: #00dc82 !important;
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav a {
  color: #a0aec0;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.nav a:hover,
.nav a.router-link-active {
  color: #00dc82;
  text-decoration: none;
}

.main {
  padding-top: 60px;
}
</style>
