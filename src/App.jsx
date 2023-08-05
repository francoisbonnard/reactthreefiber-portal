import { Canvas } from "@react-three/fiber"
import { Experience } from "./components/Experience"
import React, { Suspense } from "react"

function App() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 10], fov: 30 }}
    >
      <color
        attach='background'
        args={["#ececec"]}
      />
      {/* <React.Suspense fallback={<></>}> */}
      <Experience />
      {/* </React.Suspense> */}
    </Canvas>
  )
}

export default App
