import {
  Environment,
  useTexture,
  OrbitControls,
  MeshPortalMaterial,
  RoundedBox,
} from "@react-three/drei"
import * as THREE from "three"
// import { BackSide } from "three"
import { Ninja } from "./Ninja"
import { Yeti } from "./Yeti"
import { BlueDemon } from "./BlueDemon"

export const Experience = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset='sunset' />
      <OrbitControls />
      <MonsterStage
        texture='textures/radiant_rocks_in_thje_jungle.jpg'
        position-z={-0.5}
      >
        <Yeti
          scale={0.6}
          position-y={-1}
        />
      </MonsterStage>

      <MonsterStage
        texture='textures/sky_an_horizon_with_clouds.jpg'
        position-x={-2.5}
        rotation-y={Math.PI / 8}
      >
        <Ninja
          scale={0.6}
          position-y={-1}
        />
      </MonsterStage>

      <MonsterStage
        texture='textures/surreal_scary_mountains.jpg'
        position-x={2.5}
        rotation-y={-Math.PI / 8}
      >
        <BlueDemon
          scale={0.6}
          position-y={-1}
        />
      </MonsterStage>
    </>
  )
}

const MonsterStage = ({ children, texture, ...props }) => {
  const myMap = useTexture(texture)
  return (
    <group {...props}>
      <RoundedBox args={[2, 3, 0.1]}>
        <MeshPortalMaterial side={THREE.DoubleSide}>
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
