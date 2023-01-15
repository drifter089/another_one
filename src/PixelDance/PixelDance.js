import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { Vector2, Color } from "three";
import { useNormalizedMousePosition } from "../components/normalizedMousePosHook";

import vertexShader from "./vertexShader";
import fragmentShader from "./fragmentShader";

const CustomGeometryParticles = (props) => {
  const mainState = useThree();

  useEffect(() => {
    mainState.gl.setClearColor(new Color(0x000000));
    mainState.camera.position.z = 25;
  }, []);
  const { count } = props;

  // This reference gives us direct access to our points
  const points = useRef();

  // Generate our positions attributes array
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const distance = 90;

    for (let i = 0; i < count; i++) {
      //   const theta = THREE.MathUtils.randFloatSpread(360);
      //   const phi = THREE.MathUtils.randFloatSpread(360);

      let x = (distance * Math.random() - distance / 2) * 1.5;
      let y = distance * Math.random() - distance / 2;
      let z = 0;

      positions.set([x, y, z], i * 3);
    }

    return positions;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0.0,
      },
      uRadius: {
        value: 1,
      },
      mousePos: { value: new Vector2() },
    }),
    []
  );

  const normalizedMousePos = useNormalizedMousePosition();

  useEffect(() => {
    if (points.current.material.uniforms) {
      let temp = 35;
      // if (temp > 100 || temp < -100) {
      //   temp = 0;
      // }

      points.current.material.uniforms.mousePos.value.x =
        normalizedMousePos.x * temp * -1;
      points.current.material.uniforms.mousePos.value.y =
        normalizedMousePos.y * temp;
    }
  }, [normalizedMousePos]);

  useFrame((state) => {
    const { clock } = state;
    // console.log(clock.elapsedTime);

    points.current.material.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      {/* <pointsMaterial
        size={0.012}
        color="#5786F5"
        sizeAttenuation
        depthWrite={false}
      /> */}
      <shaderMaterial
        depthWrite={false}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </points>
  );
};

const PixelDance = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <CustomGeometryParticles count={12000} />
      {/* <OrbitControls /> */}
    </>
  );
};

export default PixelDance;
