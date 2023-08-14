import { OrbitControls } from "@react-three/drei"

import { useSpring, animated } from "@react-spring/three"
import { useFrame, useThree } from "@react-three/fiber"
import React, { useState, useRef, useEffect } from "react"
import * as THREE from "three"

export const ExpSpring = () => {
  const [active, setActive] = useState(false)
  const myCubeMesh = useRef(null)
  const { scale } = useSpring({ scale: active ? 1.5 : 1 })

  return (
    <>
      <ambientLight intensity={1} />
      <OrbitControls />
      <animated.mesh
        ref={myCubeMesh}
        scale={scale}
        onClick={() => {
          console.log(active)
          setActive(!active)
        }}
      >
        <boxGeometry />
        <meshPhongMaterial color='royalblue' />
      </animated.mesh>
    </>
  )
}
