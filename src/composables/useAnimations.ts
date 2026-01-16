import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Composable for text stagger animations
 * Animates text characters or words with a stagger effect
 */
export function useTextStagger() {
  const animateText = (element, options = {}) => {
    const {
      duration = 0.8,
      stagger = 0.03,
      delay = 0,
      y = 50,
      opacity = 0,
    } = options

    const text = element.textContent
    const chars = text.split('')
    element.textContent = ''

    chars.forEach((char) => {
      const span = document.createElement('span')
      span.textContent = char === ' ' ? '\u00A0' : char
      span.style.display = 'inline-block'
      element.appendChild(span)
    })

    gsap.fromTo(
      element.children,
      { y, opacity },
      {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        delay,
        ease: 'power3.out',
      }
    )
  }

  return { animateText }
}

/**
 * Composable for scroll-triggered animations
 * Animates elements when they enter the viewport
 */
export function useScrollReveal() {
  const reveals = []

  const addReveal = (element, options = {}) => {
    const {
      trigger = element,
      start = 'top 80%',
      end = 'bottom 20%',
      scrub = false,
      markers = false,
      once = true,
      ...animationProps
    } = options

    const animation = gsap.fromTo(
      element,
      {
        y: 100,
        opacity: 0,
        ...animationProps.from,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger,
          start,
          end,
          scrub,
          markers,
          once,
        },
        ...animationProps.to,
      }
    )

    reveals.push(animation)
    return animation
  }

  const cleanup = () => {
    reveals.forEach((animation) => {
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill()
      }
      animation.kill()
    })
    reveals.length = 0
  }

  onUnmounted(() => {
    cleanup()
  })

  return { addReveal, cleanup }
}

/**
 * Composable for parallax scroll effects
 * Creates smooth parallax movement on scroll
 */
export function useParallax() {
  const addParallax = (element, options = {}) => {
    const { speed = 0.5, start = 'top bottom', end = 'bottom top' } = options

    return gsap.to(element, {
      y: () => -element.offsetHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub: true,
      },
    })
  }

  return { addParallax }
}

/**
 * Composable for magnetic button effect
 * Makes buttons follow cursor with magnetic attraction
 */
export function useMagnetic() {
  const strength = 0.3 // Magnetic pull strength

  const addMagnetic = (element) => {
    if (!element) return

    const handleMouseMove = (e) => {
      const { left, top, width, height } = element.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2
      const deltaX = (e.clientX - centerX) * strength
      const deltaY = (e.clientY - centerY) * strength

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }

  return { addMagnetic }
}

/**
 * Composable for page entrance animations
 * Animates elements on initial page load
 */
export function usePageEntrance() {
  const animateEntrance = (elements, options = {}) => {
    const { stagger = 0.1, delay = 0 } = options

    return gsap.fromTo(
      elements,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger,
        delay,
        ease: 'power3.out',
      }
    )
  }

  return { animateEntrance }
}

/**
 * Composable for scroll progress indicator
 * Creates a progress bar that fills as user scrolls
 */
export function useScrollProgress() {
  let progressBar = null

  const createProgress = (element) => {
    progressBar = gsap.to(element, {
      scaleX: 1,
      transformOrigin: 'left',
      ease: 'none',
      scrollTrigger: {
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    })
  }

  onUnmounted(() => {
    if (progressBar && progressBar.scrollTrigger) {
      progressBar.scrollTrigger.kill()
      progressBar.kill()
    }
  })

  return { createProgress }
}
