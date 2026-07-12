import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import CenterObjects from "./CenterObjects";
import TransparentPhyscisBox from "./TransparentPhyscisBox";
import CameraMovement from "./CameraMovement";
import LazyMount from "../components/LazyMount";
import gsap from "gsap";

function ZeroGBox() {
  const [clickedOnce, setClickedOnce] = useState(false);

  const clickMeText = useRef();
  const mainText = useRef();

  useEffect(() => {
    if (clickedOnce) {
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
        <LazyMount>
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ fov: 50, position: [0, 0, 10] }}
          >
            <Physics colliders={"cuboid"} gravity={[0, 0, 0]}>
              <Suspense fallback={null}>
                <CenterObjects setClickedOnce={setClickedOnce} />
                <TransparentPhyscisBox />
              </Suspense>
            </Physics>
            <CameraMovement />
            {/* <OrbitControls /> */}
          </Canvas>
        </LazyMount>
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
      <div className="scrollHint">
        scroll
        <div className="scrollHintArrow">↓</div>
      </div>
    </div>
  );
}

export default ZeroGBox;
