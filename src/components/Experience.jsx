import {
  Environment,
  useTexture,
  OrbitControls,
  MeshPortalMaterial,
  RoundedBox,
  Text,
  CameraControls,
} from "@react-three/drei"

import { useFrame } from "@react-three/fiber"
import * as easing from "maath/easing"
import React, { useState, useRef } from "react"
import * as THREE from "three"
// import { BackSide } from "three"
import { Ninja } from "./Ninja"
import { Yeti } from "./Yeti"
import { BlueDemon } from "./BlueDemon"
import { NinjaB } from "./NinjaB"
import { BlueDemonB } from "./BlueDemonB"
import { Maya } from "./Maya"
import { exportBlender } from "./exportBlender"
import { Stars } from "./Stars"
import { A_diamant } from "./A_diamant"
import { A_ecrin_bas } from "./A_ecrin_bas"
import { A_ecrin_haut } from "./A_ecrin_haut"

export const Experience = () => {
  const [active, setActive] = useState(null)
  // const controlsRef = useRef()
  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset='sunset' />
      {/* <CameraControls ref={controlsRef} /> */}
      <OrbitControls />
      <MonsterStage
        name='diamantA'
        color='#381f14'
        texture='./textures/radiant_rocks_in_thje_jungle.jpg'
        position-z={-0.5}
        active={active}
        setActive={setActive}
      >
        <A_diamant
          scale={0.6}
          position-y={-1}
        />
        <A_ecrin_bas
          scale={0.6}
          position-y={-1}
        />
        <A_ecrin_haut
          scale={0.6}
          position-y={-1}
        />
      </MonsterStage>

      <MonsterStage
        name='NinjaB'
        color='#4c3d39'
        texture='./textures/sky_an_horizon_with_clouds.jpg'
        position-x={-2.5}
        rotation-y={Math.PI / 8}
        active={active}
        setActive={setActive}
      >
        <NinjaB
          scale={0.6}
          position-y={-1}
        />
      </MonsterStage>

      <MonsterStage
        name='Ninja'
        color='#2b2744'
        texture='./textures/surreal_scary_mountains.jpg'
        position-x={2.5}
        rotation-y={-Math.PI / 8}
        active={active}
        setActive={setActive}
      >
        <Ninja
          scale={0.6}
          position-y={-1}
        />
      </MonsterStage>
    </>
  )
}

const MonsterStage = ({
  children,
  texture,
  name,
  color,
  active,
  setActive,
  ...props
}) => {
  const myMap = useTexture(texture)
  const portalMaterial = useRef()
  useFrame((_state, delta) => {
    const worldOpen = active === name
    easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.25, delta)
  })
  return (
    <group {...props}>
      <RoundedBox
        args={[2, 3, 0.1]}
        onDoubleClick={() => setActive(active === name ? null : name)}
      >
        <Text
          font='fonts/Caprasimo-Regular.ttf'
          fontSize={0.3}
          position={[0, -1.3, 0.051]}
          anchorY={"bottom"}
        >
          {name}
          <meshBasicMaterial
            color={color}
            toneMapped={false}
          />
        </Text>
        <MeshPortalMaterial
          ref={portalMaterial}
          side={THREE.DoubleSide}
          // blend={active === name ? 1 : 0}
        >
          <ambientLight intensity={0.5} />
          <Environment preset='sunset' />
          {children}

          <mesh>
            <sphereGeometry args={[5, 32, 32]} />

            <meshStandardMaterial
              map={myMap}
              side={THREE.BackSide}
            />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  )
}
