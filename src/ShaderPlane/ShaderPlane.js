import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import { Vector2 } from "three";

import vertexShader from "./vertexShader";
import fragmentShader from "./fragmentShader";

const ShaderPlane = () => {
  const planeRef = useRef();

  const SphereShaderMaterial = {
    uniforms: {
      u_time: { value: 0.0 },
      u_linear: { value: 0.0 },
      mousePos: { value: new Vector2() },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  };

  useEffect(() => {
    console.log(planeRef.current.material);
    function updateMousePos(event) {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      const x = (clientX / innerWidth) * 2 - 1;
      const y = -(clientY / innerHeight) * 2 + 1;
      if (planeRef.current.material.uniforms) {
        planeRef.current.material.uniforms.mousePos.value.x = x;
        planeRef.current.material.uniforms.mousePos.value.y = y;
      }
    }
    window.addEventListener("mousemove", updateMousePos);
    return () => {
      window.removeEventListener("mousemove", updateMousePos);
    };
  }, []);

  useFrame((state) => {
    planeRef.current.material.uniforms.u_time.value = state.clock.elapsedTime;
  });

  return (
    <mesh ref={planeRef}>
      <planeGeometry args={[20, 20]} />
      {/* <meshNormalMaterial /> */}
      <shaderMaterial attach="material" args={[SphereShaderMaterial]} />
    </mesh>
  );
};

export default ShaderPlane;
