import { ref, onMounted, onUnmounted } from 'vue'

export function useMousePosition(throttleMs = 16) {
  const x = ref(0)
  const y = ref(0)
  const normalizedX = ref(0) // -1 to 1
  const normalizedY = ref(0) // -1 to 1
  
  let lastTime = 0

  const updatePosition = (event: MouseEvent) => {
    const now = Date.now()
    
    if (now - lastTime < throttleMs) return
    lastTime = now

    x.value = event.clientX
    y.value = event.clientY
    
    // Normalize to -1 to 1 range
    normalizedX.value = (event.clientX / window.innerWidth) * 2 - 1
    normalizedY.value = -(event.clientY / window.innerHeight) * 2 + 1
  }

  onMounted(() => {
    window.addEventListener('mousemove', updatePosition)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', updatePosition)
  })

  return {
    x,
    y,
    normalizedX,
    normalizedY
  }
}
