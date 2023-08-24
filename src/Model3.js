import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/cdFinal.glb");
  const diskRef = useRef();
  const materialRef = useRef();
  let time = 0;
  useEffect(() => {
    console.log(materialRef.current.material);
    materialRef.current.material.envMapIntensity = 5;
  }, []);
  useFrame((state, delta) => {
    if (props.playing) {
      diskRef.current.rotation.z += delta / 3.5;
    }
  });

  return (
    <group ref={diskRef} {...props} scale={25} dispose={null}>
      <group rotation={[-Math.PI / 2, 0.038, 0]}>
        <mesh
          ref={materialRef}
          castShadow
          receiveShadow
          geometry={nodes.diskexp01_1.geometry}
          material={materials["/obj/disc_mockup/matnet2/outer"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.diskexp01_2.geometry}
          material={materials["/obj/disc_mockup/matnet2/inner"]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/cdFinal.glb");
