<template>
  <section id="skills" class="section-padding relative overflow-hidden bg-dark-900/30">
    <div class="container-custom">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <span class="text-primary-400 font-semibold tracking-wider uppercase text-sm">
          Skills & Expertise
        </span>
        <h2 ref="titleRef" class="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
          What I Bring To
          <span class="gradient-text block">The Table</span>
        </h2>
        <p ref="subtitleRef" class="text-dark-300 text-lg max-w-2xl mx-auto">
          A comprehensive skill set covering modern web development, design, and deployment
        </p>
      </div>

      <!-- Skills Grid -->
      <div ref="gridRef" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(skill, index) in skills"
          :key="skill.name"
          :data-index="index"
          class="skill-card glass glass-hover p-6 rounded-2xl group"
        >
          <!-- Icon -->
          <div class="w-16 h-16 bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <span class="text-3xl">{{ skill.icon }}</span>
          </div>

          <!-- Title -->
          <h3 class="text-xl font-bold mb-2">{{ skill.name }}</h3>
          <p class="text-dark-400 text-sm mb-4">{{ skill.description }}</p>

          <!-- Progress Bar -->
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-dark-400">Proficiency</span>
              <span class="text-primary-400 font-semibold">{{ skill.level }}%</span>
            </div>
            <div class="h-2 bg-dark-800 rounded-full overflow-hidden">
              <div
                class="skill-progress h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                :style="{ width: '0%' }"
                :data-level="skill.level"
              ></div>
            </div>
          </div>

          <!-- Technologies -->
          <div class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="tech in skill.technologies"
              :key="tech"
              class="px-2 py-1 bg-dark-800/50 rounded text-xs text-dark-300"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>

      <!-- Additional Stats -->
      <div ref="statsRef" class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="text-center"
        >
          <div class="text-4xl md:text-5xl font-bold gradient-text mb-2" :data-target="stat.value">
            0
          </div>
          <p class="text-dark-400">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useScrollReveal } from '@/composables/useAnimations'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const titleRef = ref(null)
const subtitleRef = ref(null)
const gridRef = ref(null)
const statsRef = ref(null)

const skills = [
  {
    name: 'Frontend Development',
    icon: '🎨',
    description: 'Building responsive and interactive user interfaces',
    level: 95,
    technologies: ['Vue.js', 'React', 'Tailwind', 'GSAP'],
  },
  {
    name: 'Backend Development',
    icon: '⚙️',
    description: 'Creating robust server-side applications',
    level: 90,
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
  },
  {
    name: 'UI/UX Design',
    icon: '✨',
    description: 'Designing beautiful and intuitive experiences',
    level: 85,
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle'],
  },
  {
    name: '3D & Animation',
    icon: '🎭',
    description: 'Creating immersive 3D experiences',
    level: 80,
    technologies: ['Three.js', 'Blender', 'GSAP', 'WebGL'],
  },
  {
    name: 'DevOps & Cloud',
    icon: '☁️',
    description: 'Deploying and managing applications',
    level: 85,
    technologies: ['Docker', 'AWS', 'CI/CD', 'Kubernetes'],
  },
  {
    name: 'Mobile Development',
    icon: '📱',
    description: 'Building cross-platform mobile apps',
    level: 75,
    technologies: ['React Native', 'Flutter', 'iOS', 'Android'],
  },
]

const stats = [
  { value: 100, label: 'Projects Completed' },
  { value: 50, label: 'Happy Clients' },
  { value: 5, label: 'Years Experience' },
  { value: 15, label: 'Awards Won' },
]

const { addReveal } = useScrollReveal()

onMounted(() => {
  // Title reveal
  addReveal(titleRef.value, {
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1 },
  })

  // Subtitle reveal
  addReveal(subtitleRef.value, {
    from: { y: 30, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 0.8 },
  })

  // Skills cards stagger
  if (gridRef.value) {
    const cards = gridRef.value.querySelectorAll('.skill-card')
    addReveal(cards, {
      from: { y: 80, opacity: 0, scale: 0.9 },
      to: {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
      },
    })

    // Animate progress bars when visible
    cards.forEach((card) => {
      const progressBar = card.querySelector('.skill-progress')
      const level = progressBar.getAttribute('data-level')

      ScrollTrigger.create({
        trigger: card,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(progressBar, {
            width: `${level}%`,
            duration: 1.5,
            ease: 'power2.out',
          })
        },
      })
    })
  }

  // Stats counter animation
  if (statsRef.value) {
    const statElements = statsRef.value.querySelectorAll('[data-target]')
    
    ScrollTrigger.create({
      trigger: statsRef.value,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        statElements.forEach((element) => {
          const target = parseInt(element.getAttribute('data-target'))
          gsap.to(element, {
            innerHTML: target,
            duration: 2,
            ease: 'power1.out',
            snap: { innerHTML: 1 },
          })
        })
      },
    })
  }
})
</script>
