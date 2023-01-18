import React from "react";
import { Canvas } from "@react-three/fiber";
import ImpossibleCube from "../FoudDimentional/ImpossibleCube";

const EasterCube = () => {
  return (
    <div className="pannelContainer">
      <div className="center purpleText">I HAVE WORKED WITH 2D 3D 4D ?????</div>
      <div
        className="canvasStreach"
        style={{
          zIndex: -2,
        }}
      >
        <Canvas camera={{ position: [0, 0, 20] }}>
          <ImpossibleCube />
          {/* <OrbitControls /> */}
        </Canvas>
      </div>
    </div>
  );
};

export default EasterCube;
