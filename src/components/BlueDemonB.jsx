/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"

export function BlueDemonB(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF("/models/BlueDemonB.gltf")
  const { actions } = useAnimations(animations, group)

  console.log(actions)
  useEffect(() => {
    actions["Idle"].reset().fadeIn(0.5).play()
    return () => actions["Idle"].fadeOut(0.5)
  }, [])

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
    >
      <group name='Scene'>
        <group name='CharacterArmature'>
          <primitive object={nodes.Root} />
          <group name='BlueDemon'>
            <skinnedMesh
              name='Cube017'
              geometry={nodes.Cube017.geometry}
              material={materials.BlueDemon_Main}
              skeleton={nodes.Cube017.skeleton}
            />
            <skinnedMesh
              name='Cube017_1'
              geometry={nodes.Cube017_1.geometry}
              material={materials.BlueDemon_Secondary}
              skeleton={nodes.Cube017_1.skeleton}
            />
            <skinnedMesh
              name='Cube017_2'
              geometry={nodes.Cube017_2.geometry}
              material={materials.Eye_Black}
              skeleton={nodes.Cube017_2.skeleton}
            />
            <skinnedMesh
              name='Cube017_3'
              geometry={nodes.Cube017_3.geometry}
              material={materials.Eye_White}
              skeleton={nodes.Cube017_3.skeleton}
            />
            <skinnedMesh
              name='Cube017_4'
              geometry={nodes.Cube017_4.geometry}
              material={materials.Wood}
              skeleton={nodes.Cube017_4.skeleton}
            />
            <skinnedMesh
              name='Cube017_5'
              geometry={nodes.Cube017_5.geometry}
              material={materials.Straps}
              skeleton={nodes.Cube017_5.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload("/models/BlueDemonB.gltf")
