/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from "react"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

export function A_ecrin_bas2({onMeshInfoUpdate, ...props} ) {
  const { nodes, materials } = useGLTF("./models/A_ecrin_bas.gltf")
  
  const meshRef1 = useRef();
  const meshRef2 = useRef();
  
  useEffect(() => {
    if (meshRef1.current && meshRef2.current) {
      // Récupérez les informations pour le premier mesh
      meshRef1.current.geometry.computeBoundingBox();
      const size1 = meshRef1.current.geometry.boundingBox.getSize(new THREE.Vector3());
      const rotation1 = meshRef1.current.rotation;
      const scale1 = meshRef1.current.scale;
      
      // Récupérez les informations pour le deuxième mesh
      meshRef2.current.geometry.computeBoundingBox();
      const size2 = meshRef2.current.geometry.boundingBox.getSize(new THREE.Vector3());
      const rotation2 = meshRef2.current.rotation;
      const scale2 = meshRef2.current.scale;
      
      
      // Utilisez la fonction callback pour mettre à jour le composant parent
      onMeshInfoUpdate({
        
        size1,
        rotation1,
        scale1,
        size2,
        rotation2,
        scale2
      });
    }
  }, []);
  
  return (
    <group
     {...props}
    dispose={null}
    >
      <group rotation={[Math.PI / 2, 0, -Math.PI / 2]}>
        <mesh ref={meshRef1}
          geometry={nodes.faceBasse.geometry}
          material={materials.dia}
        />
        <mesh ref={meshRef2}
          geometry={nodes.objectBas.geometry}
          material={materials.Ecrin}
        />
      </group>
    </group>
  )
}

useGLTF.preload("/models/A_ecrin_bas.gltf")
