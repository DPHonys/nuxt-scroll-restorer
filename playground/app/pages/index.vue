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
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.spacer {
  height: 600px;
}

section {
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
