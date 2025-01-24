<script setup>
import GameView from './sectors/GameView.vue'
import SoftwareView from './sectors/SoftwareView.vue'
import WebView from './sectors/WebView.vue'
</script>

<template>
  <div class="portfolio">
    <div class="text-center portfolio-intro">
      Over the course of my career, I have had the privilege of contributing to a variety of professional projects and websites.
      While confidentiality prevents me from showcasing many of these works,
      I am pleased to present a selection of personal and publicly shareable projects that highlight my skills and experience.
    </div>
    <WebView class="sectors"/>
    <GameView class="sectors"/>
    <SoftwareView class="sectors"/>
  </div>
</template>


<style>
.portfolio-intro {
  max-width: 500px;
  margin: auto;
}

.sectors {
 max-width: 600px;
 margin: auto;
}
</style>
