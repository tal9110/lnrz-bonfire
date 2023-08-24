import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { MeshTransmissionMaterial } from "@react-three/drei";

export default function Model2(props) {
  const { nodes, materials } = useGLTF("/diskClearFinal.glb");
  const diskRef = useRef();
  let time = 0;

  return (
    <group ref={diskRef} scale={25} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SUBSTANCE_IN_01003.geometry}
        material={materials["/obj/file1/matnet1/CASE"]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <MeshTransmissionMaterial
          meshPhysicalMaterial={false}
          transmissionSampler={false}
          backside={false}
          samples={10}
          resolution={2048}
          transmission={1}
          roughness={0.0}
          thickness={0.01}
          ior={1.5}
          chromaticAberration={0.9}
          anisotropy={0.5}
          distortion={0}
          distortionScale={1}
          temporalDistortion={1}
          clearcoat={1}
          attenuationDistance={5}
          attenuationColor="#ffffff"
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/diskClear.glb");
