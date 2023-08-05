import { Environment, useTexture, OrbitControls } from "@react-three/drei"

export const Experience = () => {
  const myMap = useTexture("textures/radiant_rocks_in_thje_jungle.jpg")

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset='sunset' />
      <OrbitControls />
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial map={myMap} />
      </mesh>
    </>
  )
}
