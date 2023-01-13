import React from "react";
import SecondCanvas from "../Interactive/SecondCanvas";
import { Canvas } from "@react-three/fiber";

const InteractiveLove = () => {
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
        <div className="center">LOVE MAKING THINGS INTERACTIVE</div>
      </div>

      <Canvas
        style={{
          position: "absolute",
          top: "200%",
          width: "100vw",
          height: "100vh",
          zIndex: 1,
        }}
        shadows
        camera={{ position: [0, 0, 20], fov: 35, near: 1, far: 50 }}
        onCreated={(state) => {
          state.scene.backgroundBlurriness = 0.4;
        }}
      >
        <SecondCanvas />
      </Canvas>
    </>
  );
};

export default InteractiveLove;
