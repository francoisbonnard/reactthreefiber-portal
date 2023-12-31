/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"

export function A_ecrin_haut(props) {
  const { nodes, materials } = useGLTF("./models/A_ecrin_haut.gltf")
  return (
    <group
      {...props}
      dispose={null}
    >
      <group
        position={[0, 0.42, 0.16]}
        rotation={[1.26, 0, -Math.PI / 2]}
      >
        <mesh
          geometry={nodes.faceHaute.geometry}
          material={materials.dia}
        />
        <mesh
          geometry={nodes.objetHaut.geometry}
          material={materials.Ecrin}
        />
      </group>
    </group>
  )
}

useGLTF.preload("/models/A_ecrin_haut.gltf")
