import { Canvas, useLoader } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import { LUTCubeLoader } from "postprocessing";
import * as THREE from "three";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { easing } from "maath";
import { PerformanceMonitor, Float } from "@react-three/drei";
import { LayerMaterial, Color, Depth } from "lamina";
import AllModels from "./AllModels";
import song from "./everytime.mp3";
import { Button, Center } from "@mantine/core";
import * as React from "react";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { BlurPass, Resizer, KernelSize, Resolution } from "postprocessing";
// import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";
// import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
// import { RectAreaLightUniformsLib } from 'three';
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import { Effects } from "@react-three/drei";
import { UnrealBloomPass, BloomPass, AfterimagePass } from "three-stdlib";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass";

extend({ UnrealBloomPass, OutputPass, BloomPass, AfterimagePass });

export default function App() {
  // const brown = import("/brown.exr").then((module) => module.default);

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

  RectAreaLightUniformsLib.init();

  return (
    <>
      <div
        style={{
          background: "transparent",
          zIndex: 100,
          position: "absolute",

          top: "80%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* <div>
          <Button variant="outline" color="orange" onClick={playPause}>
            {isPlaying ? "PAUSE" : "PLAY"}
          </Button>
        </div> */}
      </div>
      {/* <div> */}
      <Canvas
        // flat={true}
        // linear={false}
        gl={{ alpha: true }}
        shadows
        camera={{ position: [5, 0, 15], fov: 30 }}
      >
        <Environment files={"/brownMiddle.exr"} />
        {/* <Effects disableGamma={true}>
          <unrealBloomPass threshold={0.5} strength={0.6} radius={0} />
          <afterimagePass attachArray="passes" args={[0.95]} />

          <outputPass args={[THREE.ACESFilmicToneMapping]} />
        </Effects> */}

        {/* <rectAreaLight
          width={6}
          height={6}
          color={"#ffffff"}
          intensity={4}
          position={[6, 6, 5]}
          lookAt={[0, 0, 0]}
        /> */}
        <rectAreaLight
          width={5}
          height={5}
          color={"#ffffff"}
          intensity={6}
          position={[5, 5, 5]}
          lookAt={[0, 0, 0]}
        />
        {/* <rectAreaLight
          width={10}
          height={10}
          color={"#ffffff"}
          intensity={10}
          position={[0, 0, -5]}
          lookAt={[0, 0, 0]}
        /> */}
        {/* <directionalLight intensity={2} color="white" position={[0, 5, 5]} /> */}

        {/* <spotLight
          position={[0, 15, 0]}
          angle={0.3}
          penumbra={1}
          castShadow
          intensity={1}
          shadow-bias={-0.0001}
        /> */}
        {/* <ambientLight intensity={2} /> */}
        <AllModels playing={isPlaying} handlePlayPause={playPause} />
        {/* <Model playing={isPlaying} />
        <Model2 playing={isPlaying} />
        <Model3 playing={isPlaying} />
        <Model4 playing={isPlaying} handlePlayPause={playPause} /> */}

        {/* <PerformanceMonitor onDecline={() => degrade(true)} /> */}
        {/* <Environment
            // frames={degraded ? 1 : Infinity}
            resolution={512}
            background
            blur={1}
          >
            <Lightformers />
          </Environment> */}
        {/* {!isPlaying && <CameraRig />} */}
        <CameraRig />
        {/* <EffectComposer>
          <Bloom
            intensity={5}
            // luminanceThreshold={0}
            // luminanceSmoothing={0.9}
            // height={300}
          />
        </EffectComposer> */}
      </Canvas>
      {/* </div> */}
    </>
  );
}
function CameraRig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        // -1 + (state.pointer.x * state.viewport.width) / 2,
        -1 + (state.pointer.x * state.viewport.width) / 1.5,

        // (1 + state.pointer.y) / 0.5,
        1 + state.pointer.y * 2,
        15,
      ],
      0.5,
      delta
    );
    state.camera.lookAt(0, 0, 0);
  });
}

function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
  const group = useRef();
  const gradient = useRef();
  // useFrame((state, delta) => {
  //   (group.current.position.z += delta * 10) > 20 &&
  //     (group.current.position.z = -60);
  // });
  return (
    <>
      {/* Ceiling */}
      {/* <Lightformer
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
      </group> */}
      {/* Sides */}
      {/* <Lightformer
        intensity={8}
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
      /> */}
      {/* Accent (red) */}
      {/* <Float speed={5} floatIntensity={2} rotationIntensity={2}>
        <Lightformer
          form="ring"
          color="#26194E"
          intensity={1}
          scale={10}
          position={[-15, 4, -18]}
          target={[0, 0, 0]}
        />
      </Float> */}
      {/* Background */}
      {/* <group ref={group}> */}
      {/* <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <LayerMaterial side={THREE.BackSide}>
          <Color color="#26194E" alpha={1} mode="normal" />
          <Depth
            colorA="black"
            colorB="#26194E"
            alpha={0.9}
            mode="normal"
            near={0}
            far={300}
            origin={[100, 100, 100]}
          />
        </LayerMaterial>
      </mesh> */}
      {/* </group> */}
    </>
  );
}
