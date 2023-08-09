import { Canvas } from "@react-three/fiber"
import React, { Suspense } from "react"
import { Raytracer } from "@react-three/lgl"

function App_Raytrace() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Raytracer>
          <mesh>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial />
          </mesh>
          <directionalLight position={[10, 10, 10]} />
        </Raytracer>
      </Suspense>
    </Canvas>
  )
}

export default App_Raytrace
