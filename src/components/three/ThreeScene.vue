<template>
  <div ref="containerRef" class="fixed inset-0 -z-10"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { useThree } from '@/composables/useThree'

const containerRef = ref<HTMLElement | null>(null)
const { scene, camera, animate, cleanup } = useThree(containerRef)

let torusKnot: THREE.Mesh | null = null

onMounted(() => {
  if (!scene.value || !camera.value) return

  try {
    // Create animated torus knot
    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16)
    const material = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      metalness: 0.7,
      roughness: 0.2,
      transparent: true,
      opacity: 0.3
    })

    torusKnot = new THREE.Mesh(geometry, material)
    torusKnot.position.z = -20
    scene.value.add(torusKnot)

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.value.add(ambientLight)

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.value.add(directionalLight)

    // Add point light for highlights
    const pointLight = new THREE.PointLight(0x3b82f6, 1, 100)
    pointLight.position.set(-10, 10, 10)
    scene.value.add(pointLight)

    const updateScene = () => {
      if (torusKnot) {
        torusKnot.rotation.x += 0.001
        torusKnot.rotation.y += 0.002
      }
    }

    animate(updateScene)
  } catch (error) {
    console.error('Error initializing Three.js scene:', error)
  }
})

onUnmounted(() => {
  cleanup()
  torusKnot = null
})
</script>
