import { Canvas } from "@react-three/fiber"

import { Experience } from "./components/Experience"
import { Experience2 } from "./components/Experience2"
import { Experience3 } from "./components/Experience3"
import { Experience4 } from "./components/Experience4"
import { ExpSpring } from "./components/ExpSpring"

import React, { Suspense } from "react"

function App() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 10], fov: 30 }}
    >
      <color
        attach='background'
        args={["#000000"]}
      />
      <Experience4 />
    </Canvas>
  )
}

export default App
