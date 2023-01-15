import React, { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  GradientTexture,
  MeshDistortMaterial,
  MeshReflectorMaterial,
  OrbitControls,
} from "@react-three/drei";

const BufferTrigs = () => {
  const count = 100;

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const distance = 10;

    for (let i = 0; i < count; i++) {
      //   const theta = THREE.MathUtils.randFloatSpread(360);
      //   const phi = THREE.MathUtils.randFloatSpread(360);

      let x = distance * Math.random() - distance / 2;
      let y = distance * Math.random() - distance / 2;
      let z = distance * Math.random() - distance / 2;

      positions.set([x, y, z], i * 3);
    }

    return positions;
  }, [count]);

  return (
    <Canvas
      style={{
        position: "absolute",
        top: "0",
        width: "100vw",
        height: "100vh",
        zIndex: 1,
      }}
      shadows
      camera={{ position: [0, 0, 20], fov: 35, near: 1, far: 500 }}
      onCreated={(state) => {
        state.scene.backgroundBlurriness = 0.4;
      }}
    >
      <ambientLight />
      <mesh>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <meshBasicMaterial>
          <GradientTexture
            stops={[0, 1, 0]} // As many stops as you want
            colors={["blue", "hotpink", "blue"]} // Colors need to match the number of stops
            size={1024} // Size is optional, default = 1024
          />
        </meshBasicMaterial>
        {/* <MeshDistortMaterial distort={1} speed={10} wireframe={true} /> */}
      </mesh>
      <OrbitControls />
    </Canvas>
  );
};

export default BufferTrigs;
