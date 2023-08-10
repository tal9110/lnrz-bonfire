import React from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/diskOpaque2.glb");
  const diskRef = useRef();
  useFrame((state, delta) => {
    if (props.playing) {
      diskRef.current.rotation.y += delta / 1.5;
    }
  });

  return (
    <group ref={diskRef} {...props} scale={25} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SUBSTANCE_IN_01.geometry}
        material={materials["/obj/file1/matnet1/BUTTON"]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <group rotation={[-Math.PI / 2, 0.038, 0]}>
        <mesh
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
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SUBSTANCE_IN_01001.geometry}
        material={materials["/obj/file1/matnet1/FRAME"]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SUBSTANCE_IN_01002.geometry}
        material={materials["/obj/file1/matnet1/PLASTIC"]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/diskOpaque.glb");
