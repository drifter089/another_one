import React from "react";
import ShaderPlane from "../ShaderPlane/ShaderPlane";
import { Canvas } from "@react-three/fiber";

const Hero = () => {
  return (
    <>
      <div
        style={{
          position: "staic",
          width: "100vw",
          height: "100vh",
          zIndex: 1,
        }}
      >
        <div className="center">SAY HI TO YOUR NEWEST TEAM MEMBER</div>
      </div>
      <Canvas
        style={{
          position: "absolute",
          top: "0",
          width: "100vw",
          height: "100vh",
          zIndex: -2,
        }}
        shadows
        camera={{ position: [0, 0, 20], fov: 35, near: 1, far: 50 }}
      >
        <ShaderPlane />
        {/* <OrbitControls /> */}
      </Canvas>
    </>
  );
};

export default Hero;
