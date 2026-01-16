<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <ParticleBackground />
    <CodeScene />
    
    <div class="container mx-auto px-6 z-10">
      <div class="text-center">
        <ScrollReveal :delay="200">
          <h1 class="text-6xl md:text-8xl font-bold mb-6 font-mono">
            <span class="bg-linear-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              {{ typedText }}
            </span>
            <span class="caret"></span>
          </h1>
        </ScrollReveal>

        <ScrollReveal :delay="400">
          <h2 class="text-2xl md:text-4xl text-gray-300 mb-4">
            {{ store.personalInfo.title }}
          </h2>
        </ScrollReveal>

        <ScrollReveal :delay="600">
          <p class="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            {{ store.personalInfo.tagline }}
          </p>
        </ScrollReveal>

        <ScrollReveal :delay="800">
          <div class="flex gap-6 justify-center">
            <button
              @click="scrollToProjects"
              class="px-8 py-4 bg-linear-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:-translate-y-1"
            >
              View My Work
            </button>
            <button
              @click="scrollToContact"
              class="px-8 py-4 border-2 border-purple-500 rounded-full text-white font-semibold hover:bg-purple-500/10 transition-all duration-300 hover:-translate-y-1"
            >
              Get In Touch
            </button>
          </div>
        </ScrollReveal>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
      <div class="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
        <div class="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import ParticleBackground from '@/components/three/ParticleBackground.vue'
import CodeScene from '@/components/three/CodeScene.vue'
import ScrollReveal from '@/components/animations/ScrollReveal.vue'
import { usePortfolioStore } from '@/stores/portfolio'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const store = usePortfolioStore()
const { scrollToSection } = useScrollAnimation()

const typedText = ref('')
let typingInterval: ReturnType<typeof setInterval> | null = null
let blinkInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  const full = store.personalInfo.name
  let i = 0

  // Start typing animation after 600ms delay for smooth entry
  const startDelay = setTimeout(() => {
    typingInterval = setInterval(() => {
      if (i <= full.length) {
        typedText.value = full.slice(0, i)
        i++
      } else {
        if (typingInterval) clearInterval(typingInterval)
      }
    }, 90)
  }, 600)

  blinkInterval = setInterval(() => {
    // CSS handles caret blink; interval reserved if future logic needed
  }, 1000)

  onUnmounted(() => {
    clearTimeout(startDelay)
    if (typingInterval) clearInterval(typingInterval)
    if (blinkInterval) clearInterval(blinkInterval)
  })
})

const scrollToProjects = () => {
  scrollToSection('#projects', 80)
}

const scrollToContact = () => {
  scrollToSection('#contact', 80)
}
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes caret-blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

.caret {
  display: inline-block;
  width: 0.6ch;
  height: 1em;
  margin-left: 0.1em;
  background: linear-gradient(90deg, rgba(168,85,247,0.9), rgba(59,130,246,0.9));
  animation: caret-blink 1s step-end infinite;
  vertical-align: -0.1em;
  border-radius: 2px;
}
</style>
