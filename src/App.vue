<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="navigation">
    <nav class="wrapper">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/contact">Contact</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/portfolio">Portfolio</RouterLink>
    </nav>
  </header>

  <div class="main">
    <div class="profile">
      <img class="pic" src="/ProfilePic.jpg" />
    </div>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.logo {
  width: 5%;
}

.main {
  display: flex;
  flex-direction: column; /* Stack items vertically */
  align-items: center; /* Center items horizontally */
  justify-content: center;
}

.pic {
  width: 25%;
  height: 50%;
}

.profile {
  display: flex;
  justify-content: center;
  padding: 2rem; /* Reduced padding for mobile */
  width: 100%;
  margin: auto;
}

.content {
  padding: 2rem; /* Reduced padding for mobile */
  width: 90%; /* Use a percentage for width */
  margin: auto;
}

.navigation {
  padding: 1rem; /* Reduced padding for mobile */
}

nav {
  width: 100%;
  font-size: 14px; /* Slightly larger font for better readability */
  text-align: center;
  margin-top: 1rem; /* Reduced margin for mobile */
}

nav a {
  display: inline-block;
  padding: 0.5rem 1rem; /* Adjusted padding for better touch targets */
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
