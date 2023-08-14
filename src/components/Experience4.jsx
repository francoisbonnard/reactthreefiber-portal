import {
  Environment,
  useTexture,
  OrbitControls,
  MeshPortalMaterial,
  RoundedBox,
  Text,
  CameraControls,
} from "@react-three/drei"

import { useSpring, animated } from "@react-spring/three"
import { useFrame, useThree } from "@react-three/fiber"
import * as easing from "maath/easing"
import React, { useState, useRef, useEffect } from "react"
import * as THREE from "three"
// import { BackSide } from "three"

import { Stars } from "./Stars"
import { A_ecrin_bas3 } from "./A_ecrin_bas3"
import { A_ecrin_haut } from "./A_ecrin_haut"
import { A_diamant } from "./A_diamant"

import { B_ecrin_haut } from "./B_ecrin_haut"
import { B_ecrin_bas } from "./B_ecrin_bas"

export const Experience4 = () => {
  const [active, setActive] = useState(null)
  const [hovered, setHovered] = useState(null)

  const [meshInfos, setMeshInfos] = useState({
    size1: null,
    rotations1: null,
  })

  // animate the camera
  const { camera } = useThree()
  const scene = useThree((state) => state.scene)
  const controlsRef = useRef()

  useEffect(() => {
    camera.updateProjectionMatrix()
    if (active) {
      const targetPosition = new THREE.Vector3()
      scene.getObjectByName(active).getWorldPosition(targetPosition)
      controlsRef.current.setLookAt(
        0,
        0,
        5,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      )
    } else {
      controlsRef.current.setLookAt(0, 0, 10, 0, 0, 0, true)
    }
  }, [active])

  // rotation de la partie haute
  const [activeCube, setActiveCube] = useState(false)
  const myCubeMesh = useRef(null)
  // const { scale } = useSpring({ scale: activeCube ? 1.5 : 1 })
  const { rotate } = useSpring({
    rotate: [activeCube ? -Math.PI / 3 : 0, 0, 0],
  })

  return (
    <>
      <ambientLight intensity={0.01} />
      <CameraControls ref={controlsRef} />

      <EcrinStage
        name='Ecrin'
        color='#ffffff'
        ambiantIntensity={0}
        environmentPreset={"dawn"}
        texture='./textures/radiant_rocks_in_thje_jungle.jpg'
        position-z={-0.5}
        meshInfos={meshInfos}
      >
        <B_ecrin_bas
          scale={0.6}
          position-y={0}
        />
        <animated.mesh
          ref={myCubeMesh}
          rotation={rotate}
          // scale={scale}
          onClick={() => {
            console.log("click")
            setActiveCube(!activeCube)
          }}
        >
          <B_ecrin_haut
            scale={0.6}
            position-y={0}
          />
        </animated.mesh>
      </EcrinStage>

      <PortalStage
        name='Diamant'
        color='#ffffff'
        ambiantIntensity={0.1}
        environmentPreset={"night"}
        texture='./textures/sky_an_horizon_with_clouds.jpg'
        position-x={-2.5}
        rotation-y={Math.PI / 8}
        active={active}
        setActive={setActive}
        duplicateMesh={0}
      >
        <A_diamant
          scale={1}
          position-y={-1}
        />
      </PortalStage>

      <PortalStage
        name='Star'
        color='#ffffff'
        ambiantIntensity={0.1}
        environmentPreset={"dawn"}
        texture='./textures/surreal_scary_mountains.jpg'
        position-x={2.5}
        rotation-y={-Math.PI / 8}
        active={active}
        setActive={setActive}
        duplicateMesh={1}
      >
        <Stars
          scale={1}
          position-y={0}
        />
      </PortalStage>
    </>
  )
}

const PortalStage = ({
  children,
  ambiantIntensity,
  environmentPreset,
  texture,
  name,
  color,
  active,
  setActive,
  duplicateMesh,
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
      {duplicateMesh === 1 && children}
      <RoundedBox
        name={name} // for the useEffect / camera movement
        args={[2, 3, 0.1]}
        onDoubleClick={() => setActive(active === name ? null : name)}
      >
        <Text
          font='fonts/Montserrat-Light.ttf'
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

const EcrinStage = ({
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
  return (
    <group {...props}>
      <ambientLight intensity={ambiantIntensity} />
      <Environment preset={environmentPreset} />
      {children}
      <Text
        font='fonts/Montserrat-Light.ttf'
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
    </group>
  )
}
