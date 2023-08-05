import { Canvas } from "@react-three/fiber"
import { Experience } from "./components/Experience"
import React, { Suspense } from "react"

function App() {
  return (
    <Canvas
      shadows
      camera={{ position: [3, 3, 3], fov: 30 }}
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
