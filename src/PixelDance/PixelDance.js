import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { Vector2 } from "three";

import vertexShader from "./vertexShader";
import fragmentShader from "./fragmentShader";

const CustomGeometryParticles = (props) => {
  const { count } = props;
  const radius = 2;

  // This reference gives us direct access to our points
  const points = useRef();

  // Generate our positions attributes array
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const distance = 50;

    for (let i = 0; i < count; i++) {
      //   const theta = THREE.MathUtils.randFloatSpread(360);
      //   const phi = THREE.MathUtils.randFloatSpread(360);

      let x = distance * Math.random() - distance / 2;
      let y = 0;
      let z = distance * Math.random() - distance / 2;

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
        value: radius,
      },
      mousePos: { value: new Vector2() },
    }),
    []
  );

  useEffect(() => {
    function updateMousePos(event) {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      const x = (clientX / innerWidth) * 2 - 1;
      const y = -(clientY / innerHeight) * 2 + 1;
      if (points.current.material.uniforms) {
        let temp = y * 130;
        if (temp > 100 || temp < -100) {
          temp = 0;
        }

        points.current.material.uniforms.mousePos.value.x = x * temp;
        points.current.material.uniforms.mousePos.value.y = y * temp;
      }
    }
    window.addEventListener("mousemove", updateMousePos);
    return () => {
      window.removeEventListener("mousemove", updateMousePos);
    };
  }, []);

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
    <Canvas
      camera={{ position: [1.5, 1.5, 1.5] }}
      style={{
        position: "staic",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: -1,
      }}
    >
      <ambientLight intensity={0.5} />
      <CustomGeometryParticles count={6000} />
      <OrbitControls />
    </Canvas>
  );
};

export default PixelDance;
