import React from "react";
import SecondCanvas from "./Interactive/SecondCanvas";
import { Canvas } from "@react-three/fiber";

const InteractiveLove = () => {
  return (
    <div
      className="pannelContainer"
      style={{
        height: "300vh",
      }}
    >
      <div
        className="center "
        style={{
          top: "30%",
        }}
      >
        who enjoys making things interactive
      </div>
      <div
        className="canvasStreach"
        style={{
          zIndex: 1,
          height: "250vh",
        }}
      >
        <Canvas
          shadows
          camera={{ position: [0, 0, 80], fov: 35, near: 1, far: 200 }}
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
