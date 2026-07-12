import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function SpinningCube() {
  const ref = useRef();
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.5;
    ref.current.rotation.y += delta * 0.8;
  });
  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshNormalMaterial />
    </mesh>
  );
}

const Logo3D = () => (
  <div className="logo3d">
    <Canvas camera={{ position: [0, 0, 2.4], fov: 45 }}>
      <SpinningCube />
    </Canvas>
    <div className="logoLabel">Akshat Mittal @2022</div>
  </div>
);

export default Logo3D;
