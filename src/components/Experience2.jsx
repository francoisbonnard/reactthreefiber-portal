import {
  Environment,
  useTexture,
  OrbitControls,
  MeshPortalMaterial,
  RoundedBox,
  Text,
  CameraControls,
} from "@react-three/drei";

import { useFrame } from "@react-three/fiber";
import * as easing from "maath/easing";
import React, { useState, useRef } from "react";
import * as THREE from "three";
// import { BackSide } from "three"

import { Stars } from "./Stars";
import { A_ecrin_bas } from "./A_ecrin_bas";
import { A_ecrin_haut } from "./A_ecrin_haut";
import { A_diamant } from "./A_diamant";

export const Experience2 = () => {
  const [active, setActive] = useState(null);

  const [meshInfos, setMeshInfos] = useState({
    size1: null,
    rotations1: null
    // Ajoutez d'autres propriétés si nécessaire
  });

  // const controlsRef = useRef()
  return (
    <>
      <ambientLight intensity={0.01} />
      {/* <CameraControls ref={controlsRef} /> */}
      <OrbitControls />

      <MonsterStage2
        name="Ecrin"
        color="#381f14"
        ambiantIntensity={0}
        environmentPreset={"dawn"}
        texture="./textures/radiant_rocks_in_thje_jungle.jpg"
        position-z={-0.5}
        active={active}
        setActive={setActive}
        meshInfos={meshInfos}
      >
        <A_ecrin_bas
          onMeshInfoUpdate={(meshInfos) => {
            console.log("A_ecrin_bas meshInfos : "+meshInfos.rotation1);
            setMeshInfos(meshInfos);
          }}
          scale={0.6}
          position-y={-1}
          />
        <A_ecrin_haut scale={0.6} position-y={-1} />
      </MonsterStage2>

      <MonsterStage
        name="Diamant"
        color="#4c3d39"
        ambiantIntensity={0.1}
        environmentPreset={"night"}
        texture="./textures/sky_an_horizon_with_clouds.jpg"
        position-x={-2.5}
        rotation-y={Math.PI / 8}
        active={active}
        setActive={setActive}
        >
        {<A_diamant scale={1} position-y={-1} />}
      </MonsterStage>

      <MonsterStage
        name="Stars"
        color="#2b2744"
        ambiantIntensity={0.1}
        environmentPreset={"dawn"}
        texture="./textures/surreal_scary_mountains.jpg"
        position-x={2.5}
        rotation-y={-Math.PI / 8}
        active={active}
        setActive={setActive}
        >
        <Stars scale={1} position-y={-0.5} />
      </MonsterStage>
    </>
  );
};

const MonsterStage = ({
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
  const myMap = useTexture(texture);
  const portalMaterial = useRef();
  useFrame((_state, delta) => {
    const worldOpen = active === name;
    easing.damp(
      portalMaterial.current,
      "blend",
      worldOpen ? 1 : 0,
      0.25,
      delta
      );
    });
    return (
      <group {...props}>
      <RoundedBox
        args={[2, 3, 0.1]}
        onDoubleClick={() => setActive(active === name ? null : name)}
        >
        <Text
          font="fonts/Caprasimo-Regular.ttf"
          fontSize={0.3}
          position={[0, -1.3, 0.051]}
          anchorY={"bottom"}
          >
          {name}
          <meshBasicMaterial color={color} toneMapped={false} />
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

            <meshStandardMaterial map={myMap} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};

const MonsterStage2 = ({
  children,
  ambiantIntensity,
  environmentPreset,
  texture,
  name,
  color,
  active,
  setActive,
  meshInfos,
  ...props
}) => {
  console.log("MonsterStage2 meshInfos.size1_X : " + meshInfos.size2.x);
  console.log("MonsterStage2 meshInfos.size1 : " + JSON.stringify(meshInfos.size2, null, 2));
  console.log("MonsterStage2 meshInfos.rotation1 : " + JSON.stringify(meshInfos.rotation2, null, 2));
  console.log("MonsterStage2 meshInfos.scale1 : " + JSON.stringify(meshInfos.scale2, null, 2));

  const myMap = useTexture(texture);
  const portalMaterial = useRef();
  useFrame((_state, delta) => {
    const worldOpen = active === name;
    easing.damp(
      portalMaterial.current,
      "blend",
      worldOpen ? 1 : 0,
      0.25,
      delta
    );
  });
  return (
    <group {...props}>
      <ambientLight intensity={ambiantIntensity} />
      <Environment preset={environmentPreset} />
      {children}
      <Text
        font="fonts/Caprasimo-Regular.ttf"
        fontSize={0.3}
        position={[0, -1.3, 0.051]}
        anchorY={"bottom"}
      >
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
       {/* <RoundedBox
        args={[1.4, 1.4, 0.1]}
        position={[meshInfos.size1.x, meshInfos.size1.y, meshInfos.size1.z]}
        rotation={[Math.PI / 2, 0 , Math.PI/ 2]}
        onDoubleClick={() => setActive(active === name ? null : name)}
      >  */}
        <RoundedBox
        args={[1.4, 1.4, 0.1]}
        rotation={[Math.PI / 2, Math.PI, Math.PI]}
        position={[0, -0.7, 0]}
        onDoubleClick={() => setActive(active === name ? null : name)}
      >  
        <MeshPortalMaterial
          ref={portalMaterial}
          side={THREE.simpleSide}
          // blend={active === name ? 1 : 0}
        >
          <ambientLight intensity={ambiantIntensity} />
          <Environment preset={environmentPreset} />

          <mesh>
            <sphereGeometry args={[2, 32, 32]} rotation={[0, 0, Math.PI]} />

            <meshStandardMaterial map={myMap} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};
