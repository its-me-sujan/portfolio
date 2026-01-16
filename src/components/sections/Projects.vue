<template>
  <section id="projects" class="relative min-h-screen py-20 bg-slate-900">
    <div class="container mx-auto px-6">
      <ScrollReveal>
        <h2 class="text-5xl font-bold text-center mb-8 bg-linear-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
          Featured Projects
        </h2>
      </ScrollReveal>

      <ScrollReveal :delay="200">
        <div class="flex justify-center gap-4 mb-12 flex-wrap">
          <button
            v-for="category in store.projectCategories"
            :key="category"
            @click="store.setFilterCategory(category)"
            :class="[
              'px-6 py-2 rounded-full font-semibold transition-all duration-300',
              store.filterCategory === category
                ? 'bg-linear-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50'
                : 'bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700'
            ]"
          >
            {{ category.charAt(0).toUpperCase() + category.slice(1) }}
          </button>
        </div>
      </ScrollReveal>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <ScrollReveal 
          v-for="(project, index) in store.filteredProjects" 
          :key="project.id"
          :delay="index * 100"
        >
          <div class="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700 hover:border-purple-500 transition-all duration-300 h-full flex flex-col hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105 cursor-pointer">
            <!-- Project Image -->
            <div class="relative h-48 overflow-hidden bg-slate-700">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                @error="handleImageError"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-linear-to-t from-slate-900 to-transparent opacity-60"></div>
            </div>

            <!-- Project Content -->
            <div class="p-6 flex flex-col h-full">
              <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                {{ project.title }}
              </h3>
              <p class="text-gray-400 mb-4 line-clamp-3 flex-grow">
                {{ project.description }}
              </p>

              <!-- Tech Stack - Fixed Height with Scrollable Container -->
              <div class="mb-4 max-h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-slate-700">
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(tech, index) in project.technologies"
                    :key="index"
                    class="px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300 text-xs whitespace-nowrap flex-shrink-0"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <!-- Stats -->
              <div v-if="project.stars || project.views" class="flex items-center justify-between text-sm text-gray-500 mb-4 py-3 border-y border-slate-700">
                <div v-if="project.stars" class="flex items-center space-x-1">
                  <span>⭐</span>
                  <span>{{ project.stars }}</span>
                </div>
                <div v-if="project.views" class="flex items-center space-x-1">
                  <span>👁️</span>
                  <span>{{ project.views }}</span>
                </div>
              </div>

              <!-- Links -->
              <div class="flex gap-4 mt-auto">
                <button
                  v-if="project.fullDescription || project.features"
                  @click="selectedProject = project"
                  class="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white text-sm transition-all duration-300 hover:scale-105"
                >
                  View Details
                </button>
                <a
                  v-if="project.github"
                  :href="project.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white text-sm transition-all duration-300 hover:scale-105"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Code
                </a>
                <a
                  v-if="project.demo"
                  :href="project.demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-linear-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:shadow-purple-500/50 rounded-lg text-white text-sm transition-all duration-300 hover:scale-105"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                  Demo
                </a>
              </div>
            </div>

            <!-- Hover Glow Effect -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div class="absolute inset-0 bg-linear-to-r from-purple-600/10 to-blue-600/10"></div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>

    <!-- Project Detail Modal -->
    <Teleport to="body">
      <div
        v-if="selectedProject"
        class="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4"
        @click="selectedProject = null"
      >
        <div
          class="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
          @click.stop
        >
          <div class="flex justify-between items-start mb-6">
            <h2 class="text-3xl font-bold text-white">{{ selectedProject.title }}</h2>
            <button
              @click="selectedProject = null"
              class="text-gray-400 hover:text-white text-2xl"
            >
              ✕
            </button>
          </div>

          <img
            :src="selectedProject.image"
            :alt="selectedProject.title"
            class="w-full rounded-xl mb-6 max-h-80 object-cover"
          />

          <div class="mb-6" v-if="selectedProject.fullDescription">
            <h3 class="text-xl font-semibold text-white mb-2">About</h3>
            <p class="text-gray-400">
              {{ selectedProject.fullDescription }}
            </p>
          </div>

          <!-- Features -->
          <div v-if="selectedProject.features" class="mb-6">
            <h3 class="text-xl font-semibold text-white mb-3">Key Features</h3>
            <ul class="space-y-2">
              <li v-for="feature in selectedProject.features" :key="feature" class="text-gray-400 flex items-start">
                <span class="text-purple-400 mr-2">✓</span>
                {{ feature }}
              </li>
            </ul>
          </div>

          <!-- Technologies -->
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-white mb-3">Technologies Used</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in selectedProject.technologies"
                :key="tech"
                class="px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-300"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Links -->
          <div class="flex gap-4">
            <a
              v-if="selectedProject.github"
              :href="selectedProject.github"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-center transition-colors duration-300 font-semibold"
            >
              View Code
            </a>
            <a
              v-if="selectedProject.demo"
              :href="selectedProject.demo"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 px-4 py-3 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg text-center transition-all duration-300 font-semibold"
            >
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScrollReveal from '@/components/animations/ScrollReveal.vue'
import CardAnimation from '@/components/animations/CardAnimation.vue'
import { usePortfolioStore } from '@/stores/portfolio'

const store = usePortfolioStore()
const selectedProject = ref(null)

const handleImageError = (e: Event) => {
  const img = e.target as HTMLImageElement
  // Create a gradient placeholder
  img.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  img.style.opacity = '0.5'
}
</script>