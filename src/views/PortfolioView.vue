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
.portfolio {
  max-width: 600px;
  min-width: 320px;
  margin: auto;
  width: 100%;
  box-sizing: border-box;
}

.portfolio-intro {
  max-width: 500px;
  min-width: 320px;
  margin: auto;
  width: 100%;
  box-sizing: border-box;
}

.sectors {
 max-width: 600px;
 min-width: 320px;
 margin: auto;
 margin-top: 2em;
 width: 100%;
 box-sizing: border-box;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .portfolio,
  .portfolio-intro,
  .sectors {
    min-width: 280px;
    padding: 0 1rem;
    max-width: 100%;
  }
}
</style>
