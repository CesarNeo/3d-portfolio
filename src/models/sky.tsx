import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

function Sky({ isRotating }) {
  const skyRef = useRef()
  const { scene } = useGLTF('assets/3d/sky.glb')

  useFrame((_, delta) => {
    if (isRotating) {
      skyRef.current.rotation.y += 0.25 * delta
    }
  })

  return (
    <mesh ref={skyRef}>
      <primitive object={scene} />
    </mesh>
  )
}

export default Sky
