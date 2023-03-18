import React, {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import ImpossibleCube from "./FoudDimentional/ImpossibleCube";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Timeline } from "gsap/gsap-core";
import { DoubleSide } from "three";
import { Loader } from "@react-three/drei";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Timeline);

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
  const [pinText, setPinText] = useState(false);

  const mainContainer = useRef();

  const twoDRef = useRef();
  const threeDRef = useRef();
  const fourDRef = useRef();
  const textRef = useRef();

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

    ScrollTrigger.create({
      animation: myTemp,
      trigger: mainContainer.current,
      // markers: true,
      start: "0% 0%",
      end: "300% 0%",
      scrub: 1,
    });
  }, []);

  return (
    <>
      <div className="pannelContainer" ref={mainContainer}>
        <div className="fourDCubeBackground">I have worked with</div>
      </div>
      <div className="pannelContainer" ref={twoDRef}>
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
      <div className="pannelContainer" ref={threeDRef}>
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
      <div className="pannelContainer" ref={twoDRef}>
        <div className="fourDCubeBackground">
          <div className="bottomBig">?????</div>
        </div>
      </div>
      <div className="pannelContainer" ref={fourDRef}>
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
