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
      // if (planeRef.current.material.uniforms) {
      //   if (x >= 0.6 || x < -0.6) {
      //     planeRef.current.material.uniforms.mousePos.value.x = 0.6;

      //   } else {
      //     planeRef.current.material.uniforms.mousePos.value.x = x;
      //   }
      //   if (y >= 0.6 || y < -0.6) {
      //     planeRef.current.material.uniforms.mousePos.value.y = 0.6;
      //   } else {
      //     planeRef.current.material.uniforms.mousePos.value.y = y;
      //   }
      // }
      planeRef.current.material.uniforms.mousePos.value.y = y / 2.3;
      planeRef.current.material.uniforms.mousePos.value.x = x / 2.3;
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
      <planeGeometry args={[85, 85]} />
      {/* <meshNormalMaterial /> */}
      <shaderMaterial
        attach="material"
        args={[SphereShaderMaterial]}
        transparent={true}
        opacity={0.2}
      />
    </mesh>
  );
};

export default ShaderPlane;
