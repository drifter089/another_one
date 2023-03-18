import React, { useRef, useEffect, useLayoutEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { AxesHelper, Vector2, Vector3, DoubleSide } from "three";

import vertexShader from "./vertexShader";
import fragmentShader from "./fragmentShader";

const OuterCube = ({ setSelected, index }) => {
  const outerCubeRef = useRef();

  /**
  shader material config
   */
  const ShaderArgs = {
    uniforms: {
      u_time: { value: 0.0 },
      u_linear: { value: 0.0 },
      mousePos: { value: new Vector2() },
      shaderOpacityRef: { value: 0.7 },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  };

  /**
   *  honer and click interaction handlers
   *
   */
  function clickHandler(e) {
    // console.log("clllll");
    setSelected((prev) => {
      if (prev === index) {
        return -1;
      } else {
        if (prev === -1) {
          return index;
        } else {
          return prev;
        }
      }
    });

    // console.log(e);
  }

  /**
  updating time uniform 
  */
  useFrame((state) => {
    outerCubeRef.current.material.uniforms.u_time.value =
      state.clock.elapsedTime;
  });

  return (
    <mesh onClick={clickHandler} ref={outerCubeRef}>
      <boxGeometry args={[2.1, 2.1, 2.1]} />
      {/* <meshNormalMaterial /> */}
      <shaderMaterial
        attach="material"
        args={[ShaderArgs]}
        transparent={true}
        opacity={0.2}
      />
    </mesh>
  );
};

export default OuterCube;
