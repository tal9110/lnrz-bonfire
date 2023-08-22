import React from "react";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { easing } from "maath";
import { useFrame, extend } from "@react-three/fiber";
import { ShaderMaterial, Color } from "three";

extend({ ShaderMaterial });

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  varying vec2 vUv;

  void main() {
    float pulsing = 0.5 * sin(2.0 * time + vUv.x * 10.0) + 0.5;
    gl_FragColor = vec4(vec3(pulsing), 1.0);
  }
`;

export default function Model(props) {
  const { nodes, materials } = useGLTF("/playButtonFinal.glb");
  const diskRef = useRef();

  const materialRef = React.useRef();

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value += delta;
    }
    if (props.playing) {
      //   diskRef.current.rotation.y = (Math.PI / 2) * Math.sin(delta);
      //   diskRef.current.rotation.y += delta / 2;
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
      >
        {/* <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            time: { value: 0 },
          }}
        /> */}
      </mesh>
    </group>
  );
}

useGLTF.preload("/playButtonFinal.glb");
