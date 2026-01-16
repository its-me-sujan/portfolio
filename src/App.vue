<script setup lang="ts">
import { onMounted } from 'vue'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import Hero from '@/components/sections/Hero.vue'
import About from '@/components/sections/About.vue'
import Skills from '@/components/sections/Skills.vue'
import Projects from '@/components/sections/Projects.vue'
import Experience from '@/components/sections/Experience.vue'
import Contact from '@/components/sections/Contact.vue'
import { useBugCursor } from '@/composables/useBugCursor'

useBugCursor()

onMounted(() => {
  // Any initialization here
})
</script>

<template>
  <div class="relative min-h-screen bg-linear-to-b from-slate-900 to-slate-800">
    <!-- Navbar -->
    <Navbar />

    <!-- Main Content -->
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style>
/* Global styles are handled in main.css */
</style>
