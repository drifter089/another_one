import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import { Vector2, Color } from "three";
import { useNormalizedMousePosition } from "../../components/normalizedMousePosHook";

import vertexShader from "./vertexShader";
import fragmentShader from "./fragmentShader";

const CustomGeometryParticles = (props) => {
  /**
   * paint it black
   */
  const mainState = useThree();

  useEffect(() => {
    mainState.gl.setClearColor(new Color(0x000000));
    mainState.camera.position.z = 75;
  }, [mainState.gl, mainState.camera.position]);

  // This reference gives us direct access to our points
  const points = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: {
        value: 0.0,
      },
      uRadius: {
        value: 1,
      },
      mousePos: { value: new Vector2(0, 0) },
    }),
    []
  );

  const normalizedMousePos = useNormalizedMousePosition();

  useEffect(() => {
    if (points.current.material.uniforms) {
      let temp = 35;

      points.current.material.uniforms.mousePos.value.x =
        normalizedMousePos.x * temp * -1;
      points.current.material.uniforms.mousePos.value.y =
        normalizedMousePos.y * temp;
    }
  }, [normalizedMousePos]);

  useFrame((state) => {
    const { clock } = state;

    points.current.material.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <points ref={points}>
      {/* <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry> */}
      <planeGeometry args={[90, 80, 64, 64]} />
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
      <CustomGeometryParticles count={120} />
    </>
  );
};

export default PixelDance;
