import { Canvas } from "@react-three/fiber"

import { Experience } from "./components/Experience"
import { Experience2 } from "./components/Experience2"
import { Experience3 } from "./components/Experience3"
import { Experience4 } from "./components/Experience4"
import { ExpSpring } from "./components/ExpSpring"
import { LoadingScreen } from "./components/LoadingScreen"

import { Loader } from "@react-three/drei"

import React, { Suspense } from "react"
import { CameraControls } from "three-stdlib"

function App() {
  return (
    <>
      <Canvas
        shadows
        camera={{ position: [0, 0, 10], fov: 30 }}
      >
        <color
          attach='background'
          args={["#000000"]}
        />
        <Suspense fallback={null}>
          <Experience4 />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  )
}

export default App
