<script setup>
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'

const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')
</script>

<template>
  <h2 class="introduction">
    Hi, I’m Daniel Christian Diaz—a passionate web developer with 4 years of experience building engaging and user-friendly digital experiences. My work combines creativity, problem-solving, and technical expertise to bring ideas to life, whether it’s crafting dynamic web applications or solving complex challenges with clean, efficient code.
    Take a look at my portfolio to explore the projects I’ve worked on, from responsive web designs to interactive applications. If you’re looking for a developer who’s detail-oriented, driven, and ready to take on new challenges, let’s connect!
  </h2>
</template>

<style scoped>
  .introduction {
    color: #FFD700;
    background-color: grey;
    padding: 1rem;
  }
</style>
