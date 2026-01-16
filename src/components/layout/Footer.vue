<template>
  <footer class="relative bg-dark-900/50 border-t border-white/5 py-12">
    <div class="container-custom">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
        <!-- Brand -->
        <div>
          <h3 class="text-2xl font-bold gradient-text mb-4">Portfolio</h3>
          <p class="text-dark-400 mb-4">
            Crafting digital experiences with passion and precision.
          </p>
          <div class="flex space-x-4">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 glass glass-hover rounded-full flex items-center justify-center"
            >
              <i :class="social.icon" class="text-lg"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.name">
              <a
                :href="link.href"
                class="text-dark-400 hover:text-primary-400 transition-colors duration-300"
                @click.prevent="scrollToSection(link.href)"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Get In Touch</h4>
          <ul class="space-y-3 text-dark-400">
            <li class="flex items-center space-x-3">
              <span class="text-primary-400">📧</span>
              <a
                href="mailto:your.email@example.com"
                class="hover:text-primary-400 transition-colors duration-300"
              >
                your.email@example.com
              </a>
            </li>
            <li class="flex items-center space-x-3">
              <span class="text-primary-400">📱</span>
              <a
                href="tel:+1234567890"
                class="hover:text-primary-400 transition-colors duration-300"
              >
                +1 (234) 567-890
              </a>
            </li>
            <li class="flex items-center space-x-3">
              <span class="text-primary-400">📍</span>
              <span>San Francisco, CA</span>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
      >
        <p class="text-dark-500 text-sm">
          © {{ currentYear }} All rights reserved.
        </p>
        <p class="text-dark-500 text-sm">
          Built with
          <span class="text-red-500 animate-pulse">♥</span>
          using Vue & Tailwind
        </p>
      </div>
    </div>

    <!-- Scroll to Top Button -->
    <button
      v-if="showScrollTop"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 w-12 h-12 bg-linear-to-r from-primary-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-primary-500/50 transition-all duration-300 hover:scale-110 z-40"
    >
      <svg
        class="w-6 h-6 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const showScrollTop = ref(false)
const currentYear = computed(() => new Date().getFullYear())

const socials = [
  { name: 'GitHub', icon: 'fab fa-github', url: 'https://github.com' },
  { name: 'LinkedIn', icon: 'fab fa-linkedin', url: 'https://linkedin.com' },
  { name: 'Twitter', icon: 'fab fa-twitter', url: 'https://twitter.com' },
  { name: 'Dribbble', icon: 'fab fa-dribbble', url: 'https://dribbble.com' },
]

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

const scrollToSection = (href) => {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 500
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
