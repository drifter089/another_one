import React from "react";
import { Canvas } from "@react-three/fiber";
import ImpossibleCube from "../FoudDimentional/ImpossibleCube";

const EasterCube = () => {
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
        <div className="center">I HAVE WORKED WITH 2D 3D 4D ?????</div>
      </div>

      <Canvas
        camera={{ position: [0, 0, 20] }}
        style={{
          position: "absolute",
          top: "300%",
          width: "100vw",
          height: "100vh",
          zIndex: -2,
        }}
      >
        <ImpossibleCube />
        {/* <OrbitControls /> */}
      </Canvas>
    </>
  );
};

export default EasterCube;
