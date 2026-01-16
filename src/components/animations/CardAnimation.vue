<template>
  <div
    ref="cardRef"
    class="transition-all duration-300 ease-out will-change-transform"
    :style="transformStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousemove="handleMouseMoveWrapper"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCardTilt } from '@/composables/useCardTilt'

interface Props {
  maxTilt?: number
}

const props = withDefaults(defineProps<Props>(), {
  maxTilt: 10
})

const cardRef = ref<HTMLElement | null>(null)
const { transformStyle, handleMouseMove, handleMouseEnter, handleMouseLeave } = useCardTilt(props.maxTilt)

const handleMouseMoveWrapper = (e: MouseEvent) => {
  if (cardRef.value) {
    handleMouseMove(e, cardRef.value)
  }
}
</script>
