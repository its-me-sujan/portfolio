<template>
  <nav
    ref="navbarRef"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="{ 'glass shadow-lg': scrolled }"
  >
    <div class="container-custom">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <a
          href="#"
          class="text-2xl font-bold gradient-text hover:scale-105 transition-transform duration-300"
        >
          Portfolio
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <a
            v-for="link in navLinks"
            :key="link.name"
            :href="link.href"
            class="text-dark-300 hover:text-white transition-colors duration-300 relative group"
            @click.prevent="scrollToSection(link.href)"
          >
            {{ link.name }}
            <span
              class="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-primary-400 to-purple-400 group-hover:w-full transition-all duration-300"
            ></span>
          </a>
        </div>

        <!-- CTA Button -->
        <button
          ref="ctaRef"
          class="hidden md:block magnetic-btn px-6 py-3 bg-linear-to-r from-primary-500 to-purple-500 rounded-full font-medium hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300"
          @click="scrollToSection('#contact')"
        >
          Let's Talk
        </button>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden text-white"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              v-if="!mobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div
        v-if="mobileMenuOpen"
        class="md:hidden absolute top-20 left-0 right-0 glass p-6 space-y-4 animate-slide-down"
      >
        <a
          v-for="link in navLinks"
          :key="link.name"
          :href="link.href"
          class="block text-dark-300 hover:text-white transition-colors duration-300 py-2"
          @click.prevent="handleMobileNavClick(link.href)"
        >
          {{ link.name }}
        </a>
        <button
          class="w-full px-6 py-3 bg-linear-to-r from-primary-500 to-purple-500 rounded-full font-medium"
          @click="handleMobileNavClick('#contact')"
        >
          Let's Talk
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useMagnetic } from '@/composables/useAnimations'
import gsap from 'gsap'

const navbarRef = ref(null)
const ctaRef = ref(null)
const scrolled = ref(false)
const mobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

const { addMagnetic } = useMagnetic()
let cleanupMagnetic = null

const scrollToSection = (href) => {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleMobileNavClick = (href) => {
  scrollToSection(href)
  mobileMenuOpen.value = false
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

onMounted(() => {
  // Navbar entrance animation
  gsap.fromTo(
    navbarRef.value,
    { y: -100, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
  )

  // Add magnetic effect to CTA button
  if (ctaRef.value) {
    cleanupMagnetic = addMagnetic(ctaRef.value)
  }

  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (cleanupMagnetic) {
    cleanupMagnetic()
  }
})
</script>
