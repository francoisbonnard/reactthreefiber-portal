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
import { Stars } from "./Stars"
import { A_ecrin_bas } from "./A_ecrin_bas"
import { A_ecrin_haut } from "./A_ecrin_haut"
import { A_diamant } from "./A_diamant"

export const Experience = () => {
  const [active, setActive] = useState(null)
  // const controlsRef = useRef()
  return (
    <>
      <ambientLight intensity={0.01} />
      {/* <CameraControls ref={controlsRef} /> */}
      <OrbitControls />
      <MonsterStage
        name='Ecrin'
        color='#381f14'
        ambiantIntensity={0}
        environmentPreset={"night"}
        texture='./textures/radiant_rocks_in_thje_jungle.jpg'
        position-z={-0.5}
        active={active}
        setActive={setActive}
        >
        {/* <A_diamant
          scale={0.6}
          position-y={-1}
        /> */}
        <directionalLight 
          castShadow 
          position={[0, 10, 5]}
          shadow-mapSize-width={512} 
          shadow-mapSize-height={512} 
          shadow-camera-far={50} 
          shadow-camera-left={-10} 
          shadow-camera-right={10} 
          shadow-camera-top={10} 
          shadow-camera-bottom={-10} 
      />
        <A_ecrin_bas castShadow receiveShadow
          scale={0.6}
          position-y={-1}
          />
        <A_ecrin_haut castShadow receiveShadow
          scale={0.6}
          position-y={-1}
          />
      </MonsterStage>

      <MonsterStage
        name='Diamant'
        color='#4c3d39'
        ambiantIntensity={0.1}
        environmentPreset={"night"}
        texture='./textures/sky_an_horizon_with_clouds.jpg'
        position-x={-2.5}
        rotation-y={Math.PI / 8}
        active={active}
        setActive={setActive}
        >
        {
          <A_diamant
          scale={1}
          position-y={-1}
          />
        }
      </MonsterStage>

      <MonsterStage
        name='Stars'
        color='#2b2744'
        ambiantIntensity={0.1}
        environmentPreset={"dawn"}
        texture='./textures/surreal_scary_mountains.jpg'
        position-x={2.5}
        rotation-y={-Math.PI / 8}
        active={active}
        setActive={setActive}
        >
        <Stars
          scale={1}
          position-y={-0.5}
        />
      </MonsterStage>
    </>
  )
}

const MonsterStage = ({
  children,
  ambiantIntensity,
  environmentPreset,
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
          <ambientLight intensity={ambiantIntensity} />
          <Environment preset={environmentPreset} />
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
