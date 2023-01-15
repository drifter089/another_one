import React from "react";
import PixelDance from "../PixelDance/PixelDance";
import { Canvas } from "@react-three/fiber";

const PixelPerfectionist = () => {
  return (
    <div className="pannelContainer">
      <div className="center purpleText">
        I AM A<div style={{ fontSize: "100px" }}>Pixel</div>
        <div style={{ fontSize: "120px" }}>Perfectionist</div>
      </div>

      <div className="canvasStreach">
        <Canvas camera={{ position: [0, 0, 20] }}>
          <PixelDance />
        </Canvas>
      </div>
    </div>
  );
};

export default PixelPerfectionist;
