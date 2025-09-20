<script setup></script>

<template>
  <main>
    <div class="home">
      <div class="description">
        <div class="text-center">
          Hi, I’m Daniel Christian Diaz—a passionate web developer with 4 years of experience
          building engaging and user-friendly digital experiences. My work combines creativity,
          problem-solving, and technical expertise to bring ideas to life, whether it’s crafting
          dynamic web applications or solving complex challenges with clean, efficient code. Take a
          look at my portfolio to explore the projects I’ve worked on, from responsive web designs
          to interactive applications. If you’re looking for a developer who’s detail-oriented,
          driven, and ready to take on new challenges, let’s connect!
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.home {
  display: flex;
  flex-grow: 1;
  justify-content: space-evenly;
  max-width: 600px;
  min-width: 320px;
  margin: auto;
  width: 100%;
  box-sizing: border-box;
}

.description {
  width: 75%;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .home {
    min-width: 280px;
    padding: 0 1rem;
    max-width: 100%;
  }
}
</style>
