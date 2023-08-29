import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { easing } from "maath";
import AllModels from "./AllModels";
import song from "./everytime.mp3";
import * as React from "react";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js";
import { UnrealBloomPass, BloomPass, AfterimagePass } from "three-stdlib";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass";
import { isMobile } from "react-device-detect";

extend({ UnrealBloomPass, OutputPass, BloomPass, AfterimagePass });

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(song));

  const playPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  RectAreaLightUniformsLib.init();

  return (
    <>
      <Canvas
        gl={{ alpha: true }}
        shadows
        camera={{ position: [5, 0, 15], fov: 30 }}
      >
        <Environment files={"/brownMiddle.exr"} />

        <rectAreaLight
          width={5}
          height={5}
          color={"#ffffff"}
          intensity={6}
          position={[5, 5, 5]}
          lookAt={[0, 0, 0]}
        />

        <AllModels playing={isPlaying} handlePlayPause={playPause} />

        <CameraRig />
      </Canvas>
    </>
  );
}
function CameraRig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [
        -1 + (state.pointer.x * state.viewport.width) / 1.5,
        1 + state.pointer.y * 2,
        15,
      ],
      0.5,
      delta
    );
    state.camera.lookAt(0, 0, 0);
  });
}
