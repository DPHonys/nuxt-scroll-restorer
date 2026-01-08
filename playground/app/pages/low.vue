<template>
  <UContainer class="py-8">
    <h1 class="text-3xl font-bold text-highlighted mb-2">
      Low Page (Short Content)
    </h1>
    <p class="text-muted mb-8">This page has minimal content.</p>

    <UCard variant="subtle">
      <p class="mb-4">
        Navigate to other pages and use the browser back button to test scroll
        restoration.
      </p>
      <div class="flex flex-wrap gap-2">
        <UButton to="/" variant="soft">Home</UButton>
        <UButton to="/high" variant="soft">High Page</UButton>
        <UButton to="/high#lazy-section" variant="soft">
          High Page Lazy Section
        </UButton>
        <UButton to="/async" variant="soft">Async Data</UButton>
        <UButton to="/async#item-5" variant="soft">
          Async Item 5 (delayed)
        </UButton>
      </div>
    </UCard>
  </UContainer>
</template>
