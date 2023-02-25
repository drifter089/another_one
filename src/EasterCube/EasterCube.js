import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas } from "@react-three/fiber";
import ImpossibleCube from "./FoudDimentional/ImpossibleCube";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Timeline } from "gsap/gsap-core";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Timeline);

const EasterCube = () => {
  const once = useRef(false);

  const mainContainer = useRef();

  const twoDRef = useRef();
  const threeDRef = useRef();
  const threeDCuberef = useRef();
  const fourDRef = useRef();
  const textRef = useRef();

  const scene = useMemo(() => {
    return (
      <Canvas camera={{ position: [0, 0, 10] }}>
        <mesh ref={threeDCuberef}>
          <boxGeometry args={[3, 3, 3]} />
          {/* <meshStandardMaterial roughness={0} color={"red"} /> */}

          <meshNormalMaterial />
          <ambientLight />
        </mesh>
      </Canvas>
    );
  }, []);

  useLayoutEffect(() => {
    if (!once.current) {
      once.current = true;

      const myTemp = gsap.timeline();

      setTimeout(() => {
        myTemp
          // 2d
          .to(twoDRef.current, {
            y: "-45vh",
          })
          .to(twoDRef.current, {
            y: "-125vh",
            opacity: 0,
          })
          // 3d
          .to(threeDRef.current, {
            y: "-100vh",
          })
          .to(
            threeDCuberef.current.rotation,
            {
              x: 2,
              z: -2,
              y: -1.5,
            },
            "<"
          )
          .to(threeDRef.current, {
            y: "-200vh",
          })
          .to(
            threeDCuberef.current.rotation,
            {
              x: 0,
              z: 0,
              y: 0,
            },
            "<"
          )
          // 4d
          .to(fourDRef.current, {
            y: "-100vh",
          });

        ScrollTrigger.create({
          animation: myTemp,
          trigger: mainContainer.current,
          // markers: true,
          start: "300% 300%",
          end: "300% 0%",
          pin: mainContainer.current,
          scrub: 2,
        });
      }, 1000);
    }
  }, []);

  return (
    <>
      <div className="pannelContainer" ref={mainContainer}>
        <div
          className="center  "
          style={{
            top: "10%",
          }}
          ref={textRef}
        >
          I have worked with...
        </div>
        <div
          className="canvasStreach "
          ref={twoDRef}
          style={{
            top: "100vh",
          }}
        >
          <div
            className=" textAlCenter"
            style={{
              position: "relative",
              zIndex: 2,
            }}
          >
            2D
          </div>
          {/* <div
            style={{
              position: "relative",
              top: -170,
              height: 250,
              width: 250,
              backgroundColor: "pink",
              margin: "auto",
            }}
          ></div> */}
        </div>
        <div
          className="canvasStreach"
          style={{
            top: "100vh",
            zIndex: 1,
          }}
          ref={threeDRef}
        >
          {scene}
        </div>
        <div
          className="canvasStreach"
          style={{
            top: "100vh",
            zIndex: 1,
          }}
          ref={fourDRef}
        >
          <Canvas camera={{ position: [0, 0, 15] }}>
            <ImpossibleCube />
          </Canvas>
        </div>
      </div>
    </>
  );
};

export default EasterCube;
