import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Sparkles,
  Stage,
  Torus,
  Sky,
  Loader,
} from "@react-three/drei";
import {
  Physics,
  RigidBody,
  CuboidCollider,
  Debug,
  RigidBodyApi,
  Attractor,
  // Vector3Array
} from "@react-three/rapier";
import * as THREE from "three";
import { DoubleSide } from "three";
import CenterObjects from "./CenterObjects";
import TransparentPhyscisBox from "./TransparentPhyscisBox";
import CameraMovement from "./CameraMovement";

const ZeroGBox = () => {
  const physicsRef = useRef();

  return (
    <div className="pannelContainer">
      <div
        style={{
          width: "100vw",
          height: "100vh",
          zIndex: 6,
        }}
        className="canvasStreach"
      >
        <Loader />
        <Canvas shadows dpr={[1, 2]} camera={{ fov: 50, position: [0, 0, 10] }}>
          {/* <Suspense fallback={null}> */}
          <Physics colliders={"cuboid"} gravity={[0, 0, 0]} ref={physicsRef}>
            <CenterObjects />
            <group position={[0, 0, 5]}>
              <CenterObjects />
            </group>
            <group rotation={[0, 2, 0]}>
              <TransparentPhyscisBox />
            </group>
          </Physics>
          <CameraMovement />
          {/* </Suspense> */}
          {/* <OrbitControls /> */}
        </Canvas>
      </div>
      <div className="center">Meet your next creative developer</div>
    </div>
  );
};

export default ZeroGBox;
