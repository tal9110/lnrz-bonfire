import React from "react";
import Model from "./Model";
import Model2 from "./Model2";
import Model3 from "./Model3";
import Model4 from "./Model4";
import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";

export default function AllModels(props) {
  const groupRef = React.useRef();
  let accumulatedTime = React.useRef(0); // Accumulated time reference
  let lastElapsedTime = React.useRef(0);
  useFrame((state) => {
    if (props.playing) {
      const delta = state.clock.getElapsedTime() - lastElapsedTime.current;
      accumulatedTime.current += delta;

      // Here, use the accumulatedTime instead of the immediate elapsed time.
      groupRef.current.rotation.y =
        (Math.PI / 4) * Math.sin(accumulatedTime.current);
    }
    lastElapsedTime.current = state.clock.getElapsedTime();
  });

  return (
    <>
      <group ref={groupRef}>
        <Model playing={props.playing} />
        <Model2 playing={props.playing} />
        <Model3 playing={props.playing} />
        <group onClick={props.handlePlayPause}>
          <Model4 playing={props.playing} handlePlayPause={props.playPause} />
        </group>
      </group>
    </>
  );
}