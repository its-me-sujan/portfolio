<template>
  <section id="about" class="section-padding relative overflow-hidden">
    <div class="container-custom">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <!-- Image Column -->
        <div ref="imageRef" class="relative">
          <div class="relative group">
            <!-- Decorative elements -->
            <div class="absolute -top-8 -left-8 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500"></div>
            <div class="absolute -bottom-8 -right-8 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500"></div>
            
            <!-- Image container -->
            <div class="relative glass p-2 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop"
                alt="Profile"
                class="rounded-xl w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              <!-- Overlay gradient -->
              <div class="absolute inset-0 bg-gradient-to-t from-dark-950/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            </div>

            <!-- Floating stats -->
            <div class="absolute -right-4 top-1/4 glass p-4 rounded-xl animate-float">
              <div class="text-center">
                <p class="text-3xl font-bold gradient-text">5+</p>
                <p class="text-sm text-dark-400">Years Exp</p>
              </div>
            </div>

            <div class="absolute -left-4 bottom-1/4 glass p-4 rounded-xl animate-float" style="animation-delay: 0.5s;">
              <div class="text-center">
                <p class="text-3xl font-bold gradient-text">100+</p>
                <p class="text-sm text-dark-400">Projects</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Content Column -->
        <div ref="contentRef">
          <div class="mb-4">
            <span class="text-primary-400 font-semibold tracking-wider uppercase text-sm">
              About Me
            </span>
          </div>

          <h2 ref="titleRef" class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Turning Ideas Into
            <span class="gradient-text block">Reality</span>
          </h2>

          <div ref="textRef" class="space-y-4 text-dark-300 text-lg">
            <p>
              I'm a passionate full-stack developer with a keen eye for design and a love for creating seamless user experiences. With over 5 years of experience in the industry, I've had the privilege of working with diverse clients and bringing their visions to life.
            </p>

            <p>
              My expertise spans across modern web technologies, from crafting responsive frontends to building robust backend systems. I believe in writing clean, maintainable code and staying up-to-date with the latest industry trends.
            </p>

            <p>
              When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing my knowledge with the developer community.
            </p>
          </div>

          <!-- Skills highlights -->
          <div ref="skillsRef" class="mt-8 flex flex-wrap gap-3">
            <span
              v-for="skill in highlights"
              :key="skill"
              class="px-4 py-2 glass glass-hover rounded-full text-sm font-medium"
            >
              {{ skill }}
            </span>
          </div>

          <!-- CTA -->
          <div ref="ctaRef" class="mt-8">
            <button
              class="magnetic-btn px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full font-semibold hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300"
              @click="downloadResume"
            >
              Download Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useScrollReveal, useMagnetic } from '@/composables/useAnimations'
import gsap from 'gsap'

const imageRef = ref(null)
const contentRef = ref(null)
const titleRef = ref(null)
const textRef = ref(null)
const skillsRef = ref(null)
const ctaRef = ref(null)

const highlights = [
  'Vue.js',
  'React',
  'Node.js',
  'TypeScript',
  'TailwindCSS',
  'Three.js',
  'GSAP',
  'MongoDB',
]

const { addReveal } = useScrollReveal()
const { addMagnetic } = useMagnetic()

const downloadResume = () => {
  // Implement resume download logic
  console.log('Downloading resume...')
}

onMounted(() => {
  // Image reveal with scale
  addReveal(imageRef.value, {
    from: { scale: 0.8, opacity: 0 },
    to: { scale: 1, opacity: 1, duration: 1.2 },
  })

  // Title reveal with split text effect
  addReveal(titleRef.value, {
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1 },
  })

  // Text paragraphs stagger
  if (textRef.value) {
    const paragraphs = textRef.value.querySelectorAll('p')
    addReveal(paragraphs, {
      from: { y: 30, opacity: 0 },
      to: {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
      },
    })
  }

  // Skills reveal
  if (skillsRef.value) {
    const skills = skillsRef.value.querySelectorAll('span')
    addReveal(skills, {
      from: { scale: 0, opacity: 0 },
      to: {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
      },
    })
  }

  // CTA reveal
  addReveal(ctaRef.value, {
    from: { y: 30, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.8 },
  })

  // Add magnetic effect
  const button = ctaRef.value?.querySelector('button')
  if (button) {
    addMagnetic(button)
  }
})
</script>
