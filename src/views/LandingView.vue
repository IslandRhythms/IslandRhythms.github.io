<script setup>
/**
 * The landing page must render a SINGLE root element.
 *
 * App.vue wraps <RouterView> in a <Transition mode="out-in">, and Vue can only
 * transition a component with one root node. A fragment root — several sibling
 * elements, or even one element preceded by a template comment, since comments
 * are kept as vnodes in dev — makes the transition bail out, and navigating
 * here from another route mounts nothing at all.
 */
import HeroSection from '@/sections/HeroSection.vue'
import WorkSection from '@/sections/WorkSection.vue'
import DemoSection from '@/sections/DemoSection.vue'
import AboutSection from '@/sections/AboutSection.vue'
import ContactSection from '@/sections/ContactSection.vue'
</script>

<template>
  <div class="landing">
    <HeroSection />
    <WorkSection />
    <DemoSection />
    <AboutSection />
    <ContactSection />
  </div>
</template>
