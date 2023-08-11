import React from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { easing } from "maath";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/diskOpaqueFinal.glb");
  const diskRef = useRef();
  let time = 0;

  useFrame((state, delta) => {
    if (props.playing) {
      // diskRef.current.rotation.y = (Math.PI / 2) * Math.sin(delta);
      // diskRef.current.rotation.y += delta / 2;
    }
  });

  return (
    <group ref={diskRef} {...props} scale={25} dispose={null}>
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
