import { OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import CameraControl from "./CameraControl";
import CenterText from "./CenterText";
import FlyingObjects from "./FlyingObjects";
import "./MainCanvas.css";

const MainCanvas = () => {
  const temp = useRef(null);

  console.log(temp);

  return (
    <Canvas
      //   className="webgl"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
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
