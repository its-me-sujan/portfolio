import { onMounted, onUnmounted, shallowRef } from 'vue'
import * as THREE from 'three'

export function useThree(containerRef: any) {
  const scene = shallowRef<THREE.Scene | null>(null)
  const camera = shallowRef<THREE.PerspectiveCamera | null>(null)
  const renderer = shallowRef<THREE.WebGLRenderer | null>(null)
  const animationFrameId = shallowRef<number | null>(null)

  const initScene = () => {
    if (!containerRef.value) return

    // Create scene
    scene.value = new THREE.Scene()

    // Create camera
    camera.value = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.value.position.z = 5

    // Create renderer
    renderer.value = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    })
    renderer.value.setSize(window.innerWidth, window.innerHeight)
    renderer.value.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.value.appendChild(renderer.value.domElement)
  }

  const handleResize = () => {
    if (!camera.value || !renderer.value) return

    camera.value.aspect = window.innerWidth / window.innerHeight
    camera.value.updateProjectionMatrix()
    renderer.value.setSize(window.innerWidth, window.innerHeight)
  }

  const animate = (callback?: () => void) => {
    const loop = () => {
      animationFrameId.value = requestAnimationFrame(loop)
      
      if (callback) callback()
      
      if (renderer.value && scene.value && camera.value) {
        renderer.value.render(scene.value, camera.value)
      }
    }
    loop()
  }

  const cleanup = () => {
    if (animationFrameId.value) {
      cancelAnimationFrame(animationFrameId.value)
    }

    if (renderer.value) {
      renderer.value.dispose()
      if (containerRef.value && renderer.value.domElement) {
        containerRef.value.removeChild(renderer.value.domElement)
      }
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

  onMounted(() => {
    initScene()
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    cleanup()
  })

  return {
    scene,
    camera,
    renderer,
    animate,
    cleanup
  }
}
