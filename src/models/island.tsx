import { useCallback, useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { a } from '@react-spring/three'
import { useFrame, useThree } from '@react-three/fiber'

function Island({ isRotating, setIsRotating, setCurrentStage, ...props }: any) {
  const islandRef = useRef()
  const { nodes, materials } = useGLTF('assets/3d/island.glb') as any
  const { gl, viewport } = useThree()

  const lastPositionX = useRef(0)
  const rotationSpeed = useRef(0)
  const dampingFactor = 0.95

  const handlePointerDown = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()
      event.preventDefault()

      setIsRotating(true)

      const { clientX } = event.touches ? event.touches[0] : event
      lastPositionX.current = clientX
    },
    [setIsRotating],
  )

  const handlePointerUp = useCallback(
    (event) => {
      event.stopPropagation()
      event.preventDefault()

      setIsRotating(false)
    },
    [setIsRotating],
  )

  const handlePointerMove = useCallback(
    (event) => {
      event.stopPropagation()
      event.preventDefault()

      if (isRotating) {
        const { clientX } = event.touches ? event.touches[0] : event
        const delta = (clientX - lastPositionX.current) / viewport.width

        islandRef.current.rotation.y += delta * 0.01 * Math.PI
        lastPositionX.current = clientX
        rotationSpeed.current = delta * 0.01 * Math.PI
      }
    },
    [isRotating, viewport.width],
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        if (!isRotating) setIsRotating(true)

        islandRef.current.rotation.y += 0.01 * Math.PI
      }

      if (event.key === 'ArrowRight') {
        if (!isRotating) setIsRotating(true)

        islandRef.current.rotation.y -= 0.01 * Math.PI
      }
    },
    [isRotating, setIsRotating],
  )

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        setIsRotating(false)
      }
    },
    [setIsRotating],
  )

  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor

      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0
      }

      islandRef.current.rotation.y += rotationSpeed.current
    } else {
      const rotation = islandRef.current.rotation.y

      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4)
          break
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3)
          break
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2)
          break
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1)
          break
        default:
          setCurrentStage(null)
      }
    }
  })

  useEffect(() => {
    const canvas = gl.domElement

    canvas.addEventListener('pointerdown', handlePointerDown)
    canvas.addEventListener('pointerup', handlePointerUp)
    canvas.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown)
      canvas.removeEventListener('pointerup', handlePointerUp)
      canvas.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [
    gl,
    handlePointerDown,
    handlePointerUp,
    handlePointerMove,
    handleKeyDown,
    handleKeyUp,
  ])

  return (
    <a.group {...props} ref={islandRef}>
      <mesh
        geometry={nodes.polySurface944_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface945_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface946_tree2_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface947_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface948_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface949_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.pCube11_rocks1_0.geometry}
        material={materials.PaletteMaterial001}
      />
    </a.group>
  )
}

export default Island
