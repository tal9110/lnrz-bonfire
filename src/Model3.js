import React from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { easing } from "maath";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/cdFinal.glb");
  const diskRef = useRef();
  let time = 0;
  useFrame((state, delta) => {
    if (props.playing) {
      // diskRef.current.rotation.y += delta / 2;
      //   diskRef.current.rotation.y = (Math.PI / 2) * Math.sin(delta);
      diskRef.current.rotation.z += delta / 3.5;
    }
  });

  return (
    <group ref={diskRef} {...props} scale={25} dispose={null}>
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
    </group>
  );
}

useGLTF.preload("/cdFinal.glb");
