<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="py-2 shadow-sm navbar navbar-dark">
    <nav class="container d-flex align-items-center justify-content-between">
      <!-- Logo -->
      <div class="logo-container">
        <RouterLink to="/">
          <img class="logo img-fluid" src="/Logo.png" alt="Logo" />
        </RouterLink>
      </div>

      <!-- Navigation Links -->
      <div class="nav-links">
        <RouterLink class="nav-link d-inline-block mx-2" to="/">Home</RouterLink>
        <RouterLink class="nav-link d-inline-block mx-2" to="/contact">Contact</RouterLink>
        <RouterLink class="nav-link d-inline-block mx-2" to="/about">About</RouterLink>
        <RouterLink class="nav-link d-inline-block mx-2" to="/portfolio">Portfolio</RouterLink>
      </div>
    </nav>
  </header>

  <main class="main container my-5">
    <div class="profile text-center">
      <img
        class="pic rounded-circle img-fluid"
        src="/WebsiteProfilePic.jpg"
        alt="Profile Picture"
      />
    </div>
    <div class="content mt-4 p-5">
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
