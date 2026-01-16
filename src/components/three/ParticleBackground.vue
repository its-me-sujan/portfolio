<template>
  <div ref="containerRef" class="fixed inset-0 -z-10"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { useThree } from '@/composables/useThree'
import { useMousePosition } from '@/composables/useMousePosition'

const containerRef = ref<HTMLElement | null>(null)
const { scene, camera, animate, cleanup } = useThree(containerRef)
const { normalizedX, normalizedY } = useMousePosition(50)

interface Particle {
  position: THREE.Vector3
  velocity: THREE.Vector3
}

const particles: Particle[] = []
const isMobile = window.innerWidth < 768
const particleCount = isMobile ? 30 : 80 // Reduced from 150
const connectionDistance = 120
const mouseRepulsionRadius = 80

let particlesMesh: THREE.Points | null = null
let linesMesh: THREE.LineSegments | null = null

onMounted(() => {
  if (!scene.value) return

  try {
    // Use Points instead of individual meshes for better performance
    const positions = new Float32Array(particleCount * 3)
    const particleGeometry = new THREE.BufferGeometry()

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 100
      const y = (Math.random() - 0.5) * 100
      const z = (Math.random() - 0.5) * 50

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      particles.push({
        position: new THREE.Vector3(x, y, z),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.01
        )
      })
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x8b5cf6,
      size: 3,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    })

    particlesMesh = new THREE.Points(particleGeometry, particleMaterial)
    scene.value.add(particlesMesh)

    // Pre-create line segments
    const maxConnections = particleCount * 5
    const linePositions = new Float32Array(maxConnections * 6)
    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.15,
      linewidth: 1
    })

    linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.value.add(linesMesh)

    let frameCount = 0

    const updateParticles = () => {
      if (!particlesMesh || !linesMesh) return

      frameCount++

      const mousePos = new THREE.Vector3(
        normalizedX.value * 40,
        normalizedY.value * 40,
        0
      )

      const positions = particlesMesh.geometry.attributes.position.array as Float32Array
      
      // Update particle positions
      particles.forEach((particle, i) => {
        particle.position.add(particle.velocity)

        // Bounce off boundaries
        if (Math.abs(particle.position.x) > 50) particle.velocity.x *= -1
        if (Math.abs(particle.position.y) > 50) particle.velocity.y *= -1
        if (Math.abs(particle.position.z) > 25) particle.velocity.z *= -1

        // Mouse repulsion (only if mouse moved recently)
        if (frameCount % 2 === 0) {
          const distance = particle.position.distanceTo(mousePos)
          if (distance < mouseRepulsionRadius && distance > 0) {
            const direction = particle.position.clone().sub(mousePos).normalize()
            particle.velocity.add(direction.multiplyScalar(0.08))
          }
        }

        // Damping
        particle.velocity.multiplyScalar(0.98)

        // Update buffer
        positions[i * 3] = particle.position.x
        positions[i * 3 + 1] = particle.position.y
        positions[i * 3 + 2] = particle.position.z
      })

      particlesMesh.geometry.attributes.position.needsUpdate = true

      // Update connections (only every other frame for performance)
      if (frameCount % 2 === 0 && !isMobile) {
        const linePositions = linesMesh.geometry.attributes.position.array as Float32Array
        let lineIndex = 0

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const distance = particles[i].position.distanceTo(particles[j].position)
            
            if (distance < connectionDistance) {
              linePositions[lineIndex++] = particles[i].position.x
              linePositions[lineIndex++] = particles[i].position.y
              linePositions[lineIndex++] = particles[i].position.z
              linePositions[lineIndex++] = particles[j].position.x
              linePositions[lineIndex++] = particles[j].position.y
              linePositions[lineIndex++] = particles[j].position.z
            }
          }
        }

        // Fill rest with zeros
        while (lineIndex < linePositions.length) {
          linePositions[lineIndex++] = 0
        }

        linesMesh.geometry.attributes.position.needsUpdate = true
        linesMesh.geometry.setDrawRange(0, lineIndex / 3)
      }
    }

    animate(updateParticles)
  } catch (error) {
    console.error('Error initializing particle system:', error)
  }
})

onUnmounted(() => {
  cleanup()
  particles.length = 0
})
</script>
