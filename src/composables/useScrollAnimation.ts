import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollAnimation() {
  const scrollY = ref(0)
  const scrollProgress = ref(0)

  const updateScroll = () => {
    scrollY.value = window.scrollY
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight
    scrollProgress.value = windowHeight > 0 ? scrollY.value / windowHeight : 0
  }

  const scrollToSection = (selector: string, offset = 0) => {
    const element = document.querySelector(selector)
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({
        top,
        behavior: 'smooth'
      })
    }
  }

  const getParallaxOffset = (speed = 0.5) => {
    return scrollY.value * speed
  }

  onMounted(() => {
    window.addEventListener('scroll', updateScroll)
    updateScroll()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateScroll)
  })

  return {
    scrollY,
    scrollProgress,
    scrollToSection,
    getParallaxOffset
  }
}
