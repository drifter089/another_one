import React from "react";
import SecondCanvas from "../Interactive/SecondCanvas";
import { Canvas } from "@react-three/fiber";

const InteractiveLove = () => {
  return (
    <div className="pannelContainer">
      <div
        className="center "
        style={{
          top: "20%",
        }}
      >
        WHO ENJOYS MAKING THINGS
        <div style={{ fontSize: "150px" }}>INTERACTIVE</div>
      </div>
      <div
        className="canvasStreach"
        style={{
          zIndex: 1,
        }}
      >
        <Canvas
          shadows
          camera={{ position: [0, -2, 16], fov: 35, near: 1, far: 50 }}
          onCreated={(state) => {
            state.scene.backgroundBlurriness = 0.4;
          }}
        >
          <SecondCanvas />
        </Canvas>
      </div>
    </div>
  );
};

export default InteractiveLove;
