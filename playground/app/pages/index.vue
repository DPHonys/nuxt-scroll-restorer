<template>
  <UContainer class="py-8">
    <h1 class="text-3xl font-bold text-highlighted mb-2">Home Page</h1>
    <p class="text-muted mb-8">
      Scroll down and navigate to other pages to test scroll restoration.
    </p>

    <div class="h-[600px]" />

    <UCard id="section-1" variant="subtle">
      <h2 class="text-xl font-semibold text-highlighted mb-2">Section 1</h2>
      <p>
        This is section 1.
        <NuxtLink to="/high#section-1" class="text-primary hover:underline">
          Link to High Page Section 1
        </NuxtLink>
      </p>
    </UCard>

    <div class="h-[600px]" />

    <UCard id="section-2" variant="subtle">
      <h2 class="text-xl font-semibold text-highlighted mb-2">Section 2</h2>
      <p>
        This is section 2.
        <NuxtLink to="/#section-1" class="text-primary hover:underline">
          Link to Section 1
        </NuxtLink>
      </p>
    </UCard>

    <div class="h-[600px]" />

    <UCard id="section-3" variant="subtle">
      <h2 class="text-xl font-semibold text-highlighted mb-2">Section 3</h2>
      <p>
        This is section 3. Navigate away and come back with browser back button
        to test scroll restoration.
      </p>
    </UCard>

    <div class="h-[600px]" />
  </UContainer>
</template>
