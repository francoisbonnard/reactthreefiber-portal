import * as THREE from "three"
import { useMemo, useRef } from "react"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import {
  useGLTF,
  useTexture,
  MeshRefractionMaterial,
  CubeCamera,
  OrbitControls,
} from "@react-three/drei"
import {
  EffectComposer,
  Bloom,
  DepthOfField,
} from "@react-three/postprocessing"

import { useLoader } from "@react-three/fiber"

import { BlurPass, Resizer, KernelSize, Resolution } from "postprocessing"

import diamondUrl from "./assets/dflat.glb"
import diamondUrl2 from "./assets/Adiamant.glb"
import textureUrl from "./assets/233.jpg"
import "./assets/styles.css"
import { useControls, button, folder } from "leva"

function Background() {
  const texture = useTexture(textureUrl)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(2, 2)
  return (
    <mesh
      rotation={[-0.7, 0, 0]}
      scale={50}
    >
      <sphereGeometry />
      <meshBasicMaterial
        map={texture}
        depthTest={false}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

function Diamonds({ count = 10 }) {
  const { viewport, clock } = useThree()
  const model = useRef()
  const { nodes } = useGLTF(diamondUrl)
  // Create random position data
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const diamonds = useMemo(
    () =>
      new Array(count).fill().map((_, i) => ({
        position: [
          THREE.MathUtils.randFloatSpread(viewport.width * 1.4),
          40 - Math.random() * 40,
          THREE.MathUtils.randFloatSpread(15) - 10,
        ],
        factor: 0.75 + Math.random() * 2,
        direction: Math.random() < 0.5 ? -1 : 1,
        rotation: [
          Math.sin(Math.random()) * Math.PI,
          Math.sin(Math.random()) * Math.PI,
          Math.cos(Math.random()) * Math.PI,
        ],
      })),
    []
  )

  // Render-loop
  useFrame((state, delta) => {
    // Update instanced diamonds
    diamonds.forEach((data, i) => {
      const t = clock.getElapsedTime()
      data.position[1] -= data.factor * 1 * delta * data.direction
      if (data.direction === 1 ? data.position[1] < -20 : data.position[1] > 20)
        data.position = [
          viewport.width / 2 - Math.random() * viewport.width,
          50 * data.direction,
          data.position[2],
        ]
      const { position, rotation, factor } = data
      dummy.position.set(position[0], position[1], position[2])
      dummy.rotation.set(
        rotation[0] + (t * factor) / 10,
        rotation[1] + (t * factor) / 10,
        rotation[2] + (t * factor) / 10
      )
      dummy.scale.setScalar(1 + factor)
      dummy.updateMatrix()
      model.current.setMatrixAt(i, dummy.matrix)
    })
    model.current.instanceMatrix.needsUpdate = true
  })

  return (
    <CubeCamera>
      {(texture) => (
        <instancedMesh
          ref={model}
          args={[nodes.Diamond_1_0.geometry, null, diamonds.length]}
        >
          <MeshRefractionMaterial
            bounces={3}
            aberrationStrength={0.01}
            envMap={texture}
            toneMapped={false}
          />
        </instancedMesh>
      )}
    </CubeCamera>
  )
}

export default function App_blooming() {
  const props = useControls({
    luminanceThreshold: { value: 0.8, min: 0, max: 2, step: 0.1 },
    luminanceSmoothing: { value: 0.05 },
    intensity: { value: 10, min: 0, max: 20, step: 1 },
    levels: { value: 9 },
    mipmapBlur: true,
  })

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ fov: 50, position: [0, 0, 25], near: 1, far: 100 }}
    >
      {" "}
      <OrbitControls />
      <color
        attach='background'
        args={["white"]}
      />
      <Background />
      <Diamonds />
      <EffectComposer>
        {/* <Bloom
          {...props}
          blurPass={undefined} // A blur pass.
          kernelSize={KernelSize.SMALL} // blur kernel size
          resolutionX={Resolution.AUTO_SIZE} // The horizontal resolution.
          resolutionY={Resolution.AUTO_SIZE} // The vertical resolution.
        /> */}

        <DepthOfField
          target={[0, 0, -10]}
          focalLength={0.1}
          bokehScale={10}
          height={1000}
        />
      </EffectComposer>
    </Canvas>
  )
}
