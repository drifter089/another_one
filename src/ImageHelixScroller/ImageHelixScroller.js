import React, {
  useState,
  useRef,
  useLayoutEffect,
  useMemo,
  useEffect,
  Suspense,
} from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MathUtils, AxesHelper } from "three";
import PicturePlanes from "./PicturePlanes";
import { degToRad } from "three/src/math/MathUtils";
import books from ".././assets/images/books.jpg";
import chess from ".././assets/images/chess.jpg";
import games from ".././assets/images/games.jpg";
import stars from ".././assets/images/stars.jpg";
import singing from ".././assets/images/singing.jpg";
import hinking from ".././assets/images/hiking.jpg";
import sunset from ".././assets/images/sunset.jpg";

import Blob from "./Blob/Blob";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const ImageHelixScroller = () => {
  const [hideText, setHideText] = useState(false);

  const once = useRef(false);

  const lastImgRef = useRef();
  const groupRef = useRef();
  const blobGroupRef = useRef();
  const canvasDivRef = useRef();

  const radius = 7;
  let yOffset = 3;
  let yOffsetCurrent = -yOffset * 4;
  let theta = 0;

  useLayoutEffect(() => {
    const myTemp = gsap.timeline();

    if (!once.current) {
      once.current = true;
      setTimeout(() => {
        for (let i = 0; i < 7; i++) {
          theta = theta + 45;
          yOffsetCurrent = yOffsetCurrent + yOffset;

          myTemp
            .to(groupRef.current.rotation, {
              y: degToRad(theta),
            })
            .to(
              groupRef.current.position,
              {
                y: yOffsetCurrent,
              },
              "<"
            );
        }

        ScrollTrigger.create({
          animation: myTemp,
          trigger: lastImgRef.current,
          start: "0% 0%",
          end: "800% 100%",
          scrub: 1,
          pin: canvasDivRef.current,
          // markers: true,
        });
      }, 3000);
    }
  }, []);

  return (
    <Suspense fallback={null}>
      <div
        className="mount"
        style={{
          position: "sticky",
          height: "100vh",
        }}
        ref={lastImgRef}
      >
        <div
          // className="unmount"
          className="canvasStreach"
          ref={canvasDivRef}
          style={{
            width: "100vw",
            height: "100vh",
            zIndex: 10,
          }}
        >
          <Canvas
            camera={{ position: [12.0, 0, 0] }}
            style={{
              width: "100vw",
              height: "100vh",
              zIndex: 10,
            }}
          >
            <group ref={blobGroupRef}>
              <Blob />
            </group>
            <group position={[0, -yOffset * 4, 0]} ref={groupRef}>
              <PicturePlanes
                radius={radius}
                yOffset={yOffset}
                imagee={[
                  books,
                  chess,
                  stars,
                  games,
                  sunset,
                  singing,
                  hinking,
                  chess,
                ]}
              />
            </group>
            {/* <OrbitControls enableZoom={false} /> */}
          </Canvas>
        </div>
      </div>
      <div className="pannelContainer"></div>
      <div className="pannelContainer"></div>
      <div className="pannelContainer"></div>
      <div className="pannelContainer"></div>
      <div className="pannelContainer"></div>
      <div className="pannelContainer"></div>
      <div
        className="pannelContainer "
        style={{
          opacity: 1,
          backgroundColor: "black",
          zIndex: 6,
        }}
      >
        <div className="center">Still not convinced ..?</div>
      </div>
    </Suspense>
  );
};

export default ImageHelixScroller;
