import React from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { easing } from "maath";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/playButtonFinal.glb");
  const diskRef = useRef();

  useFrame((state, delta) => {
    if (props.playing) {
      //   diskRef.current.rotation.y = (Math.PI / 2) * Math.sin(delta);
      //   diskRef.current.rotation.y += delta / 2;
    }
  });

  return (
    <group
      onClick={props.handlePlayPause}
      ref={diskRef}
      {...props}
      scale={25}
      dispose={null}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SUBSTANCE_IN_01.geometry}
        material={materials["/obj/file1/matnet1/BUTTON"]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/playButtonFinal.glb");
