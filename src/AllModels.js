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

  const [hovered, setHovered] = React.useState(false);
  React.useEffect(() => {
    // Change the cursor style depending on whether the group is hovered or not
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <>
      <group
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        ref={groupRef}
        onClick={props.handlePlayPause}
      >
        <Model playing={props.playing} />
        <Model2 playing={props.playing} />
        <Model3 playing={props.playing} />
        <Model4 playing={props.playing} />
      </group>
    </>
  );
}
