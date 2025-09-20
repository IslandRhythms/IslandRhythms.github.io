<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-container">
  <header class="py-2 shadow-sm navbar">
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

  <main class="main container py-5">
    <div class="profile text-center">
      <img
        class="pic rounded-circle img-fluid"
        src="/WebsiteProfilePic.png"
        alt="Profile Picture"
      />
    </div>
    <div class="content mt-4">
      <RouterView />
    </div>
  </main>
  </div>
</template>

<style scoped>
.app-container {
  min-width: 320px;
  max-width: 100vw;
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;
}

.main {
  display: flex;
  flex-direction: column;
}

.navbar {
  background-color: var(--bs-dark);
  color: var(--bs-body-color);
}

/* Light mode navbar styling */
@media (prefers-color-scheme: light) {
  .navbar {
    background-color: var(--bs-light);
    color: var(--bs-dark);
  }
  
  .navbar .nav-link {
    color: var(--bs-dark) !important;
  }
  
  .navbar .nav-link:hover {
    color: var(--bs-primary) !important;
  }
}

/* Dark mode navbar styling */
@media (prefers-color-scheme: dark) {
  .navbar {
    background-color: var(--bs-dark);
    color: var(--bs-body-color);
  }
  
  .navbar .nav-link {
    color: var(--bs-body-color) !important;
  }
  
  .navbar .nav-link:hover {
    color: var(--bs-warning) !important;
  }
}

.logo-container {
  max-width: 120px; /* Control logo size */
}

.logo {
  width: 100%;
}

.profile {
  max-width: 600px;
  min-width: 320px;
  margin: auto;
  width: 100%;
  box-sizing: border-box;
  padding: 0 1rem;
}

.pic {
  max-width: 150px; /* Adjust profile picture size */
  height: auto;
  border: 2px solid #ddd;
  padding: 5px;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .app-container {
    min-width: 280px;
  }
  
  .profile {
    min-width: 280px;
    padding: 0 1rem;
    max-width: 100%;
  }
}

.nav-links .nav-link:hover {
  text-decoration: underline;
}
</style>
