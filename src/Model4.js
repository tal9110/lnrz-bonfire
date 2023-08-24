import React from "react";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/playButtonFinal.glb");
  const diskRef = useRef();

  const materialRef = React.useRef();

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value += delta;
    }
    if (props.playing) {
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
      ></mesh>
    </group>
  );
}

useGLTF.preload("/playButtonFinal.glb");
