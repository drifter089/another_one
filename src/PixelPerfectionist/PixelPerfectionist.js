import React from "react";
import PixelDance from "../PixelDance/PixelDance";
import { Canvas } from "@react-three/fiber";

const PixelPerfectionist = () => {
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
        <div className="center">Pixel Perfectionist</div>
      </div>

      <Canvas
        camera={{ position: [0, 0, 20] }}
        style={{
          position: "absolute",
          top: "100%",
          width: "100vw",
          height: "100vh",
          zIndex: -2,
        }}
      >
        <PixelDance />
      </Canvas>
    </>
  );
};

export default PixelPerfectionist;
