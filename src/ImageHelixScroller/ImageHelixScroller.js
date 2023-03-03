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
import PicturePlanes from "./PicturePlanes";
import { degToRad } from "three/src/math/MathUtils";
import pic1 from ".././assets/images/pic1.jpg";

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

  // useEffect(() => {
  //   if (hideText) {
  //     canvasDivRef.current.classList.remove("unmount");
  //   } else {
  //     canvasDivRef.current.classList.add("unmount");
  //   }
  // }, [hideText]);

  useEffect(() => {
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
          end: "800% 100%",
          scrub: 1,
          pin: canvasDivRef.current,
          markers: true,
          // onEnter: () => {
          //   setHideText(true);
          //   console.log("enter");
          // },
          // onLeave: () => {
          //   setHideText(false);
          //   console.log("left");
          // },
          // onEnterBack: () => {
          //   setHideText(true);
          //   console.log("enterback");
          // },
          // onLeaveBack: () => {
          //   setHideText(false);
          //   console.log("leaveback");
          // },
          // });
        });
      }, 1000);
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
                imagee={[pic1, pic1, pic1, pic1, pic1, pic1, pic1, pic1]}
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
        <div className="center">and</div>
      </div>
    </>
  );
};

export default ImageHelixScroller;
