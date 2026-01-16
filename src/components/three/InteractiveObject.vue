<template>
  <div ref="containerRef" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { useThree } from '@/composables/useThree'
import { useMousePosition } from '@/composables/useMousePosition'

const containerRef = ref<HTMLElement | null>(null)
const { scene, camera, animate, cleanup } = useThree(containerRef)
const { normalizedX, normalizedY } = useMousePosition(50)

let sphere: THREE.Mesh | null = null

onMounted(() => {
  if (!scene.value) return

  try {
    // Create metallic sphere
    const geometry = new THREE.SphereGeometry(2, 32, 32)
    const material = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      metalness: 0.9,
      roughness: 0.1,
      envMapIntensity: 1
    })

    sphere = new THREE.Mesh(geometry, material)
    scene.value.add(sphere)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.value.add(ambientLight)

    const pointLight = new THREE.PointLight(0x3b82f6, 2, 100)
    pointLight.position.set(5, 5, 5)
    scene.value.add(pointLight)

    const pointLight2 = new THREE.PointLight(0xa855f7, 2, 100)
    pointLight2.position.set(-5, -5, 5)
    scene.value.add(pointLight2)

    const updateObject = () => {
      if (!sphere) return

      // Smooth rotation following mouse
      const targetRotationY = normalizedX.value * 0.5
      const targetRotationX = normalizedY.value * 0.5

      sphere.rotation.y += (targetRotationY - sphere.rotation.y) * 0.05
      sphere.rotation.x += (targetRotationX - sphere.rotation.x) * 0.05
      
      // Continuous slow rotation
      sphere.rotation.z += 0.001
    }

    animate(updateObject)
  } catch (error) {
    console.error('Error initializing interactive object:', error)
  }
})

onUnmounted(() => {
  cleanup()
  sphere = null
})
</script>
