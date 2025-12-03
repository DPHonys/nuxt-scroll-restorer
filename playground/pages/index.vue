<template>
  <div class="page">
    <h1>Home Page</h1>
    <p>Scroll down and navigate to other pages to test scroll restoration.</p>

    <div class="spacer" />

    <section id="section-1">
      <h2>Section 1</h2>
      <p>
        This is section 1.
        <NuxtLink to="/high#section-1">Link to High Page Section 1</NuxtLink>
      </p>
    </section>

    <div class="spacer" />

    <section id="section-2">
      <h2>Section 2</h2>
      <p>
        This is section 2.
        <NuxtLink to="/#section-1">Link to Section 1</NuxtLink>
      </p>
    </section>

    <div class="spacer" />

    <section id="section-3">
      <h2>Section 3</h2>
      <p>
        This is section 3. Navigate away and come back with browser back button
        to test scroll restoration.
      </p>
    </section>

    <div class="spacer" />
  </div>
</template>

<style scoped>
.page {
  padding: 80px 20px 20px;
}

.spacer {
  height: 600px;
}

section {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}

h2 {
  margin-top: 0;
}
</style>
