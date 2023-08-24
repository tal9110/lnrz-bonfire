import React from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { easing } from "maath";
import { extend } from "@react-three/fiber";
import { ShaderMaterial, Color } from "three";
import * as THREE from "three";
import vertexShader from "./vertex.js";
import fragmentShader from "./fragment.js";

extend({ ShaderMaterial });

export default function Model(props) {
  const { nodes, materials } = useGLTF("/diskOpaqueFinal.glb");
  const diskRef = useRef();
  let time = 0;
  const materialRef = React.useRef();
  let pulse = 0;

  useFrame((state, delta) => {
    if (materialRef.current) {
      pulse += delta * 1.5;

      const intensity = 0.5 * Math.sin(pulse) + 0.5;

      materialRef.current.material.emissiveIntensity = intensity;
      materialRef.current.material.emissive.set("#BD4A0B");
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
        ref={materialRef}
        castShadow
        receiveShadow
        geometry={nodes.SUBSTANCE_IN_01002.geometry}
        material={materials["/obj/file1/matnet1/PLASTIC"]}
        rotation={[Math.PI / 2, 0, 0]}
      ></mesh>
    </group>
  );
}

useGLTF.preload("/diskOpaque.glb");
