import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  OrbitControls,
  MeshTransmissionMaterial,
  useGLTF,
  shaderMaterial,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  LUT,
  BrightnessContrast,
  HueSaturation,
} from "@react-three/postprocessing";
import { LUTCubeLoader } from "postprocessing";
import glsl from "babel-plugin-glsl/macro";
import * as THREE from "three";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { easing } from "maath";
import {
  PerformanceMonitor,
  AccumulativeShadows,
  RandomizedLight,
  Float,
} from "@react-three/drei";
import { LayerMaterial, Color, Depth } from "lamina";

function Model(props) {
  const { nodes, materials } = useGLTF("/disk2.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={51.062}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SUBSTANCE_IN_01002.geometry}
          material={materials["/obj/file1/matnet1/FRAME"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SUBSTANCE_IN_01002_1.geometry}
          material={materials["/obj/file1/matnet1/PLASTIC"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SUBSTANCE_IN_01002_2.geometry}
          material={materials["/obj/file1/matnet1/CASE"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SUBSTANCE_IN_01002_3.geometry}
          material={materials["/obj/file1/matnet1/BUTTON"]}
        />
      </group>
      <group rotation={[-Math.PI / 2, 0.038, 0]} scale={51.062}>
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
      <group
        position={[-0.093, 0.136, 0.074]}
        rotation={[1.619, -0.106, -0.091]}
        scale={19.959}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle010.geometry}
          material={materials.discBottom}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle010_1.geometry}
          material={materials.label}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle010_2.geometry}
          material={materials.clearplastic}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle010_3.geometry}
          material={materials.metalfoil}
        />
      </group>
    </group>
  );
}

export default function Gradient(props) {
  const diskRef = useRef();
  useFrame((state, delta) => {
    console.log(props.playing);
    if (props.playing) {
      diskRef.current.rotation.y += delta / 1.5;
    }
  });

  return (
    <group ref={diskRef}>
      <Model scale={0.4} position={[0, 0, 0]} />
    </group>
  );
}
