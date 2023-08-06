/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react"
import { useGLTF, PerspectiveCamera } from "@react-three/drei"

export function Maya(props) {
  const { nodes, materials } = useGLTF("/models/Maya.gltf")

  return (
    <group
      {...props}
      dispose={null}
    >
      <PerspectiveCamera
        makeDefault={false}
        far={10000}
        fov={37.85}
        position={[3.16, 0.54, 3.22]}
        rotation={[-0.22, 0.74, 0.15]}
      />
      <mesh
        geometry={nodes.pSuperShape1.geometry}
        material={materials.lambert1}
      />
    </group>
  )
}

useGLTF.preload("/models/Maya.gltf")
