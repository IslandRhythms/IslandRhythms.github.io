<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="navigation">
    <nav class="wrapper">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/portfolio">Portfolio</RouterLink>
    </nav>
  </header>

  <div class="main">
    <div class="profile">
      <img src="/public/ProfilePic.jpg" />
    </div>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: center;
}

.profile {
  display: flex;
  justify-content: center;
  padding: 4rem;
  width: 100%;
  margin: auto;
}

.content {
  padding: 4rem;
  width: 100%;
  margin: auto;
}
.navigation {
  padding: 2rem;
}
header {
  line-height: 0.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
