<template>
  <div class="mouse-follower pointer-events-none fixed inset-0 z-50 hidden md:block">
    <div
      ref="circleRef"
      class="mouse-circle absolute w-10 h-10 border-2 rounded-full transition-all duration-150"
      :class="[
        isHovering ? 'w-20 h-20 border-purple-500' : 'w-10 h-10 border-white',
        'mix-blend-difference'
      ]"
      :style="{
        left: `${circleX}px`,
        top: `${circleY}px`,
        transform: 'translate(-50%, -50%)'
      }"
    ></div>
    <div
      ref="dotRef"
      class="mouse-dot absolute w-2 h-2 bg-white rounded-full mix-blend-difference"
      :style="{
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%)'
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useMousePosition } from '@/composables/useMousePosition'

const { x, y } = useMousePosition(0)

const circleX = ref(0)
const circleY = ref(0)
const isHovering = ref(false)
const circleRef = ref<HTMLElement | null>(null)
const dotRef = ref<HTMLElement | null>(null)

let animationFrameId: number

const updateCirclePosition = () => {
  // Smooth follow with delay
  circleX.value += (x.value - circleX.value) * 0.15
  circleY.value += (y.value - circleY.value) * 0.15
  
  animationFrameId = requestAnimationFrame(updateCirclePosition)
}

const checkHoverState = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  const interactive = target.closest('a, button, input, textarea, [role="button"]')
  isHovering.value = !!interactive
}

onMounted(() => {
  updateCirclePosition()
  window.addEventListener('mousemove', checkHoverState)
  
  // Hide default cursor on body
  document.body.style.cursor = 'none'
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('mousemove', checkHoverState)
  document.body.style.cursor = 'auto'
})
</script>

<style scoped>
.mouse-follower * {
  pointer-events: none;
}
</style>
