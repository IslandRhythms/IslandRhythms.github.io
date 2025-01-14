<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="navigation bg-light py-2 shadow-sm">
    <nav class="container d-flex align-items-center justify-content-between">
      <!-- Logo -->
      <div class="logo-container">
        <RouterLink to="/">
          <img class="logo img-fluid" src="/Logo.png" alt="Logo" />
        </RouterLink>
      </div>

      <!-- Navigation Links -->
      <div class="nav-links">
        <RouterLink class="nav-link d-inline-block mx-2 text-dark" to="/">Home</RouterLink>
        <RouterLink class="nav-link d-inline-block mx-2 text-dark" to="/contact"
          >Contact</RouterLink
        >
        <RouterLink class="nav-link d-inline-block mx-2 text-dark" to="/about">About</RouterLink>
        <RouterLink class="nav-link d-inline-block mx-2 text-dark" to="/portfolio"
          >Portfolio</RouterLink
        >
      </div>
    </nav>
  </header>

  <main class="main container my-5">
    <div class="profile text-center">
      <img class="pic rounded-circle img-fluid" src="/ProfilePic.jpg" alt="Profile Picture" />
    </div>
    <div class="content mt-4">
      <RouterView />
    </div>
  </main>
</template>

<style scoped>
.logo-container {
  max-width: 120px; /* Control logo size */
}

.logo {
  width: 100%;
}

.pic {
  max-width: 150px; /* Adjust profile picture size */
  height: auto;
  border: 2px solid #ddd;
  padding: 5px;
}

.nav-links .nav-link:hover {
  text-decoration: underline;
}
</style>
