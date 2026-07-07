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
import gsap from "gsap";

function ZeroGBox() {
  const [clickedOnce, setClickedOnce] = useState(false);

  const clickMeText = useRef();
  const mainText = useRef();

  useEffect(() => {
    if (clickedOnce) {
      console.log("ran");
      gsap.to(clickMeText.current, {
        opacity: 0,
        duration: 0.3,
      });
      gsap.to(mainText.current, {
        opacity: 1,
        duration: 0.5,
        delay: 0.5,
      });
    }
  }, [clickedOnce]);

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
        <Canvas shadows dpr={[1, 2]} camera={{ fov: 50, position: [0, 0, 10] }}>
          <Physics colliders={"cuboid"} gravity={[0, 0, 0]}>
            <Suspense fallback={null}>
              <CenterObjects setClickedOnce={setClickedOnce} />
              <TransparentPhyscisBox />
            </Suspense>
          </Physics>
          <CameraMovement />
          {/* <OrbitControls /> */}
        </Canvas>
      </div>
      <div
        style={{
          position: "relative",
          fontSize: "8vw",
          textAlign: "center",
          top: "40%",
        }}
        ref={clickMeText}
      >
        click me!
      </div>
      <div
        className="center"
        style={{
          opacity: 0,
          top: "30%",
        }}
        ref={mainText}
      >
        Meet your next creative developer
      </div>
    </div>
  );
}

export default ZeroGBox;
