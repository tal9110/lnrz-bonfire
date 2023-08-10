import { Canvas, useLoader } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import { LUTCubeLoader } from "postprocessing";
import * as THREE from "three";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { easing } from "maath";
import { PerformanceMonitor, Float } from "@react-three/drei";
import { LayerMaterial, Color, Depth } from "lamina";
import Model from "./Model";
import Model2 from "./Model2";
import song from "./withoutYou.mp3";
import { Button, Center } from "@mantine/core";
import * as React from "react";

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

          top: "80%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div>
          <Button variant="outline" color="dark" onClick={playPause}>
            {isPlaying ? "PAUSE" : "PLAY"}
          </Button>
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
        <ambientLight intensity={0.8} />
        <Model playing={isPlaying} />
        <Model2 playing={isPlaying} />

        <PerformanceMonitor onDecline={() => degrade(true)} />
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
        // -1 + (state.pointer.x * state.viewport.width) / 2,
        -1 + (state.pointer.x * state.viewport.width) / 1.5,

        // (1 + state.pointer.y) / 0.5,
        1 + state.pointer.y,
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
      />
      {/* Accent (red) */}
      <Float speed={5} floatIntensity={2} rotationIntensity={2}>
        <Lightformer
          form="ring"
          color="#26194E"
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
          <Color color="black" alpha={1} mode="normal" />
          <Depth
            colorA="black"
            colorB="black"
            alpha={0.9}
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
