import { ref, computed } from 'vue'

export function useCardTilt(maxTilt = 15) {
  const mouseX = ref(0)
  const mouseY = ref(0)
  const isHovering = ref(false)

  const tiltX = computed(() => {
    if (!isHovering.value) return 0
    return (mouseY.value - 0.5) * maxTilt
  })

  const tiltY = computed(() => {
    if (!isHovering.value) return 0
    return -(mouseX.value - 0.5) * maxTilt
  })

  const transformStyle = computed(() => {
    if (!isHovering.value) {
      return {
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
      }
    }
    return {
      transform: `perspective(1000px) rotateX(${tiltX.value}deg) rotateY(${tiltY.value}deg) scale(1.02)`
    }
  })

  const handleMouseMove = (e: MouseEvent, element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    mouseX.value = (e.clientX - rect.left) / rect.width
    mouseY.value = (e.clientY - rect.top) / rect.height
  }

  const handleMouseEnter = () => {
    isHovering.value = true
  }

  const handleMouseLeave = () => {
    isHovering.value = false
    mouseX.value = 0.5
    mouseY.value = 0.5
  }

  return {
    transformStyle,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    tiltX,
    tiltY
  }
}
