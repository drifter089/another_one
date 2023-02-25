import React, {
  useState,
  useRef,
  useLayoutEffect,
  useMemo,
  useEffect,
} from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MathUtils, AxesHelper } from "three";

import Blob from "./Blob/Blob";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import PicturePlanes from "./PicturePlanes";
import { degToRad } from "three/src/math/MathUtils";
gsap.registerPlugin(ScrollTrigger);

const ImageHelixScroller = () => {
  const [hideText, setHideText] = useState(false);

  const once = useRef(false);

  const lastImgRef = useRef();
  const groupRef = useRef();
  const blobGroupRef = useRef();

  const radius = 7;
  let yOffset = 3;
  let yOffsetCurrent = -yOffset * 4;
  let theta = 0;

  useLayoutEffect(() => {
    if (!once.current) {
      once.current = true;

      const myTemp = gsap.timeline();

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
          // .to(
          //   blobGroupRef.current.rotation,
          //   {
          //     x: yOffsetCurrent / 11,
          //     y: yOffsetCurrent / 11,
          //   },
          //   "<"
          // );
        }

        ScrollTrigger.create({
          animation: myTemp,
          trigger: lastImgRef.current,
          start: "0% 0%",
          end: "300% 0%",
          scrub: 1,
          markers: true,
          onEnter: () => {
            setHideText(true);
            console.log("enter");
          },
          onLeave: () => {
            setHideText(false);
            console.log("left");
          },
          onEnterBack: () => {
            setHideText(true);
            console.log("enterback");
          },
          onLeaveBack: () => {
            setHideText(false);
            console.log("leaveback");
          },
        });
      }, 100);
    }
  }, []);

  return (
    <>
      <div
        className="mount"
        style={{
          position: "sticky",
          height: "100vh",
        }}
        ref={lastImgRef}
      >
        <Canvas camera={{ position: [12.0, 0, 0] }}>
          <group ref={blobGroupRef}>
            <Blob />
          </group>
          <group position={[0, -yOffset * 4, 0]} ref={groupRef}>
            <PicturePlanes radius={radius} yOffset={yOffset} />
          </group>
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
      <div className="pannelContainer"></div>
      <div className="pannelContainer"></div>
      <div className="pannelContainer"></div>
      <div className="pannelContainer"></div>
      <div className="pannelContainer"></div>
    </>
  );
};

export default ImageHelixScroller;
