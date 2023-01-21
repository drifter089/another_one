import React from "react";
import PixelDance from "../PixelDance/PixelDance";
import { Canvas } from "@react-three/fiber";

const PixelPerfectionist = () => {
  return (
    <div className="pannelContainer">
      <div className="center purpleText">I am a Pixel Perfectionist</div>

      <div className="canvasStreach">
        <Canvas camera={{ position: [0, 0, 20] }}>
          <PixelDance />
        </Canvas>
      </div>
    </div>
  );
};

export default PixelPerfectionist;
