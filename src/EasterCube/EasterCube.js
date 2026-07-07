import React, { Suspense, useLayoutEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import ImpossibleCube from "./FoudDimentional/ImpossibleCube";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { DoubleSide } from "three";
import { Loader } from "@react-three/drei";
gsap.registerPlugin(ScrollTrigger);

const SinglePlane = React.forwardRef((props, ref) => {
  const cubeRef = useRef();

  useFrame(() => {
    cubeRef.current.rotation.y = ref.current.y;
    cubeRef.current.rotation.z = ref.current.z;
    cubeRef.current.rotation.x = ref.current.x;
  });
  return (
    <mesh ref={cubeRef}>
      <planeGeometry args={[4, 4]} />
      <meshNormalMaterial side={DoubleSide} />
    </mesh>
  );
});
const SingleCube = React.forwardRef((props, ref) => {
  const cubeRef = useRef();

  useFrame(() => {
    cubeRef.current.rotation.y = ref.current.y;
    cubeRef.current.rotation.z = ref.current.z;
    cubeRef.current.rotation.x = ref.current.x;
  });
  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[3, 3, 3]} />
      <meshNormalMaterial />
    </mesh>
  );
});

const EasterCube = () => {
  const mainContainer = useRef();

  const rotationAnimationRef = useRef({
    x: 0,
    y: 0,
    z: 0,
  });

  useLayoutEffect(() => {
    const myTemp = gsap.timeline();

    myTemp.to(rotationAnimationRef.current, {
      x: 10,
      y: 8,
      z: 12,
    });

    const trigger = ScrollTrigger.create({
      animation: myTemp,
      trigger: mainContainer.current,
      start: "0% 0%",
      end: "300% 0%",
      scrub: 1,
    });

    return () => {
      trigger.kill();
      myTemp.kill();
    };
  }, []);

  return (
    <>
      <div className="pannelContainer" ref={mainContainer}>
        <div className="fourDCubeBackground">I have worked with</div>
      </div>
      <div className="pannelContainer">
        <div className="fourDCubeBackground">
          <div className="bottomBig">2D</div>
        </div>

        <div className="fourDCubeContainer">
          <Canvas camera={{ position: [0, 0, 10] }}>
            <Suspense fallback={null}>
              <Loader />
              <SinglePlane ref={rotationAnimationRef} />
            </Suspense>
          </Canvas>
        </div>
      </div>
      <div className="pannelContainer">
        <div className="fourDCubeBackground">
          <div className="bottomBig">3D</div>
        </div>

        <div className="fourDCubeContainer">
          <Canvas camera={{ position: [0, 0, 10] }}>
            <Suspense fallback={null}>
              <SingleCube ref={rotationAnimationRef} />
              <Loader />
            </Suspense>
          </Canvas>
        </div>
      </div>
      <div className="pannelContainer">
        <div className="fourDCubeBackground">
          <div className="bottomBig">?????</div>
        </div>
      </div>
      <div className="pannelContainer">
        <div className="fourDCubeBackground">
          <div
            style={{
              fontSize: "13vw",
            }}
          >
            click & drag
          </div>
        </div>

        <div className="fourDCubeContainer">
          <Suspense fallback={null}>
            <Canvas
              camera={{ position: [0, 0, 10] }}
              style={{
                zIndex: 4,
              }}
            >
              <ImpossibleCube />
            </Canvas>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default EasterCube;
