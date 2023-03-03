import React, { useRef, useEffect, useLayoutEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { AxesHelper, Vector2, Vector3, DoubleSide } from "three";
import { degToRad } from "three/src/math/MathUtils";
import { OrbitControls } from "@react-three/drei";

import vertexShader from "./vertexShader";
import fragmentShader from "./fragmentShader";

const OuterCube = React.forwardRef(({ innerCube, setSelected, index }, ref) => {
  /**
   * adding axis helper
   */
  // const { scene, camera } = useThree();
  // const axesHelper = new AxesHelper(10);
  // axesHelper.setColors("red", "green", "blue");
  // scene.add(axesHelper);

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
        return index;
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
    // outerCubeRef.current.material.uniforms.shaderOpacityRef.value =
    //   shaderOpacityRef.current;
  });

  return (
    <group ref={ref}>
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
      {innerCube()}
    </group>
  );
});

export default OuterCube;
