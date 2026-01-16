<template>
  <div
    ref="targetRef"
    :class="[
      'transition-all duration-800 ease-out',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
    ]"
    :style="{ transitionDelay: `${delay}ms` }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'

interface Props {
  delay?: number
  threshold?: number
}

const props = withDefaults(defineProps<Props>(), {
  delay: 0,
  threshold: 0.1
})

const isVisible = ref(false)
const { targetRef } = useIntersectionObserver(
  (visible) => {
    if (visible) isVisible.value = true
  },
  { threshold: props.threshold }
)
</script>
