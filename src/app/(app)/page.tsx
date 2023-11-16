'use client'

import HomeInfo from '@/components/home-info'
import Loader from '@/components/loader'
import Bird from '@/models/bird'
import Island from '@/models/island'
import Plane from '@/models/plane'
import Sky from '@/models/sky'
import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'

export default function Home() {
  const [isRotating, setIsRotating] = useState(false)
  const [currentStage, setCurrentStage] = useState(1)

  function adjustIslandForScreenSize() {
    const screenPosition = [0, -6.5, -43]
    const rotation = [0.1, 4.7, 0]

    if (window.innerWidth < 768) {
      return {
        screenScale: [0.9, 0.9, 0.9],
        screenPosition,
        rotation,
      }
    }

    return {
      screenScale: [1, 1, 1],
      screenPosition,
      rotation,
    }
  }

  function adjustPlaneForScreenSize() {
    if (window.innerWidth < 768) {
      return {
        screenScale: [1.5, 1.5, 1.5],
        screenPosition: [0, -1.5, 0],
      }
    }

    return {
      screenScale: [3, 3, 3],
      screenPosition: [0, -4, -4],
    }
  }

  const {
    screenPosition: islandPosition,
    screenScale: islandScale,
    rotation: islandRotation,
  } = adjustIslandForScreenSize()

  const { screenScale: planeScale, screenPosition: planePosition } =
    adjustPlaneForScreenSize()

  return (
    <section className="relative h-screen w-full">
      <div className="absolute left-0 right-0 top-28 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      <Canvas
        className="h-screen w-full cursor-grab bg-transparent data-[rotating=true]:cursor-grabbing"
        camera={{ near: 0.1, far: 1000 }}
        data-rotating={isRotating}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight groundColor="#000000" intensity={1} />

          <Sky isRotating={isRotating} />
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            setIsRotating={setIsRotating}
            isRotating={isRotating}
            currentStage={currentStage}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            scale={planeScale}
            position={planePosition}
            rotation={[0, 20, 0]}
            isRotating={isRotating}
          />
        </Suspense>
      </Canvas>
    </section>
  )
}
