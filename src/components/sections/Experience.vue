<template>
  <section id="experience" class="section-padding relative overflow-hidden bg-dark-900/30">
    <div class="container-custom">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <span class="text-primary-400 font-semibold tracking-wider uppercase text-sm">
          Career Journey
        </span>
        <h2 ref="titleRef" class="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
          My Professional
          <span class="gradient-text block">Experience</span>
        </h2>
      </div>

      <!-- Timeline -->
      <div ref="timelineRef" class="relative max-w-4xl mx-auto">
        <!-- Center Line -->
        <div
          ref="timelineLineRef"
          class="absolute left-1/2 top-0 w-0.5 h-full bg-gradient-to-b from-primary-500 to-purple-500 transform -translate-x-1/2 origin-top scale-y-0"
        ></div>

        <!-- Timeline Items -->
        <div class="space-y-16">
          <div
            v-for="(exp, index) in experiences"
            :key="exp.id"
            class="timeline-item relative"
            :class="index % 2 === 0 ? 'text-right pr-1/2' : 'text-left pl-1/2'"
            :data-index="index"
          >
            <!-- Content Card -->
            <div
              class="inline-block glass p-6 rounded-2xl max-w-lg transition-all duration-300 hover:scale-105"
              :class="index % 2 === 0 ? 'mr-12' : 'ml-12'"
            >
              <!-- Date Badge -->
              <div class="inline-block mb-4">
                <span class="px-4 py-2 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-full text-sm font-medium border border-primary-500/30">
                  {{ exp.date }}
                </span>
              </div>

              <!-- Company & Role -->
              <h3 class="text-2xl font-bold mb-2">{{ exp.role }}</h3>
              <p class="text-primary-400 font-semibold mb-3">{{ exp.company }}</p>
              <p class="text-dark-300 mb-4">{{ exp.description }}</p>

              <!-- Achievements -->
              <ul class="space-y-2 text-sm text-dark-400 mb-4" :class="index % 2 === 0 ? 'text-right' : 'text-left'">
                <li v-for="achievement in exp.achievements" :key="achievement" class="flex items-start space-x-2" :class="index % 2 === 0 ? 'justify-end' : ''">
                  <span class="text-primary-400 mt-1">→</span>
                  <span>{{ achievement }}</span>
                </li>
              </ul>

              <!-- Technologies -->
              <div class="flex flex-wrap gap-2" :class="index % 2 === 0 ? 'justify-end' : ''">
                <span
                  v-for="tech in exp.technologies"
                  :key="tech"
                  class="px-2 py-1 bg-dark-800/50 rounded text-xs"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Timeline Dot -->
            <div
              class="timeline-dot absolute top-8 left-1/2 w-4 h-4 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transform -translate-x-1/2 z-10 scale-0"
              :class="{ 'ring-4 ring-primary-500/30': index === 0 }"
            ></div>

            <!-- Icon Container -->
            <div
              class="absolute top-4 left-1/2 w-16 h-16 glass rounded-full transform -translate-x-1/2 flex items-center justify-center z-10 opacity-0"
            >
              <span class="text-2xl">{{ exp.icon }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Education Section -->
      <div ref="educationRef" class="mt-24">
        <h3 class="text-3xl font-bold text-center mb-12">
          <span class="gradient-text">Education</span>
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div
            v-for="edu in education"
            :key="edu.id"
            class="glass p-6 rounded-2xl hover:scale-105 transition-all duration-300"
          >
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <span class="text-2xl">{{ edu.icon }}</span>
              </div>
              <div>
                <h4 class="text-xl font-bold mb-1">{{ edu.degree }}</h4>
                <p class="text-primary-400 font-semibold mb-2">{{ edu.school }}</p>
                <p class="text-sm text-dark-400">{{ edu.date }}</p>
              </div>
            </div>
          </div>
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
const timelineRef = ref(null)
const timelineLineRef = ref(null)
const educationRef = ref(null)

const experiences = [
  {
    id: 1,
    role: 'Senior Full Stack Developer',
    company: 'Tech Innovations Inc.',
    date: '2022 - Present',
    icon: '💼',
    description: 'Leading development of enterprise-scale web applications and mentoring junior developers.',
    achievements: [
      'Architected and deployed 15+ production applications',
      'Reduced load time by 60% through optimization',
      'Mentored team of 5 junior developers',
    ],
    technologies: ['Vue.js', 'Node.js', 'AWS', 'Docker'],
  },
  {
    id: 2,
    role: 'Frontend Developer',
    company: 'Creative Digital Agency',
    date: '2020 - 2022',
    icon: '🎨',
    description: 'Developed responsive and interactive web applications for high-profile clients.',
    achievements: [
      'Delivered 30+ client projects on time',
      'Improved user engagement by 45%',
      'Implemented design system used across all projects',
    ],
    technologies: ['React', 'Tailwind', 'GSAP', 'Three.js'],
  },
  {
    id: 3,
    role: 'Junior Developer',
    company: 'StartUp Solutions',
    date: '2018 - 2020',
    icon: '🚀',
    description: 'Contributed to the development of SaaS products and gained expertise in modern web technologies.',
    achievements: [
      'Built core features for flagship product',
      'Participated in agile development process',
      'Learned and applied best coding practices',
    ],
    technologies: ['JavaScript', 'Vue.js', 'MongoDB', 'Express'],
  },
]

const education = [
  {
    id: 1,
    degree: 'B.S. Computer Science',
    school: 'University of Technology',
    date: '2014 - 2018',
    icon: '🎓',
  },
  {
    id: 2,
    degree: 'Full Stack Certification',
    school: 'Advanced Coding Bootcamp',
    date: '2018',
    icon: '📜',
  },
]

const { addReveal } = useScrollReveal()

onMounted(() => {
  // Title reveal
  addReveal(titleRef.value, {
    from: { y: 50, opacity: 0 },
    to: { y: 0, opacity: 1, duration: 1 },
  })

  // Animate timeline line on scroll
  if (timelineLineRef.value) {
    gsap.to(timelineLineRef.value, {
      scaleY: 1,
      duration: 2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: timelineRef.value,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: 1,
      },
    })
  }

  // Timeline items
  if (timelineRef.value) {
    const items = timelineRef.value.querySelectorAll('.timeline-item')
    
    items.forEach((item, index) => {
      const dot = item.querySelector('.timeline-dot')
      const card = item.querySelector('.glass')
      const icon = item.querySelector('.w-16')
      const isEven = index % 2 === 0

      // Card animation
      gsap.fromTo(
        card,
        {
          x: isEven ? 100 : -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            once: true,
          },
        }
      )

      // Dot animation
      gsap.to(dot, {
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          once: true,
        },
      })

      // Icon animation
      gsap.to(icon, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          once: true,
        },
      })
    })
  }

  // Education section
  if (educationRef.value) {
    const cards = educationRef.value.querySelectorAll('.glass')
    addReveal(cards, {
      from: { y: 50, opacity: 0 },
      to: {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
      },
    })
  }
})
</script>

<style scoped>
@media (max-width: 768px) {
  .timeline-item {
    text-align: left !important;
    padding-left: 3rem !important;
    padding-right: 0 !important;
  }

  .timeline-item .glass {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .timeline-dot,
  .timeline-item .w-16 {
    left: 1rem !important;
  }

  .timeline-item ul {
    text-align: left !important;
    justify-content: flex-start !important;
  }

  .timeline-item .flex-wrap {
    justify-content: flex-start !important;
  }
}
</style>
