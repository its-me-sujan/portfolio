<template>
  <div ref="containerRef" class="absolute inset-0 pointer-events-none"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, shallowRef } from 'vue'
import * as THREE from 'three'
import { useMousePosition } from '@/composables/useMousePosition'
// Using spheres for UI-friendly icons

const containerRef = ref<HTMLElement | null>(null)
const { normalizedX, normalizedY } = useMousePosition(50)

const scene = shallowRef<THREE.Scene | null>(null)
const camera = shallowRef<THREE.PerspectiveCamera | null>(null)
const renderer = shallowRef<THREE.WebGLRenderer | null>(null)
const codeBlocks: THREE.Group[] = []
const textSprites: THREE.Sprite[] = []
const animationFrameId = shallowRef<number | null>(null)

// Programming words to display
const programmingWords = [
  'Frontend', 'Backend', 'Django', 'Nginx', 'Linux',
  'React', 'Vue.js', 'Node.js', 'Docker', 'AWS',
  'Python', 'JavaScript', 'TypeScript', 'PostgreSQL', 'MongoDB',
  'REST API', 'GraphQL', 'Git', 'CI/CD', 'Kubernetes',
  'Redis', 'Celery', 'FastAPI', 'Express', 'Tailwind', 'if', 'else', 'function', 'const', 'Redis'
]

// Create text sprite
const createTextSprite = (text: string, x: number, y: number, z: number) => {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (!context) return null

  canvas.width = 512
  canvas.height = 256
  
  context.fillStyle = 'rgba(139, 92, 246, 0.9)'
  context.font = 'bold 80px monospace'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText(text, canvas.width / 2, canvas.height / 2)
  
  const texture = new THREE.CanvasTexture(canvas)
  const spriteMaterial = new THREE.SpriteMaterial({ 
    map: texture,
    transparent: true,
    opacity: 0.8
  })
  
  const sprite = new THREE.Sprite(spriteMaterial)
  sprite.position.set(x, y, z)
  sprite.scale.set(6, 3, 1)
  
  return sprite
}

onMounted(() => {
  if (!containerRef.value) return

  // Setup scene
  scene.value = new THREE.Scene()
  
  // Setup camera
  camera.value = new THREE.PerspectiveCamera(
    75,
    containerRef.value.clientWidth / containerRef.value.clientHeight,
    0.1,
    1000
  )
  camera.value.position.z = 30
  camera.value.position.y = 0

  // Setup renderer
  renderer.value = new THREE.WebGLRenderer({ 
    alpha: true, 
    antialias: true 
  })
  renderer.value.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
  renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  containerRef.value.appendChild(renderer.value.domElement)

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.value.add(ambientLight)

  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0x8b5cf6, 1)
  directionalLight.position.set(5, 5, 5)
  scene.value.add(directionalLight)

  // Tech icons data with actual logo URLs + brand color
  const techIcons = [
    { name: 'Vue.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', color: 0x42b883 },
    { name: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', color: 0xe34c26 },
    { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: 0xf7df1e },
    { name: 'Django', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', color: 0x0c4b33 },
    { name: 'Nginx', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg', color: 0x009639 },
    { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', color: 0xff9900 },
    { name: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: 0x2496ed },
    { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: 0x3776ab }
  ]

  // Create floating tech icons positioned away from center
  const loadIcons = async () => {
    // Spheres removed - using only text
  }
  
  loadIcons()

  // Add floating programming words - positioned even farther from center
  for (let i = 0; i < 25; i++) {
    const word = programmingWords[Math.floor(Math.random() * programmingWords.length)]
    const angle = (i / 25) * Math.PI * 2
    const radius = 28 + Math.random() * 12 // push words to outer ring - increased
    const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 10
    const y = (Math.random() - 0.5) * 30 // much wider vertical spread
    const z = Math.sin(angle) * radius - 20 // farther back
    
    const textSprite = createTextSprite(word, x, y, z)
    if (textSprite && scene.value) {
      scene.value.add(textSprite)
      textSprites.push(textSprite)
    }
  }

  // Animation loop
  let time = 0
  const animate = () => {
    animationFrameId.value = requestAnimationFrame(animate)
    time += 0.01

    // Rotate and animate icon groups
    codeBlocks.forEach((group, index) => {
      group.rotation.x += 0.003
      group.rotation.y += 0.006
      group.position.y += Math.sin(time + index) * 0.008
      // pulse halo slightly
      const halo = group.children.find(c => c instanceof THREE.Sprite) as THREE.Sprite | undefined
      if (halo) {
        const mat = halo.material as THREE.SpriteMaterial
        mat.opacity = 0.45 + Math.sin(time * 1.6 + index) * 0.15
      }

      // Keep logo plane facing the camera to prevent distortion
      const plane = group.children.find(c => c instanceof THREE.Mesh && c.geometry instanceof THREE.PlaneGeometry) as THREE.Mesh | undefined
      if (plane && camera.value) {
        plane.quaternion.copy(camera.value.quaternion)
      }
    })

    // Animate text sprites - make them drift and rotate slowly
    textSprites.forEach((sprite, index) => {
      sprite.position.x += Math.sin(time * 0.5 + index) * 0.01
      sprite.position.y += Math.cos(time * 0.3 + index) * 0.01
      sprite.position.z += Math.sin(time * 0.4 + index * 0.5) * 0.01
      
      // Fade in and out
      const material = sprite.material as THREE.SpriteMaterial
      material.opacity = 0.5 + Math.sin(time * 2 + index) * 0.3
    })

    // Camera movement based on mouse - subtle movement
    if (camera.value) {
      camera.value.position.x += (normalizedX.value * 1 - camera.value.position.x) * 0.03
      camera.value.position.y += (-normalizedY.value * 1 - camera.value.position.y) * 0.03
      camera.value.lookAt(0, 0, 0)
    }

    if (renderer.value && scene.value && camera.value) {
      renderer.value.render(scene.value, camera.value)
    }
  }

  animate()

  // Handle resize
  const handleResize = () => {
    if (!camera.value || !renderer.value || !containerRef.value) return
    
    camera.value.aspect = containerRef.value.clientWidth / containerRef.value.clientHeight
    camera.value.updateProjectionMatrix()
    renderer.value.setSize(containerRef.value.clientWidth, containerRef.value.clientHeight)
  }

  window.addEventListener('resize', handleResize)

  // Cleanup
  return () => {
    window.removeEventListener('resize', handleResize)
    
    if (animationFrameId.value) {
      cancelAnimationFrame(animationFrameId.value)
    }

    if (renderer.value && containerRef.value) {
      containerRef.value.removeChild(renderer.value.domElement)
      renderer.value.dispose()
    }

    if (scene.value) {
      scene.value.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose())
          } else {
            object.material.dispose()
          }
        }
      })
    }
  }
})
</script>
