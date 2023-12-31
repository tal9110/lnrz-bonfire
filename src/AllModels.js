import React from "react";
import Model from "./Model";
import Model2 from "./Model2";
import Model3 from "./Model3";
import Model4 from "./Model4";
import { useFrame } from "@react-three/fiber";
import { isMobile } from "react-device-detect";

export default function AllModels(props) {
  const groupRef = React.useRef();
  let accumulatedTime = React.useRef(0);
  let lastElapsedTime = React.useRef(0);
  useFrame((state) => {
    if (props.playing) {
      const delta = state.clock.getElapsedTime() - lastElapsedTime.current;
      accumulatedTime.current += delta;

      groupRef.current.rotation.y =
        (Math.PI / 4) * Math.sin(accumulatedTime.current);
    }
    lastElapsedTime.current = state.clock.getElapsedTime();
  });

  const [hovered, setHovered] = React.useState(false);
  React.useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  return (
    <>
      {isMobile ? (
        <group
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          ref={groupRef}
          onClick={props.handlePlayPause}
          scale={1}
        >
          <Model playing={props.playing} />
          <Model2 playing={props.playing} />
          <Model3 playing={props.playing} />
          <Model4 playing={props.playing} />
        </group>
      ) : (
        <group
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          ref={groupRef}
          onClick={props.handlePlayPause}
          scale={1.5}
        >
          <Model playing={props.playing} />
          <Model2 playing={props.playing} />
          <Model3 playing={props.playing} />
          <Model4 playing={props.playing} />
        </group>
      )}
    </>
  );
}
