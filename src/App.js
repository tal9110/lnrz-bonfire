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
import Gradient from "./Gradient";
import ReactAudioPlayer from "react-audio-player";
import song from "./withoutYou.mp3";
import { Button, Center } from "@mantine/core";

// import { attach } from "@react-three/fiber/dist/declarations/src/core/utils";

import * as React from "react";

import * as buffer from "maath/buffer";
import * as misc from "maath/misc";
import { useEffect } from "react";
// import Gradient from "./Gradient";

// function Model(props) {
// const { nodes } = useGLTF("/flower-transformed.glb");
// const { nodes, geometry } = useGLTF("/disk.glb");

// return (
//   <>
//     <group {...props} dispose={null}>
//       <mesh geometry={nodes.petals.geometry}>
//         <MeshTransmissionMaterial
//           backside
//           backsideThickness={1}
//           samples={16}
//           thickness={0.2}
//           anisotropicBlur={0.1}
//           iridescence={1}
//           iridescenceIOR={1}
//           iridescenceThicknessRange={[0, 1400]}
//           clearcoat={1}
//           envMapIntensity={0.5}
//         />
//         <mesh geometry={nodes.Sphere.geometry}>
//           <MeshTransmissionMaterial
//             samples={6}
//             resolution={512}
//             thickness={-1}
//             anisotropy={0.25}
//           />
//         </mesh>
//       </mesh>
//       <mesh geometry={nodes.Sphere001.geometry}>
//         <meshStandardMaterial
//           toneMapped={false}
//           emissive="hotpink"
//           color="red"
//           emissiveIntensity={2}
//         />
//       </mesh>
//     </group>
//   </>
// );

//   const { nodes, materials } = useGLTF("/disk.glb");
//   return (
//     <group {...props} dispose={null}>
//       <group
//         position={[-0.093, 0.136, 0.074]}
//         rotation={[1.619, -0.106, -0.091]}
//         scale={19.959}
//       >
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Circle010.geometry}
//           // material={materials.discBottom}
//         />
//         <meshStandardMaterial color="#ff0000" transparent opacity={0.5} />

//         {/* <MeshTransmissionMaterial
//           backside
//           backsideThickness={1}
//           samples={16}
//           thickness={0.2}
//           anisotropicBlur={0.1}
//           iridescence={1}
//           iridescenceIOR={1}
//           iridescenceThicknessRange={[0, 1400]}
//           clearcoat={1}
//           envMapIntensity={0.5}
//         /> */}
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Circle010_1.geometry}
//           // material={materials.label}
//         />
//         <meshStandardMaterial color="#ff0000" transparent opacity={0.5} />

//         {/* <MeshTransmissionMaterial
//           samples={6}
//           resolution={512}
//           thickness={-1}
//           anisotropy={0.25}
//         /> */}
//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Circle010_2.geometry}
//           // material={materials.clearplastic}
//         />
//         {/* <MeshTransmissionMaterial
//           samples={6}
//           resolution={512}
//           thickness={-1}
//           anisotropy={0.25}
//         /> */}
//         <meshStandardMaterial color="#ff0000" transparent opacity={0.5} />

//         <mesh
//           castShadow
//           receiveShadow
//           geometry={nodes.Circle010_3.geometry}
//           // material={materials.metalfoil}
//         />
//         <meshStandardMaterial color="#ff0000" transparent opacity={0.5} />
//         {/* <MeshTransmissionMaterial
//           samples={6}
//           resolution={512}
//           thickness={-1}
//           anisotropy={0.25}
//         /> */}
//       </group>
//     </group>
//   );
// }

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

export default function App() {
  const texture = useLoader(LUTCubeLoader, "/F-6800-STD.cube");
  const [degraded, degrade] = useState(false);
  const diskRef = useRef();

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(song));

  const playPause = () => {
    if (isPlaying) {
      // Pause the song if it is playing
      audioRef.current.pause();
    } else {
      // Play the song if it is paused
      audioRef.current.play();
    }

    // Change the state of song
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <div
        style={{
          zIndex: 100,
          position: "absolute",
          // width: "100%",
          // height: "100%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div>
          {/* Show state of song on website */}
          {/* <p>{isPlaying ? "Song is Playing" : "Song is Paused"}</p> */}

          {/* Button to call our main function */}
          {/* <button onClick={playPause}>Play | Pause</button> */}
          {/* <Center maw={400} h={600} mx="auto"> */}
          <Button variant="light" color="dark" onClick={playPause}>
            {isPlaying ? "PAUSE" : "PLAY"}
          </Button>
          {/* </Center> */}
        </div>
      </div>
      <Canvas shadows camera={{ position: [5, 0, 15], fov: 30 }}>
        <spotLight
          position={[0, 15, 0]}
          angle={0.3}
          penumbra={1}
          castShadow
          intensity={2}
          shadow-bias={-0.0001}
        />
        <ambientLight intensity={0.5} />
        <Gradient playing={isPlaying} />

        {/* <AccumulativeShadows
        position={[0, -1.16, 0]}
        frames={100}
        alphaTest={0.9}
        scale={10}
      >
        <RandomizedLight
          amount={8}
          radius={10}
          ambient={0.5}
          position={[1, 5, -1]}
        />
      </AccumulativeShadows> */}
        {/** PerfMon will detect performance issues */}
        <PerformanceMonitor onDecline={() => degrade(true)} />
        {/* Renders contents "live" into a HDRI environment (scene.environment). */}
        <Environment
          frames={degraded ? 1 : Infinity}
          resolution={256}
          background
          blur={1}
        >
          <Lightformers />
        </Environment>
        {!isPlaying && <CameraRig />}
      </Canvas>
    </>
  );
}
function CameraRig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        -1 + (state.pointer.x * state.viewport.width) / 2,
        (1 + state.pointer.y) / 0.5,
        15,
      ],
      0.35,
      delta
    );
    state.camera.lookAt(0, 0, 0);
  });
}

function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
  const group = useRef();
  useFrame(
    (state, delta) =>
      (group.current.position.z += delta * 10) > 20 &&
      (group.current.position.z = -60)
  );
  return (
    <>
      {/* Ceiling */}
      <Lightformer
        intensity={0.75}
        rotation-x={Math.PI / 2}
        position={[0, 5, -9]}
        scale={[10, 10, 1]}
      />
      <group rotation={[0, 0.5, 0]}>
        <group ref={group}>
          {positions.map((x, i) => (
            <Lightformer
              key={i}
              form="circle"
              intensity={2}
              rotation={[Math.PI / 2, 0, 0]}
              position={[x, 4, i * 4]}
              scale={[3, 1, 1]}
            />
          ))}
        </group>
      </group>
      {/* Sides */}
      <Lightformer
        intensity={4}
        rotation-y={Math.PI / 2}
        position={[-5, 1, -1]}
        scale={[20, 0.1, 1]}
      />
      <Lightformer
        rotation-y={Math.PI / 2}
        position={[-5, -1, -1]}
        scale={[20, 0.5, 1]}
      />
      <Lightformer
        rotation-y={-Math.PI / 2}
        position={[10, 1, 0]}
        scale={[20, 1, 1]}
      />
      {/* Accent (red) */}
      <Float speed={5} floatIntensity={2} rotationIntensity={2}>
        <Lightformer
          form="ring"
          color="red"
          intensity={1}
          scale={10}
          position={[-15, 4, -18]}
          target={[0, 0, 0]}
        />
      </Float>
      {/* Background */}
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <LayerMaterial side={THREE.BackSide}>
          <Color color="#444" alpha={1} mode="normal" />
          <Depth
            colorA="blue"
            colorB="black"
            alpha={0.5}
            mode="normal"
            near={0}
            far={300}
            origin={[100, 100, 100]}
          />
        </LayerMaterial>
      </mesh>
    </>
  );
}
