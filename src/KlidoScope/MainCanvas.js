import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import CameraControl from "./CameraControl";
import CenterText from "./CenterText";
import FlyingObjects from "./FlyingObjects";

const MainCanvas = () => {
  const temp = useRef(null);

  console.log(temp);

  return (
    <Canvas
      //   className="webgl"
      style={{
        position: "staic",
        width: "100%",
        height: "100vh",
        zIndex: -1,
      }}
      ref={temp}
    >
      <FlyingObjects />
      {/* <OrbitControls /> */}
      <CameraControl />
      {/* <color attach="background" args={"black"} /> */}
      <CenterText />
    </Canvas>
  );
};

export default MainCanvas;
